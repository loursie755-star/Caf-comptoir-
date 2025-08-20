import React from 'react';
import { Heart, Leaf, Users, Award } from 'lucide-react';
import { aboutText } from '../mockData';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "Passion culinaire",
      description: "Notre chef et son équipe préparent chaque plat avec amour et savoir-faire"
    },
    {
      icon: Leaf,
      title: "Produits locaux",
      description: "Nous privilégions les producteurs locaux pour une cuisine authentique et durable"
    },
    {
      icon: Users,
      title: "Ambiance conviviale",
      description: "Un cadre chaleureux pour partager de bons moments entre amis ou en famille"
    },
    {
      icon: Award,
      title: "Tradition française",
      description: "Une cuisine qui honore les saveurs traditionnelles de notre terroir"
    }
  ];

  return (
    <section id="a-propos" className="section bg-cream">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fade-in-up">{aboutText.title}</h2>
          <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="order-last lg:order-first">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80"
                alt="Équipe du Café Comptoir"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
                style={{
                  filter: 'sepia(10%) saturate(1.1) brightness(1.05)'
                }}
              />
              
              {/* Badge expérience */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: 'var(--color-secondary)' }}>
                    15+
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                    Années<br />d'expérience
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu textuel */}
          <div>
            <div className="prose prose-lg">
              {aboutText.content.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="mb-6 text-lg leading-relaxed fade-in-up"
                  style={{ 
                    color: 'var(--color-text-light)',
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
                Notre engagement qualité
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
                       style={{ backgroundColor: 'var(--color-accent)' }}></div>
                  <span style={{ color: 'var(--color-text-light)' }}>
                    Produits frais sélectionnés quotidiennement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
                       style={{ backgroundColor: 'var(--color-accent)' }}></div>
                  <span style={{ color: 'var(--color-text-light)' }}>
                    Partenariats avec des producteurs locaux de qualité
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" 
                       style={{ backgroundColor: 'var(--color-accent)' }}></div>
                  <span style={{ color: 'var(--color-text-light)' }}>
                    Cuisine maison préparée avec savoir-faire artisanal
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cards des valeurs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card text-center hover:scale-105 transition-transform duration-300 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
                  <feature.icon size={24} />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-secondary)' }}>
                {feature.title}
              </h3>
              
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-light)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;