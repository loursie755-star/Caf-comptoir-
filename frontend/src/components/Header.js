import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { restaurantInfo } from '../mockData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'a-propos', label: 'À propos' },
    { id: 'menu', label: 'Menu' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'infos', label: 'Infos pratiques' },
    { id: 'avis', label: 'Avis clients' }
  ];

  return (
    <header className={`nav-fixed transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo et nom */}
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-secondary)' }}>
              {restaurantInfo.name}
            </div>
            <div className="hidden md:block text-sm" style={{ color: 'var(--color-text-light)' }}>
              Montbrison
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-yellow-600 transition-colors duration-200"
                style={{ color: 'var(--color-text-light)' }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Boutons de contact desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center gap-2 text-sm hover:text-yellow-600 transition-colors duration-200"
              style={{ color: 'var(--color-text-light)' }}
            >
              <Phone size={16} />
              <span className="hidden lg:block">{restaurantInfo.phone}</span>
            </a>
            
            <button
              onClick={() => scrollToSection('reservation')}
              className="btn-primary text-sm py-2 px-4"
            >
              Réserver
            </button>
          </div>

          {/* Menu hamburger mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            style={{ color: 'var(--color-secondary)' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="container py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 px-4 hover:bg-gray-50 transition-colors duration-200"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t mt-4 pt-4 px-4">
                <a 
                  href={`tel:${restaurantInfo.phone}`}
                  className="flex items-center gap-2 mb-3 text-sm"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  <Phone size={16} />
                  {restaurantInfo.phone}
                </a>
                
                <a 
                  href={`mailto:${restaurantInfo.email}`}
                  className="flex items-center gap-2 mb-3 text-sm"
                  style={{ color: 'var(--color-text-light)' }}
                >
                  <Mail size={16} />
                  {restaurantInfo.email}
                </a>
                
                <button
                  onClick={() => scrollToSection('reservation')}
                  className="btn-primary w-full text-sm py-2"
                >
                  Réserver votre table
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;