import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_vg22q3i';
const TEMPLATE_ID = 'template_ia4zllj';
const PUBLIC_KEY = '4c9r3pCWeiKox3n8U';

const ContactPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [message,   setMessage]   = useState('');

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    emailjs.init({ publicKey: PUBLIC_KEY });

    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setStatusMessage(null);

    if (!firstName || !email || !message) {
      setStatusMessage('Please fill out First Name, Email, and Message.');
      return;
    }
    if (!isValidEmail(email)) {
      setStatusMessage('Please enter a valid email address.');
      return;
    }
    if (!formRef.current) {
      setStatusMessage('Form not ready. Please refresh and try again.');
      return;
    }

    setSubmitting(true);
    try {
      // EmailJS reads values by the "name" attribute from the form element
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current);
      setStatusMessage('Thank you! Your message has been sent successfully.');
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      formRef.current.reset(); // also clears the native form
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';
      setStatusMessage(`Failed to submit: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F8F9FA',
        padding: isMobile ? '20px 16px' : '40px 20px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          maxWidth: '1200px',
          margin: isMobile ? '0 auto 40px auto' : '0 auto 60px auto',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? '2rem' : '3.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          Get In Touch
        </h1>
        <p
          style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            color: '#6B7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
            padding: isMobile ? '0 10px' : '0',
          }}
        >
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '60px',
          alignItems: 'start',
        }}
      >
        {/* Left Column - Contact Info */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: isMobile ? '24px' : '40px',
            boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E5E7EB',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 600,
              color: '#1F2937',
              marginBottom: '20px',
            }}
          >
            Let's Connect
          </h2>

          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: '#6B7280',
              lineHeight: 1.7,
              marginBottom: '28px',
            }}
          >
            Whether you have questions about our services, need support, or want to explore
            partnership opportunities, we're here to help.
          </p>

          {/* Contact Methods */}
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
                padding: isMobile ? '12px' : '16px',
                background: '#FFF7ED',
                borderRadius: '12px',
                border: '1px solid #FDBA74',
              }}
            >
              <div
                style={{
                  width: isMobile ? '40px' : '48px',
                  height: isMobile ? '40px' : '48px',
                  minWidth: isMobile ? '40px' : '48px',
                  background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                }}
              >
                <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} fill="white" viewBox="0 0 24 24">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontWeight: 600,
                    color: '#1F2937',
                    margin: '0 0 4px 0',
                  }}
                >
                  Email Us
                </h3>
                <a
                  href="mailto:naveen@fiskerit.org"
                  style={{
                    color: '#FF6B35',
                    textDecoration: 'none',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: 500,
                    wordBreak: 'break-word',
                  }}
                >
                  naveen@fiskerit.org
                </a>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isMobile ? '12px' : '16px',
                background: '#F0FDF4',
                borderRadius: '12px',
                border: '1px solid #86EFAC',
              }}
            >
              <div
                style={{
                  width: isMobile ? '40px' : '48px',
                  height: isMobile ? '40px' : '48px',
                  minWidth: isMobile ? '40px' : '48px',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                }}
              >
                <svg width={isMobile ? '20' : '24'} height={isMobile ? '20' : '24'} fill="white" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontWeight: 600,
                    color: '#1F2937',
                    margin: '0 0 4px 0',
                  }}
                >
                  Response Time
                </h3>
                <p
                  style={{
                    color: '#059669',
                    margin: 0,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontWeight: 500,
                  }}
                >
                  Usually within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Extra info */}
          <div
            style={{
              padding: isMobile ? '16px' : '24px',
              background: 'linear-gradient(135deg, #FFF7ED, #FFFBEB)',
              borderRadius: '16px',
              border: '1px solid #FDBA74',
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                fontWeight: 600,
                color: '#92400E',
                marginBottom: '12px',
              }}
            >
              💡 Quick Tip
            </h3>
            <p
              style={{
                color: '#92400E',
                margin: 0,
                fontSize: isMobile ? '0.9rem' : '0.95rem',
                lineHeight: '1.6',
              }}
            >
              The more details you provide about your inquiry, the better we can assist you.
              Don't hesitate to be specific!
            </p>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: isMobile ? '24px' : '40px',
            boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E5E7EB',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              fontWeight: 600,
              color: '#1F2937',
              marginBottom: '8px',
            }}
          >
            Send us a message
          </h2>
          <p
            style={{
              color: '#6B7280',
              marginBottom: isMobile ? '24px' : '32px',
              fontSize: isMobile ? '0.95rem' : '1rem',
            }}
          >
            Fill out the form below and we'll get back to you shortly.
          </p>

          {/* EmailJS reads by name attributes */}
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* hidden fields used in the EmailJS template if you want */}
            <input type="hidden" name="subject" value="Contact Form Submission" />
            <input type="hidden" name="to_name" value="Fisker IT" />

            {/* Name fields */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  First Name *
                </label>
                <input
                  name="first_name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: isMobile ? '12px 14px' : '14px 16px',
                    fontSize: '1rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: '#FAFAFA',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#FF6B35';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#FAFAFA';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Last Name
                </label>
                <input
                  name="last_name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: isMobile ? '12px 14px' : '14px 16px',
                    fontSize: '1rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: '#FAFAFA',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#FF6B35';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#FAFAFA';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Email Address *
              </label>
              <input
                name="user_email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: isMobile ? '12px 14px' : '14px 16px',
                  fontSize: '1rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: '#FAFAFA',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#FF6B35';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.background = '#FAFAFA';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: isMobile ? '24px' : '32px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Your Message *
              </label>
              <textarea
                name="message" // EmailJS variable
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={isMobile ? 4 : 5}
                placeholder="Tell us how we can help you..."
                style={{
                  width: '100%',
                  padding: isMobile ? '12px 14px' : '14px 16px',
                  fontSize: '1rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: '#FAFAFA',
                  resize: 'vertical',
                  minHeight: isMobile ? '100px' : '120px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#FF6B35';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.background = '#FAFAFA';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: isMobile ? '14px 20px' : '16px 24px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                color: 'white',
                background: submitting
                  ? '#9CA3AF'
                  : 'linear-gradient(135deg, #FF6B35, #F7931E)',
                border: 'none',
                borderRadius: '12px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                transform: submitting ? 'none' : 'translateY(0)',
                boxShadow: submitting ? 'none' : '0 4px 15px rgba(255,107,53,0.3)',
                minHeight: '48px',
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 6px 20px rgba(255,107,53,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 15px rgba(255,107,53,0.3)';
                }
              }}
            >
              {submitting ? (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {/* Status */}
            {statusMessage && (
              <div
                style={{
                  marginTop: '20px',
                  padding: isMobile ? '12px' : '16px',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.95rem' : '1rem',
                  fontWeight: 500,
                  background: statusMessage.includes('Thank')
                    ? '#F0FDF4'
                    : '#FEF2F2',
                  color: statusMessage.includes('Thank') ? '#059669' : '#DC2626',
                  border: `1px solid ${
                    statusMessage.includes('Thank') ? '#86EFAC' : '#FCA5A5'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {statusMessage.includes('Thank') ? '✅' : '❌'}
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ContactPage;
