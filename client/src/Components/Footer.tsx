import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#2A2A2A',
        color: '#FFFFFF',
        padding: '2rem 1.5rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '1rem',
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
            }}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF7F5C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'services' }));
            }}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF7F5C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            Services
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'recruitment' }));
            }}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF7F5C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            Recruitment
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'about/story' }));
            }}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF7F5C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            Our Story
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }));
            }}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.95rem',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF7F5C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            Contact Us
          </a>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '1rem',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '0.9rem',
              color: '#B0B0B0',
            }}
          >
            © {currentYear} Fisker IT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
