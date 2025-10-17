import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';


interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
}

const SERVICES: Service[] = [
  {
    icon: 'briefcase',
    title: 'Permanent Placement',
    description: 'Find the perfect long-term fit for your organization with our comprehensive permanent recruitment service.',
    features: [
      'Executive search for senior IT positions',
      'Mid-level and junior developer placement',
      'Comprehensive candidate screening',
      'Skills assessment & technical interviews',
      'Cultural fit evaluation',
      '90-day placement guarantee',
    ],
  },
  {
    icon: 'zap',
    title: 'Contract & Temporary',
    description: 'Flexible staffing solutions for project-based work and temporary coverage needs.',
    features: [
      'Short-term & long-term contracts',
      'Project-based specialist placement',
      'Emergency cover solutions',
      'Contract-to-permanent options',
      'Rapid deployment within 48 hours',
      'Flexible engagement models',
    ],
  },
  {
    icon: 'target',
    title: 'Executive Search',
    description: 'Specialized recruitment for C-level executives, VPs, and senior leadership positions in technology.',
    features: [
      'CTO, CIO, VP Engineering searches',
      'Board-level technology appointments',
      'Confidential & discreet process',
      'Global talent network access',
      'Leadership assessment & profiling',
      'Succession planning support',
    ],
  },
  {
    icon: 'brain',
    title: 'Talent Acquisition Consulting',
    description: 'Strategic consulting to optimize your internal recruitment processes and employer branding.',
    features: [
      'Recruitment process optimization',
      'Employer branding strategy',
      'Talent pipeline development',
      'Interview training & best practices',
      'Market intelligence & salary benchmarking',
      'Diversity & inclusion initiatives',
    ],
  },
  {
    icon: 'settings',
    title: 'Managed Recruitment Services',
    description: 'Outsource your entire recruitment function or specific elements to our dedicated team.',
    features: [
      'Dedicated recruitment team setup',
      'End-to-end process management',
      'Volume recruitment solutions',
      'Technology stack management',
      'Reporting & analytics',
      'Cost-effective scaling',
    ],
  },
  {
    icon: 'code',
    title: 'Specialized Tech Recruitment',
    description: 'Expert recruitment in emerging technologies and niche IT specializations.',
    features: [
      'AI/ML & Data Science specialists',
      'Cybersecurity experts',
      'Cloud architecture & DevOps',
      'Blockchain & Web3 developers',
      'IoT & embedded systems',
      'Quantum computing researchers',
    ],
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  { number: 1, title: 'Discovery & Strategy', description: 'Understand requirements, culture, and objectives.' },
  { number: 2, title: 'Talent Sourcing', description: 'Identify top IT professionals through our network.' },
  { number: 3, title: 'Screening & Assessment', description: 'Technical and cultural evaluation with assessments.' },
  { number: 4, title: 'Client Presentation', description: 'Present qualified candidates with recommendations.' },
  { number: 5, title: 'Interview Coordination', description: 'Manage interviews and provide feedback.' },
  { number: 6, title: 'Offer & Onboarding', description: 'Support negotiations and smooth onboarding.' },
];

const STATS: Stat[] = [
  { number: '6', label: 'Active Projects' },
  { number: '20+', label: 'Skilled Contractors' },
  { number: '24hrs', label: 'Average Response Time' },
  { number: '18', label: 'Long-Term Placements' },
];

function useIsTouch(): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;

    // Narrow navigator without using `any`
    const nav = window.navigator as Navigator & { maxTouchPoints?: number };

    const hasTouchEvent = 'ontouchstart' in window;
    const hasCoarsePointer = typeof window.matchMedia === 'function'
      ? window.matchMedia('(pointer: coarse)').matches
      : false;
    const hasMaxTouchPoints = (nav.maxTouchPoints ?? 0) > 0;

    return hasTouchEvent || hasCoarsePointer || hasMaxTouchPoints;
  }, []);
}

const IconComponent = ({ name, size = 24 }: { name: string; size?: number }) => {
  const icons: Record<string, ReactNode> = {
    briefcase: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    zap: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    target: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
    brain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0-3 3.87V14a2 2 0 0 0 2 2h2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4h2a2 2 0 0 0 2-2v-2.13A4 4 0 0 0 16 8V6a4 4 0 0 0-4-4z"></path>
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2-5.2l-4.2 4.2m0 6l4.2 4.2"></path>
      </svg>
    ),
    code: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
  };
  return (icons[name] ?? icons.briefcase) as ReactNode;
};

