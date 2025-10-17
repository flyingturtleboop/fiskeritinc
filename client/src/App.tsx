// src/App.tsx
import React, { useState } from 'react';
import Navigation from './Components/Navigation';

// Pages
import HomePage from './Components/Pages/HomePageStandalone';
import ServicesPage from './Components/Pages/ServicesPage';
import RecruitmentPage from './Components/Pages/RecruitmentPage';
import ContactPage from './Components/Pages/ContactPage';
import OurStoryPage from './Components/Pages/About/OurStoryPage';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="w-full">{renderPage()}</div>

      
    </div>
  );
};

export default App;
