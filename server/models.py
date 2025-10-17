# server/models.py

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Contact(db.Model):
    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=True)
    email = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50), nullable=True)
    message = db.Column(db.Text, nullable=False)  # We store a simple note: "Resume uploaded: filename"
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<Contact {self.id} {self.first_name} {self.email}>'

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'message': self.message,
            'created_at': self.created_at.isoformat(),
        }
