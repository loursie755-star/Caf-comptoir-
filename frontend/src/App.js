import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Composants
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import PracticalInfo from "./components/PracticalInfo";
import Reviews from "./components/Reviews";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Fonctions d'animation au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in-up
    const elementsToObserve = document.querySelectorAll('.fade-in-up');
    elementsToObserve.forEach(el => observer.observe(el));

    // Nettoyage
    return () => {
      elementsToObserve.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Scroll smooth pour tout le site
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        
        <main>
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <PracticalInfo />
          <Reviews />
          <Reservation />
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;