// src/App.tsx
import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';

// Pages
import HomePage from './Components/Pages/HomePageStandalone';
import ServicesPage from './Components/Pages/ServicesPage';
import RecruitmentPage from './Components/Pages/RecruitmentPage';
import ContactPage from './Components/Pages/ContactPage';
import OurStoryPage from './Components/Pages/About/OurStoryPage';


const App: React.FC = () => {
  // Initialize from localStorage or default to 'home'
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'home';
  });

  // Listen for navigation events from child components
  React.useEffect(() => {
    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setCurrentPage(customEvent.detail);
      }
    };

    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

  // Save current page to localStorage and scroll to top when page changes
  React.useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'recruitment':
        return <RecruitmentPage />;
      case 'contact':
        return <ContactPage />;
      case 'about/story':
        return <OurStoryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="w-full" style={{ flex: 1 }}>{renderPage()}</div>
      <Footer variant={currentPage === 'services' ? 'services' : 'default'} />
    </div>
  );
};

export default App;
