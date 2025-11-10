import { useEffect, useState } from "react";

// Import logos using path alias or absolute path from src
import techMahindraLogo from "/src/assets/logos/tech-mahindra.png";
import unitedTherapeuticsLogo from "/src/assets/logos/united-therapeutics.svg";
import geAviationLogo from "/src/assets/logos/ge-aviation.svg";
import erpFixersLogo from "/src/assets/logos/erp-fixers.jpg";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=800&fit=crop",
      title: "Connect Talent with Opportunity",
      desc: "We help skilled IT professionals find their perfect role with leading companies like Tech Mahindra, United Therapeutics, and GE Aviation.",
      cta: "Our Story",
      target: "about",
    },
    {
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=800&fit=crop",
      title: "SAP Expertise That Delivers",
      desc: "Specialized in SAP solutions with proven success across Finance, CRM, and ABAP development.",
      cta: "Our Clients",
      target: "clients",
    },
    {
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=800&fit=crop",
      title: "Build Your Career",
      desc: "Join our team of 20+ contractors working on cutting-edge projects with industry-leading companies.",
      cta: "Join Our Team",
      target: "join",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, isMobile ? 4500 : 6000);
    return () => clearInterval(timer);
  }, [slides.length, isMobile]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToRecruitment = () => {
    // Dispatch custom event to navigate to recruitment page
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'recruitment' }));
  };

  const stats = [
    { label: "Active Contractors", val: "20+" },
    { label: "Projects Delivered", val: "6" },
    { label: "Partner Companies", val: "4" },
    { label: "Retention Rate", val: "90%" },
  ];

  const clients = [
    { name: "Tech Mahindra", url: techMahindraLogo },
    { name: "United Therapeutics", url: unitedTherapeuticsLogo },
    { name: "GE Aerospace", url: geAviationLogo },
    { name: "ERPfixers", url: erpFixersLogo },
  ];

  const jobs = [
    { title: "SAP CRM Consultant", desc: "Customer Relationship Management specialist to optimize client interactions and drive business growth.", salary: "Competitive" },
    { title: "SAP Finance Consultant", desc: "Financial systems expert to streamline accounting processes and financial reporting.", salary: "Competitive" },
  ];

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#2A2A2A',
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '50vh' : '65vh',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #FDF8F5, #FFFFFF)'
      }}>
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.img}
            alt={slide.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: i === currentSlide ? 0.15 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          />
        ))}
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(253,248,245,0.6), rgba(255,255,255,0.4))'
        }} />

        {/* Left edge fade */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '20%',
          background: 'linear-gradient(to right, rgba(253,248,245,0.9), transparent)',
          pointerEvents: 'none'
        }} />

        {/* Right edge fade */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '20%',
          background: 'linear-gradient(to left, rgba(253,248,245,0.9), transparent)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '700px',
          padding: '0 20px'
        }}>
          <h1 style={{
            fontSize: isMobile ? '1.75rem' : '2.75rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            lineHeight: 1.3,
            color: '#2A2A2A'
          }}>
            {slides[currentSlide].title}
          </h1>
          <p style={{
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            marginBottom: '1.5rem',
            color: '#6B7280',
            maxWidth: '550px',
            margin: '0 auto 1.5rem'
          }}>
            {slides[currentSlide].desc}
          </p>
          <button
            onClick={() => scrollTo(slides[currentSlide].target)}
            style={{
              background: 'linear-gradient(135deg, #E67E52, #F4A582)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              border: '2px solid white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            {slides[currentSlide].cta}
            <span>→</span>
          </button>
        </div>

        {/* Slide indicators */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.75rem',
          zIndex: 10
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                height: '10px',
                width: i === currentSlide ? '32px' : '10px',
                borderRadius: '5px',
                border: 'none',
                background: i === currentSlide ? '#E67E52' : 'rgba(230,126,82,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section id="clients" style={{
        padding: isMobile ? '3rem 1rem' : '4rem 1.5rem',
        background: 'linear-gradient(135deg, #FDF8F5, #FFFFFF, rgba(244,165,130,0.05))'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: 800,
              marginBottom: '0.75rem'
            }}>
              Trusted by <span style={{ color: '#E67E52' }}>Industry Leaders</span>
            </h2>
            <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              We partner with forward-thinking companies to deliver exceptional SAP talent
            </p>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Left blur gradient */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '128px',
              zIndex: 10,
              pointerEvents: 'none',
              background: 'linear-gradient(to right, #FFFFFF, transparent)'
            }} />
            
            {/* Right blur gradient */}
            <div style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '128px',
              zIndex: 10,
              pointerEvents: 'none',
              background: 'linear-gradient(to left, #FFFFFF, transparent)'
            }} />

            {/* Scrolling animation */}
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .scrolling-logos {
                animation: scroll 20s linear infinite;
              }
              .scrolling-logos:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="scrolling-logos" style={{
              display: 'flex',
              gap: isMobile ? '2rem' : '3rem'
            }}>
              {clients.concat(clients).map((client, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: isMobile ? '192px' : '224px',
                    height: isMobile ? '128px' : '144px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF',
                    border: '1px solid rgba(230,126,82,0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                  }}
                >
                  <img
                    src={client.url}
                    alt={client.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      filter: 'grayscale(100%)',
                      transition: 'filter 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                    onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{
        padding: isMobile ? '3.5rem 1rem' : '6rem 1.5rem',
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              About <span style={{ color: '#E67E52' }}>Fisker IT</span>
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: 1.7,
              color: '#6B7280',
              marginBottom: '1rem'
            }}>
              We connect talented IT professionals with leading companies. Our contractors have successfully delivered 6 major projects for clients including Tech Mahindra, United Therapeutics, GE Aviation, and ERP Fixers.
            </p>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: 1.7,
              color: '#6B7280'
            }}>
              With a 90% retention rate and 24-hour response time, we pride ourselves on building lasting relationships between exceptional talent and forward-thinking organizations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(135deg, #FDF8F5, #FFFFFF)',
                  border: '1px solid rgba(230,126,82,0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#E67E52', marginBottom: '0.25rem' }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7280' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN SECTION */}
      <section id="join" style={{
        padding: isMobile ? '3.5rem 1rem' : '6rem 1.5rem',
        background: 'linear-gradient(135deg, #E67E52, #F4A582, #E67E52)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '60px 60px'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2.5rem' : '4rem',
            fontWeight: 800,
            marginBottom: '1.5rem'
          }}>
            Join Our Team
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            opacity: 0.95
          }}>
            Join our growing team of 20+ contractors working with companies like Tech Mahindra, United Therapeutics, and GE Aviation. Currently hiring for 2 SAP positions with 24-hour response time.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {jobs.map((job, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
              >
                <div style={{
                  height: '4px',
                  background: 'linear-gradient(90deg, #E67E52, #F4A582)'
                }} />
                <div style={{
                  padding: '1.5rem',
                  color: '#2A2A2A',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '280px'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem'
                  }}>
                    {job.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: '#6B7280',
                    marginBottom: '1rem',
                    flex: 1
                  }}>
                    {job.desc}
                  </p>
                  <div style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: 700,
                    color: '#E67E52',
                    marginBottom: '1rem'
                  }}>
                    {job.salary}
                  </div>
                  <button
                    onClick={goToRecruitment}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #E67E52, #F4A582)',
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Apply Now
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
