import React, { useState } from 'react';
import { ChefHat, Clock, Euro } from 'lucide-react';
import { menuItems } from '../mockData';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous les plats' },
    { id: 'Plats principaux', label: 'Plats principaux' },
    { id: 'Poissons', label: 'Poissons' },
    { id: 'Spécialités', label: 'Spécialités' },
    { id: 'Enfants', label: 'Menu Enfant' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const menuDuJour = {
    entree: "Terrine maison aux herbes de Provence",
    plat: "Cuisse de canard confite, gratin de crozets",
    dessert: "Tarte aux pommes de nos vergers",
    prix: "28€"
  };

  return (
    <section id="menu" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="fade-in-up">Notre Menu</h2>
          <p className="text-xl mt-4 fade-in-up" style={{ 
            color: 'var(--color-text-light)',
            animationDelay: '0.2s'
          }}>
            Découvrez nos spécialités françaises préparées avec passion
          </p>
          <div className="w-24 h-1 mx-auto mt-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
        </div>

        {/* Menu du jour */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 shadow-lg border-2 border-yellow-200 fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ChefHat className="text-yellow-600" size={32} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--color-secondary)' }}>
                Menu du jour
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="font-semibold text-yellow-700 mb-2">Entrée</div>
                <p style={{ color: 'var(--color-text-light)' }}>{menuDuJour.entree}</p>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-700 mb-2">Plat</div>
                <p style={{ color: 'var(--color-text-light)' }}>{menuDuJour.plat}</p>
              </div>
              <div className="text-center">
                <div className="font-semibold text-yellow-700 mb-2">Dessert</div>
                <p style={{ color: 'var(--color-text-light)' }}>{menuDuJour.dessert}</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold text-xl">
                <Euro size={20} />
                {menuDuJour.prix}
              </div>
              <p className="text-sm mt-2 text-yellow-700">Menu complet disponible du lundi au samedi</p>
            </div>
          </div>
        </div>

        {/* Filtres de catégories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
              style={selectedCategory === category.id ? {
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #B8860B 100%)'
              } : {}}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Liste des plats */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-102 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold pr-4" style={{ color: 'var(--color-secondary)' }}>
                  {item.name}
                </h3>
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                    {item.price}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: 'var(--color-cream)', 
                        color: 'var(--color-text-light)' 
                      }}>
                  {item.category}
                </span>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>Préparé à la commande</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-secondary)' }}>
              Informations importantes
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-dark)' }}>
                  🍷 Accompagnements
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  Carte des vins sélectionnés avec soin pour accompagner nos plats. 
                  Notre équipe vous conseille selon vos préférences.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-dark)' }}>
                  🌱 Régimes particuliers
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>
                  Options végétariennes disponibles sur demande. 
                  N'hésitez pas à nous signaler vos allergies alimentaires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;