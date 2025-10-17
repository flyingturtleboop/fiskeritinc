import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import FiskerLogo from '../assets/fisker-logo.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const NAV_HEIGHT = 80;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: 500,
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    transition: 'all 0.3s ease',
    outline: 'none',
  };

  const activeOrHoverStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.25)',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    outline: '2px solid white',
  };

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    width: '100vw',
    height: `${NAV_HEIGHT}px`,
    background: '#F4F4F4',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
  };

  const navPillsStyle: React.CSSProperties = {
    display: 'flex',
    background: '#ff7f5c',
    borderRadius: '50px',
    padding: '8px',
    gap: '4px',
    boxShadow: '0 8px 25px rgba(255, 127, 92, 0.3)',
  };

  const logoStyle: React.CSSProperties = {
    height: '50px',
    cursor: 'pointer',
  };

  const mobileMenuStyle: React.CSSProperties = {
    position: 'fixed',
    top: NAV_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(244, 244, 244, 0.98)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '10px',
    zIndex: 999,
    animation: 'slideDown 0.3s ease-out',
  };

  const mobileNavButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 24px',
    background: '#ff7f5c',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    fontSize: '18px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(255, 127, 92, 0.3)',
  };

  const mobileActiveOrHoverStyle: React.CSSProperties = {
    background: '#e66b4a',
    outline: '2px solid white',
    transform: 'scale(1.02)',
    boxShadow: '0 6px 16px rgba(255, 127, 92, 0.4)',
  };

  const handleMobileMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = '#e66b4a';
    e.currentTarget.style.outline = '2px solid white';
    e.currentTarget.style.transform = 'scale(1.02)';
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 127, 92, 0.4)';
  };

  const handleMobileMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, isActive: boolean) => {
    if (!isActive) {
      e.currentTarget.style.background = '#ff7f5c';
      e.currentTarget.style.outline = 'none';
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 127, 92, 0.3)';
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const topPos = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const handleOurStoryClick = () => {
    if (currentPage !== 'about/story') {
      onNavigate('about/story');
      setTimeout(() => scrollToSection('our-story'), 200);
    } else {
      scrollToSection('our-story');
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.outline = '2px solid #EEEEEE';
  };
  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.outline = 'none';
  };
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
    e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.1)';
    e.currentTarget.style.outline = '2px solid white';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.outline = 'none';
  };

  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <nav style={navStyle}>
        <div style={containerStyle}>
          {/* LOGO */}
          <img
            src={FiskerLogo}
            alt="Fisker IT Logo"
            style={logoStyle}
            onClick={() => handleNavigate('home')}
          />

          {/* DESKTOP NAV */}
          {!isMobile && (
            <div style={navPillsStyle}>
              <button
                style={{
                  ...navLinkStyle,
                  ...(currentPage === 'home' ? activeOrHoverStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={() => handleNavigate('home')}
              >
                Home
              </button>

              <button
                style={{
                  ...navLinkStyle,
                  ...(currentPage === 'services' ? activeOrHoverStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={() => handleNavigate('services')}
              >
                Services
              </button>

              <button
                style={{
                  ...navLinkStyle,
                  ...(currentPage === 'recruitment' ? activeOrHoverStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={() => handleNavigate('recruitment')}
              >
                Recruitment
              </button>

              <button
                style={{
                  ...navLinkStyle,
                  ...(currentPage === 'about/story' ? activeOrHoverStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleOurStoryClick}
              >
                Our Story
              </button>

              <button
                style={{
                  ...navLinkStyle,
                  ...(currentPage === 'contact' ? activeOrHoverStyle : {}),
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={() => handleNavigate('contact')}
              >
                Contact Us
              </button>
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: '#ff7f5c',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 127, 92, 0.3)',
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} color="white" />
              ) : (
                <Menu size={24} color="white" />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobile && isMobileMenuOpen && (
        <div style={mobileMenuStyle}>
          <button
            style={{
              ...mobileNavButtonStyle,
              ...(currentPage === 'home' ? mobileActiveOrHoverStyle : {}),
            }}
            onMouseEnter={handleMobileMouseEnter}
            onMouseLeave={(e) => handleMobileMouseLeave(e, currentPage === 'home')}
            onClick={() => handleNavigate('home')}
          >
            Home
          </button>

          <button
            style={{
              ...mobileNavButtonStyle,
              ...(currentPage === 'services' ? mobileActiveOrHoverStyle : {}),
            }}
            onMouseEnter={handleMobileMouseEnter}
            onMouseLeave={(e) => handleMobileMouseLeave(e, currentPage === 'services')}
            onClick={() => handleNavigate('services')}
          >
            Services
          </button>

          <button
            style={{
              ...mobileNavButtonStyle,
              ...(currentPage === 'recruitment' ? mobileActiveOrHoverStyle : {}),
            }}
            onMouseEnter={handleMobileMouseEnter}
            onMouseLeave={(e) => handleMobileMouseLeave(e, currentPage === 'recruitment')}
            onClick={() => handleNavigate('recruitment')}
          >
            Recruitment
          </button>

          <button
            style={{
              ...mobileNavButtonStyle,
              ...(currentPage === 'about/story' ? mobileActiveOrHoverStyle : {}),
            }}
            onMouseEnter={handleMobileMouseEnter}
            onMouseLeave={(e) => handleMobileMouseLeave(e, currentPage === 'about/story')}
            onClick={handleOurStoryClick}
          >
            Our Story
          </button>

          <button
            style={{
              ...mobileNavButtonStyle,
              ...(currentPage === 'contact' ? mobileActiveOrHoverStyle : {}),
            }}
            onMouseEnter={handleMobileMouseEnter}
            onMouseLeave={(e) => handleMobileMouseLeave(e, currentPage === 'contact')}
            onClick={() => handleNavigate('contact')}
          >
            Contact Us
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;