const ServicesPage = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    // nothing required here now; CSS handles reduced motion
  }, []);

  const handleCardEnter = (id: string) => {
    if (isTouch) return;
    setHoveredCard(id);
  };
  const handleCardLeave = () => {
    if (isTouch) return;
    setHoveredCard(null);
  };
  const handleCardTap = (id: string) => {
    setHoveredCard(id);
    window.setTimeout(() => setHoveredCard(null), 180);
  };

  return (
    <div
      className="page-root"
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <style>{`
        .section {
          content-visibility: auto;
          contain-intrinsic-size: 1px 600px;
        }
        .card {
          will-change: transform, box-shadow;
          transition: transform 280ms cubic-bezier(.2,.6,.2,1), box-shadow 280ms cubic-bezier(.2,.6,.2,1);
          outline: none;
        }
        .card:focus-visible {
          box-shadow: 0 0 0 3px rgba(255,127,92,.45);
          border-radius: 14px;
        }
        @media (hover: none) {
          .hover-raise { transform: translateY(0) !important; }
          .card:active { transform: translateY(-4px) scale(0.99); }
        }
        .tap-target { min-height: 44px; min-width: 44px; }
        @media (prefers-reduced-motion: reduce) {
          .card, .btn, .hover-raise {
            transition: none !important;
            animation: none !important;
          }
        }
        .timeline-connector {
          position: absolute;
          left: 28px;
          top: 56px;
          bottom: -32px;
          width: 2px;
          background: linear-gradient(180deg, #FF7F5C 0%, rgba(255, 127, 92, 0.3) 100%);
        }
        .timeline-item:last-child .timeline-connector {
          display: none;
        }
      `}</style>

      <section
        aria-labelledby="hero-title"
        className="section"
        style={{
          background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B35 50%, #FF4500 100%)',
          color: 'white',
          padding: 'clamp(50px, 10vw, 100px) 20px',
          textAlign: 'center',
          contain: 'paint',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 id="hero-title"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 3.5rem)', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Our Services
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', lineHeight: 1.6, opacity: 0.95, maxWidth: '700px', margin: '0 auto' }}>
            Transforming the industry with the right skills at the right time.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: 'clamp(60px, 10vw, 100px) 20px', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
              gap: 'clamp(32px, 6vw, 50px)',
              alignItems: 'start',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <h2
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '20px', color: '#1F2937', lineHeight: 1.15, letterSpacing: '-0.02em' }}
              >
                Why Choose Us?
              </h2>
              <p
                style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', lineHeight: 1.7, color: '#4B5563', marginBottom: '36px' }}
              >
                Tailored solutions with the right resources at the right time.
              </p>
              <div role="list" aria-label="Key benefits" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  { text: 'IT & technology specialists' },
                  { text: '24-hour response time' },
                  { text: 'Technical & cultural screening' },
                  { text: 'Fortune 500 experience' },
                ].map((item, idx) => (
                  <div key={idx} role="listitem" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      className="tap-target"
                      aria-hidden="true"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FF7F5C',
                        color: '#FFFFFF',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <IconComponent name="check" size={18} />
                    </div>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: '#1F2937', fontWeight: 500, lineHeight: 1.6 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                padding: 'clamp(28px, 5vw, 44px)',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.65rem)', fontWeight: 600, marginBottom: '28px', color: '#1F2937' }}>
                  Trusted by Leading Companies
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
                  {[
                    { label: 'Enterprise Clients', value: '4' },
                    { label: 'Active Projects', value: '6' },
                    { label: 'Skilled Contractors', value: '20+' },
                    { label: 'Response Time', value: '24hrs' },
                  ].map((stat, idx) => (
                    <div key={idx} style={{ textAlign: 'center', padding: '16px', borderRadius: '12px', background: '#F9FAFB' }}>
                      <div style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: '#FF7F5C', marginBottom: '6px' }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', color: '#6B7280', fontWeight: 500 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px', borderLeft: '4px solid #FF7F5C' }}>
                  <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#4B5563', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
                    "Exceptional service. They consistently deliver qualified candidates."
                  </p>
                  <p style={{ fontSize: 'clamp(0.9rem, 2vw, 0.95rem)', color: '#FF7F5C', fontWeight: 600, margin: '12px 0 0 0' }}>
                    — Fortune 500 Client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: 'clamp(60px, 10vw, 100px) 20px', background: 'linear-gradient(135deg, #FFF5F2, #FFE8E0)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700, marginBottom: '16px', color: '#1F2937', letterSpacing: '-0.02em' }}>
              IT Recruitment Solutions
            </h2>
            <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', lineHeight: 1.6, color: '#6B7280', maxWidth: '700px', margin: '0 auto' }}>
              Tailored services for the technology sector
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '32px',
            }}
          >
            {SERVICES.map((service, idx) => {
              const id = `service-${idx}`;
              const raised = hoveredCard === id;
              return (
                <div
                  key={id}
                  tabIndex={0}
                  className={`card ${raised ? '' : 'hover-raise'}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '28px',
                    boxShadow: raised ? '0 8px 30px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.05)',
                    transform: raised ? 'translateY(-8px)' : 'translateY(0)',
                    textAlign: 'left',
                    border: '1px solid #E5E7EB',
                  }}
                  onMouseEnter={() => handleCardEnter(id)}
                  onMouseLeave={handleCardLeave}
                  onTouchStart={() => handleCardTap(id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardTap(id)}
                  aria-label={service.title}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      background: 'linear-gradient(135deg, #FF7F5C, #FF4500)',
                      color: '#FFFFFF',
                    }}
                  >
                    <IconComponent name={service.icon} size={28} />
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 600, marginBottom: '12px', color: '#1F2937' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', lineHeight: 1.6, color: '#6B7280', marginBottom: '20px' }}>
                    {service.description}
                  </p>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
                    {service.features.map((feature, featureIdx) => (
                      <li key={featureIdx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <span aria-hidden="true" style={{ color: '#FF7F5C', marginRight: '10px', marginTop: '2px', flexShrink: 0 }}>
                          <IconComponent name="check" size={16} />
                        </span>
                        <span style={{ color: '#4B5563', fontSize: 'clamp(0.9rem, 2vw, 0.98rem)', lineHeight: 1.5 }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: 'clamp(60px, 10vw, 100px) 20px', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700, marginBottom: '20px', color: '#1F2937', textAlign: 'center', letterSpacing: '-0.02em' }}>
            Recruitment Process
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', lineHeight: 1.6, color: '#6B7280', maxWidth: '650px', margin: '0 auto 56px auto', textAlign: 'center' }}>
            Proven methodology for successful hiring
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="timeline-item"
                style={{
                  position: 'relative',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                }}
              >
                <div className="timeline-connector" />
                <div
                  aria-hidden="true"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    background: 'linear-gradient(135deg, #FF7F5C, #FF4500)',
                    boxShadow: '0 4px 12px rgba(255, 127, 92, 0.25)',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {step.number}
                </div>
                <div style={{ flex: 1, paddingTop: '4px' }}>
                  <h4 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 600, marginBottom: '8px', color: '#1F2937' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', lineHeight: 1.6, color: '#6B7280', margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: 'clamp(60px, 10vw, 100px) 20px', backgroundColor: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '32px',
          }}
        >
          {STATS.map((stat, idx) => {
            const id = `stat-${idx}`;
            const raised = hoveredCard === id;
            return (
              <div
                key={id}
                tabIndex={0}
                className={`card ${raised ? '' : 'hover-raise'}`}
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  borderRadius: '12px',
                  backgroundColor: '#F9FAFB',
                  boxShadow: raised ? '0 8px 24px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
                  transform: raised ? 'translateY(-6px)' : 'translateY(0)',
                  border: '1px solid #E5E7EB',
                }}
                onMouseEnter={() => handleCardEnter(id)}
                onMouseLeave={handleCardLeave}
                onTouchStart={() => handleCardTap(id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardTap(id)}
                aria-label={stat.label}
              >
                <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 700, marginBottom: '10px', color: '#FF7F5C' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#4B5563', fontWeight: 500 }}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="section"
        style={{
          padding: 'clamp(60px, 10vw, 100px) 20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B35 50%, #FF4500 100%)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Ready to Build Your Team?
          </h2>
          <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', lineHeight: 1.7, marginBottom: '40px', opacity: 0.95 }}>
            Let's discuss how we can help you find the right technology talent.
          </p>
          <button
            aria-label="Get Started Today"
            className="btn tap-target"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#FF7F5C',
              padding: 'clamp(14px, 3vw, 18px) clamp(32px, 6vw, 48px)',
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              fontWeight: 600,
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(-3px)';
              el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
            }}
            onTouchStart={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(-2px)';
            }}
            onTouchEnd={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = 'translateY(0)';
            }}
            onClick={() => {
              if (typeof window !== 'undefined' && window.location) {
                window.location.href = '/contact';
              }
            }}
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
