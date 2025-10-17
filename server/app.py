# server/app.py

import os
import smtplib
import logging
import mimetypes
from io import BytesIO
from email.message import EmailMessage
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Contact

# Try to load .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
    print("Loaded .env file")
except ImportError:
    print("python-dotenv not installed. Using system environment variables.")
    print("To install: pip install python-dotenv")

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def create_app():
    app = Flask(__name__)

    # ---------- DATABASE CONFIGURATION ----------
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize SQLAlchemy and CORS
    db.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # ---------- EMAIL CONFIGURATION ----------
    SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
    SMTP_USERNAME = os.environ.get('SMTP_USERNAME')
    SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')
    RECIPIENT_EMAIL = 'naveen@fiskerit.org'

    if SMTP_USERNAME and SMTP_PASSWORD:
        logger.info(f"Email configured: {SMTP_USERNAME} → {RECIPIENT_EMAIL}")
    else:
        logger.warning("⚠️  Email NOT configured - set SMTP_USERNAME and SMTP_PASSWORD")

    # ---------- DATABASE INIT ----------
    with app.app_context():
        db.create_all()
        logger.info("Database tables created/verified")

    # ---------- ROUTES ----------

    @app.route('/api/contact', methods=['POST'])
    def handle_contact():
        first_name = request.form.get('first_name', '').strip()
        last_name = request.form.get('last_name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()

        if 'resume' not in request.files or not request.files['resume'].filename:
            return jsonify({'success': False, 'error': 'Resume file is required.'}), 400

        resume_file = request.files['resume']
        resume_filename = resume_file.filename
        resume_bytes = resume_file.read()

        if not first_name or not email:
            return jsonify({
                'success': False,
                'error': 'First name and email are required.'
            }), 400

        try:
            new_contact = Contact(
                first_name=first_name,
                last_name=last_name if last_name else None,
                email=email,
                phone=phone if phone else None,
                message=f"Resume uploaded: {resume_filename}"
            )
            db.session.add(new_contact)
            db.session.commit()
            logger.info(f"✅ Contact saved to database: ID {new_contact.id}")
        except Exception as e_db:
            db.session.rollback()
            logger.error(f"❌ Database error: {str(e_db)}")
            return jsonify({'success': False, 'error': f'Database error: {str(e_db)}'}), 500

        if not SMTP_USERNAME or not SMTP_PASSWORD:
            logger.warning("⚠️  Email credentials not configured - skipping email sending")
            return jsonify({
                'success': True,
                'contact_id': new_contact.id,
                'message': 'Contact saved (email not configured, so no emails sent).'
            }), 201

        try:
            manager_msg = EmailMessage()
            manager_msg['Subject'] = f'New Application from {first_name} {last_name or ""}'.strip()
            manager_msg['From'] = SMTP_USERNAME
            manager_msg['To'] = RECIPIENT_EMAIL
            manager_msg['Reply-To'] = email

            body_manager = f"""
A new application has arrived:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 APPLICANT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

First Name:  {first_name}
Last Name:   {last_name if last_name else "(not provided)"}
Email:       {email}
Phone:       {phone if phone else "(not provided)"}

📄 Resume Filename: {resume_filename}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
            manager_msg.set_content(body_manager)

            mime_type, encoding = mimetypes.guess_type(resume_filename)
            if mime_type is None:
                maintype, subtype = 'application', 'octet-stream'
            else:
                maintype, subtype = mime_type.split('/', 1)

            manager_msg.add_attachment(
                resume_bytes,
                maintype=maintype,
                subtype=subtype,
                filename=resume_filename
            )

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as smtp:
                smtp.ehlo()
                smtp.starttls()
                smtp.ehlo()
                smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
                smtp.send_message(manager_msg)
            logger.info(f"✅ Email sent successfully to {RECIPIENT_EMAIL}")

            confirm_msg = EmailMessage()
            confirm_msg['Subject'] = 'Thank you for applying to Fisker IT!'
            confirm_msg['From'] = SMTP_USERNAME
            confirm_msg['To'] = email

            body_confirm = f"""
Hi {first_name},

Thank you for submitting your application to Fisker IT. We have received your resume ("{resume_filename}") and our team will review it shortly.

Best regards,
The Fisker IT Team
"""
            confirm_msg.set_content(body_confirm)

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as smtp2:
                smtp2.ehlo()
                smtp2.starttls()
                smtp2.ehlo()
                smtp2.login(SMTP_USERNAME, SMTP_PASSWORD)
                smtp2.send_message(confirm_msg)
            logger.info(f"✅ Confirmation email sent successfully to {email}")

            return jsonify({
                'success': True,
                'contact_id': new_contact.id,
                'message': 'Contact saved, emailed manager and confirmation sent to applicant.'
            }), 201

        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"❌ Email authentication failed: {e}")
            return jsonify({
                'success': True,
                'contact_id': new_contact.id,
                'warning': 'Contact saved, but email authentication failed.'
            }), 201

        except Exception as e_mail:
            logger.error(f'❌ Email error: {e_mail}')
            return jsonify({
                'success': True,
                'contact_id': new_contact.id,
                'warning': f'Contact saved, but email failed: {str(e_mail)}'
            }), 201

    @app.route('/api/contacts', methods=['GET'])
    def list_contacts():
        contacts = Contact.query.order_by(Contact.created_at.desc()).all()
        return jsonify([c.to_dict() for c in contacts]), 200

    @app.route('/api/test-email', methods=['POST'])
    def test_email():
        if not SMTP_USERNAME or not SMTP_PASSWORD:
            return jsonify({'error': 'Email not configured'}), 400
        try:
            email_msg = EmailMessage()
            email_msg['Subject'] = 'Test Email from Flask App'
            email_msg['From'] = SMTP_USERNAME
            email_msg['To'] = RECIPIENT_EMAIL
            email_msg.set_content('This is a test email to verify the configuration.')

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as smtp:
                smtp.ehlo()
                smtp.starttls()
                smtp.ehlo()
                smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
                smtp.send_message(email_msg)

            return jsonify({'success': True, 'message': 'Test email sent!'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)