import { useState } from 'react';
import type { ChangeEvent, FormEvent, CSSProperties, FC } from 'react';

// Inline icon components (only the ones actually used)
const ChevronDown = ({ size = 20, className = '', style }: { size?: number; className?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUp = ({ size = 20, className = '', style }: { size?: number; className?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const Star = ({ size = 18, className = '', style }: { size?: number; className?: string; style?: CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

interface FaqItem {
  question: string;
  answer: string;
}

const RecruitmentPage: FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const faqs: FaqItem[] = [
    {
      question: 'How long does the recruitment process take?',
      answer:
        'We typically schedule initial calls within 2–3 business days of submitting your application. The full process usually takes 1–2 weeks depending on the role.',
    },
    {
      question: 'Do I need to be local to apply?',
      answer:
        'We primarily serve U.S.-based roles, but many positions allow fully remote work. Your application is welcome regardless of location.',
    },
    {
      question: 'Can I apply to multiple positions simultaneously?',
      answer:
        'Yes. Submit one application with “Multiple Positions” noted and we will match you to every relevant opening.',
    },
    {
      question: 'What kind of roles do you specialize in?',
      answer:
        'We focus on IT and technical roles including software engineering, data science, cybersecurity, DevOps, and cloud architecture.',
    },
    {
      question: 'Do you charge candidates any fees?',
      answer:
        'No. Our services are free to applicants. All fees are covered by our hiring partners.',
    },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setStatusMessage(null);

  if (!formData.firstName || !formData.lastName || !formData.email || !resumeFile) {
    setStatusMessage('Please fill out all required fields and upload your resume.');
    return;
  }

  setIsSubmitting(true);

  try {
    const payload = new FormData();
    payload.append('first_name', formData.firstName);
    payload.append('last_name', formData.lastName);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('resume', resumeFile);

    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      body: payload,
    });

    // If your API shape is known, type it:
    type ApiResult = { success: boolean; error?: string };
    const result: ApiResult = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Server error');
    }

    if (result.success) {
      setStatusMessage('✅ Application submitted successfully! Please check your email for confirmation.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
      setResumeFile(null);
      setExpandedFaq(null);
    } else {
      setStatusMessage('❌ ' + (result.error || 'Unknown error'));
    }
  } catch (err: unknown) {
    let message = 'Unknown error';
    if (err instanceof Error) message = err.message;
    else if (typeof err === 'string') message = err;
    setStatusMessage(`❌ Submission failed: ${message}`);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
          color: 'white',
          padding: '3rem 1rem',
          borderRadius: '1rem',
          margin: '1rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(1.875rem, 5vw, 3.75rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Join Our Team
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '48rem',
              margin: '0 auto 1.5rem auto',
              lineHeight: 1.6,
            }}
          >
            We connect top talent to cutting-edge opportunities in IT and beyond.
            <br />
            Shape the future with industry-leading companies.
          </p>
          <button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'white',
              color: '#FF6B35',
              padding: '0.75rem 2rem',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
            }}
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Why Work With Us */}
      <section style={{ padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            Why Work With Us?
          </h2>
          <div
            style={{
              width: '6rem',
              height: '0.25rem',
              background: '#FF6B35',
              margin: '0 auto 1rem auto',
              borderRadius: '9999px',
            }}
          />
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: '#6B7280',
              lineHeight: 1.6,
              maxWidth: '48rem',
              margin: '0 auto',
            }}
          >
            We believe every candidate deserves personalized support, transparent communication, and direct access to hiring managers. Your success is our mission.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section style={{ padding: '3rem 1rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            Success Stories
          </h2>
          <div
            style={{
              width: '6rem',
              height: '0.25rem',
              background: '#FF6B35',
              margin: '0 auto 1rem auto',
              borderRadius: '9999px',
            }}
          />
        </div>

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Testimonial #1 */}
          <div
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              border: '1px solid #E5E7EB',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400" style={{ color: '#FBBF24', marginRight: '0.25rem' }} />
              ))}
            </div>
            <p
              style={{
                color: '#374151',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                fontStyle: 'italic',
                marginBottom: '1rem',
                lineHeight: 1.6,
              }}
            >
              "Working with Fisker IT has been a game changer for my career. They placed me in a challenging SAP SD role where I have been able to leverage my sales and distribution expertise. Their 24-hour response time and ongoing support made the entire process seamless. Highly recommend."
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  background: '#FF6B35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  marginRight: '0.75rem',
                }}
              >
                VK
              </div>
              <div>
                <h4
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: 600,
                    color: '#1F2937',
                  }}
                >
                  Vignodhar Kanathala
                </h4>
                <p style={{ color: '#6B7280', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>SAP SD Consultant</p>
              </div>
            </div>
          </div>

          {/* Testimonial #2 */}
          <div
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              border: '1px solid #E5E7EB',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} style={{ color: '#FBBF24', marginRight: '0.25rem' }} />
              ))}
            </div>
            <p
              style={{
                color: '#374151',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                fontStyle: 'italic',
                marginBottom: '1rem',
                lineHeight: 1.6,
              }}
            >
              "Thanks to Fisker IT, I landed my dream role as a SAP developer in just three weeks. Their personalized approach and industry connections made all the difference."
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  background: '#FF6B35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  marginRight: '0.75rem',
                }}
              >
                KC
              </div>
              <div>
                <h4
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    fontWeight: 600,
                    color: '#1F2937',
                  }}
                >
                  Kumar Chakravarthy
                </h4>
                <p style={{ color: '#6B7280', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>SAP ABAP Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section style={{ padding: '3rem 1rem', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            How to Apply
          </h2>
          <div
            style={{
              width: '6rem',
              height: '0.25rem',
              background: '#FF6B35',
              margin: '0 auto 1rem auto',
              borderRadius: '9999px',
            }}
          />
        </div>

        <div
          id="application-form"
          style={{
            maxWidth: '48rem',
            margin: '0 auto',
            background: 'white',
            borderRadius: '0.75rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E5E7EB',
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* First + Last Name */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <label
                  htmlFor="firstName"
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    fontSize: '1rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: '#FAFAFA',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#FF6B35';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
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
                  htmlFor="lastName"
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}
                >
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem',
                    fontSize: '1rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: '#FAFAFA',
                    boxSizing: 'border-box',
                  } as CSSProperties}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#FF6B35';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#FAFAFA';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem',
                }}
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '0.75rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: '#FAFAFA',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#FF6B35';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.background = '#FAFAFA';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Phone Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="phone"
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem',
                }}
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: '2px solid #E5E7EB',
                  borderRadius: '0.75rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: '#FAFAFA',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#FF6B35';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.background = '#FAFAFA';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* File Upload */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="resume"
                style={{
                  border: '2px dashed #E5E7EB',
                  borderRadius: '0.5rem',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                  background: resumeFile ? '#FAFAFA' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '150px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF6B35';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }}
              >
                <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} required />
                <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginBottom: '0.75rem' }}>📄</span>
                <p
                  style={{
                    color: '#374151',
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    marginBottom: '0.25rem',
                    fontWeight: 600,
                  }}
                >
                  {resumeFile ? resumeFile.name : 'Drag & drop your resume here, or click to browse'}
                </p>
                <p style={{ color: '#6B7280', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)' }}>PDF or DOCX only</p>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                fontWeight: 600,
                color: 'white',
                background: isSubmitting ? '#9CA3AF' : '#FF6B35',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSubmitting ? 'none' : '0 4px 15px rgba(255, 107, 53, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                  e.currentTarget.style.background = '#F75A2C';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
                  e.currentTarget.style.background = '#FF6B35';
                }
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>

            {statusMessage && (
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  fontWeight: 500,
                  background: statusMessage.startsWith('✅') ? '#F0FDF4' : '#FEF2F2',
                  color: statusMessage.startsWith('✅') ? '#059669' : '#DC2626',
                  border: `1px solid ${statusMessage.startsWith('✅') ? '#86EFAC' : '#FCA5A5'}`,
                }}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '3rem 1rem', background: '#F8F9FA' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto 3rem auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '0.5rem',
            }}
          >
            Frequently Asked Questions
          </h2>
          <div
            style={{
              width: '6rem',
              height: '0.25rem',
              background: '#FF6B35',
              margin: '0 auto 1rem auto',
              borderRadius: '9999px',
            }}
          />
        </div>

        <div
          style={{
            maxWidth: '48rem',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '0.75rem',
                  border: `2px solid ${isOpen ? '#FF6B35' : '#E5E7EB'}`,
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? '0 4px 15px rgba(255, 107, 53, 0.2)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: 'clamp(1rem, 3vw, 1.5rem)',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      fontWeight: 600,
                      color: '#1F2937',
                      paddingRight: '1rem',
                    }}
                  >
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp size={20} style={{ color: '#FF6B35', flexShrink: 0 }} /> : <ChevronDown size={20} style={{ color: '#FF6B35', flexShrink: 0 }} />}
                </button>
                <div style={{ maxHeight: isOpen ? '500px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <div style={{ padding: isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem' }}>
                    <p style={{ color: '#6B7280', fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)', lineHeight: 1.6 }}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RecruitmentPage;
