import React, { useRef, useEffect, useState } from 'react';

interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

const entries: TimelineEntry[] = [
  {
    year: '2022',
    title: 'Fisker IT is Founded',
    description:
      'Vijay and Naveen launched Fisker IT with a vision to connect exceptional SAP talent with industry-leading companies, starting with a focus on quality over quantity.',
  },
  {
    year: '2022',
    title: 'First Client Partnerships',
    description:
      'Secured partnerships with Tech Mahindra and United Therapeutics, establishing our reputation for delivering highly-skilled SAP consultants who exceed client expectations.',
  },
  {
    year: '2023',
    title: 'Rapid Growth & Expansion',
    description:
      'Expanded our client portfolio to include GE Aviation, ERP Fixers, and V-DART. Our team of contractors grew to 10+ professionals across SAP modules including ABAP, SD, FI/CO, and CRM.',
  },
  {
    year: '2024',
    title: '20+ Contractors Strong',
    description:
      'Reached a major milestone with 20+ active contractors successfully placed across our partner companies. Maintained an exceptional 90% retention rate, demonstrating our commitment to perfect matches.',
  },
  {
    year: '2025',
    title: '6 Major Projects Delivered',
    description:
      'Successfully delivered 6 significant SAP implementation and optimization projects. Established our 24-hour response time commitment and currently hiring for SAP CRM and Finance consultant positions.',
  },
];

const TimelinePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillProgress, setFillProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalDocScroll = docHeight - windowHeight;

      const rawProg = totalDocScroll > 0 ? scrollY / totalDocScroll : 0;
      const clamped = Math.min(Math.max(rawProg, 0), 1);
      setFillProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        background: '#FAFAFA',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: isMobile ? '40px 16px' : '60px 20px',
        color: '#1F2937',
        minHeight: '100vh',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
        <h1
          style={{
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#E67E52',
            marginBottom: '1rem',
            padding: '0 10px',
          }}
        >
          Our Story
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.125rem',
          color: '#6B7280',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          From our founding in 2022 to becoming a trusted SAP talent partner for industry leaders
        </p>
      </div>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          padding: isMobile ? '20px 0' : '20px 0',
        }}
      >
        {/* Static grey line behind */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: isMobile ? '20px' : '50%',
            width: '4px',
            background: '#E5E7EB',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            zIndex: 1,
          }}
        />

        {/* Orange fill that grows as you scroll down the page */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: isMobile ? '20px' : '50%',
            width: '4px',
            background: '#E67E52',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            height: `${fillProgress * 100}%`,
            transition: 'height 0.1s linear',
            zIndex: 2,
          }}
        />

        {entries.map((entry, idx) => (
          <TimelineItem
            key={entry.year}
            entry={entry}
            position={idx % 2 === 0 ? 'left' : 'right'}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

interface TimelineItemProps {
  entry: TimelineEntry;
  position: 'left' | 'right';
  isMobile: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ entry, position, isMobile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: isMobile ? '100%' : '45%',
    padding: 0,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    margin: isMobile ? '40px 0' : '60px 0',
    left: isMobile ? 0 : position === 'left' ? 0 : '55%',
    paddingLeft: isMobile ? '50px' : 0,
  };

  const contentStyle: React.CSSProperties = {
    background: '#fff',
    borderLeft: isMobile ? '4px solid #E67E52' : '6px solid #E67E52',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: isMobile ? '20px' : '24px',
    position: 'relative',
    zIndex: 3,
  };

  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    top: isMobile ? '24px' : '28px',
    width: '20px',
    height: '20px',
    background: '#E67E52',
    borderRadius: '50%',
    border: '4px solid #fff',
    boxShadow: '0 0 0 3px #E67E52',
    zIndex: 100,
    ...(isMobile
      ? { left: '10px' }
      : position === 'left'
      ? { right: '-12px' }
      : { left: '-12px' }),
  };

  const yearStyle: React.CSSProperties = {
    margin: '0 0 8px 0',
    fontSize: isMobile ? '1.1rem' : '1.25rem',
    color: '#E67E52',
    fontWeight: 700,
  };

  const titleStyle: React.CSSProperties = {
    margin: '0 0 12px 0',
    fontSize: isMobile ? '1rem' : '1.125rem',
    color: '#1F2937',
    fontWeight: 600,
  };

  const descStyle: React.CSSProperties = {
    margin: 0,
    color: '#4B5563',
    lineHeight: 1.6,
    fontSize: isMobile ? '0.9rem' : '0.95rem',
  };

  return (
    <div ref={ref} style={containerStyle}>
      <div style={dotStyle} />
      <div style={contentStyle}>
        <h2 style={yearStyle}>{entry.year}</h2>
        <h3 style={titleStyle}>{entry.title}</h3>
        <p style={descStyle}>{entry.description}</p>
      </div>
    </div>
  );
};

export default TimelinePage;