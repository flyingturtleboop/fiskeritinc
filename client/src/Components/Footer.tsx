import React from 'react';

interface FooterProps {
  variant?: 'default' | 'services';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  const currentYear = new Date().getFullYear();

  const isServices = variant === 'services';

  return (
    <footer
      style={{
        background: isServices 
          ? '#FFFFFF'
          : 'linear-gradient(135deg, #E67E52, #F4A582)',
        color: isServices ? '#1F2937' : '#FFFFFF',
        padding: '1.5rem 1rem',
        marginTop: 'auto',
        borderTop: isServices ? '1px solid #E5E7EB' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {['home', 'services', 'recruitment', 'about/story', 'contact'].map((page) => {
            const labels: Record<string, string> = {
              'home': 'Home',
              'services': 'Services',
              'recruitment': 'Recruitment',
              'about/story': 'Our Story',
              'contact': 'Contact Us'
            };
            return (
              <a
                key={page}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
                }}
                style={{
                  color: isServices ? '#4B5563' : '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: isServices ? 'color 0.3s' : 'opacity 0.3s',
                  opacity: isServices ? 1 : 0.9,
                }}
                onMouseEnter={(e) => {
                  if (isServices) {
                    e.currentTarget.style.color = '#FF7F5C';
                  } else {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isServices) {
                    e.currentTarget.style.color = '#4B5563';
                  } else {
                    e.currentTarget.style.opacity = '0.9';
                  }
                }}
              >
                {labels[page]}
              </a>
            );
          })}
          <span style={{ color: isServices ? 'rgba(75, 85, 99, 0.3)' : 'rgba(255, 255, 255, 0.4)' }}>|</span>
          <a
            href="https://www.linkedin.com/company/fisker-it-consulting/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: isServices ? '#4B5563' : '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: isServices ? 'color 0.3s' : 'opacity 0.3s',
              opacity: isServices ? 1 : 0.9,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
            onMouseEnter={(e) => {
              if (isServices) {
                e.currentTarget.style.color = '#FF7F5C';
              } else {
                e.currentTarget.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              if (isServices) {
                e.currentTarget.style.color = '#4B5563';
              } else {
                e.currentTarget.style.opacity = '0.9';
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>

        <div
          style={{
            fontSize: '0.8rem',
            color: isServices ? '#6B7280' : 'rgba(255, 255, 255, 0.85)',
            textAlign: 'center',
          }}
        >
          © {currentYear} Fisker IT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
