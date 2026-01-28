import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PortfolioSection from './components/PortfolioSection';
import Contact from './components/Contact';
import Admin from './components/Admin';
import { INITIAL_ITEMS, CATEGORY_DETAILS } from './constants';
import { PortfolioItem, CategoryInfo, PortfolioCategory } from './types';

const App: React.FC = () => {
  // 스토리지 키를 v4로 변경하여 업데이트된 영상 데이터가 강제로 로드되게 함
  const STORAGE_KEY_ITEMS = 'ahyun_portfolio_items_v4';
  const STORAGE_KEY_CATS = 'ahyun_portfolio_categories_v4';

  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(item => item && item.id && Array.isArray(item.media));
        }
      }
    } catch (e) {
      console.error("Data Load Error, falling back to initial data");
    }
    return INITIAL_ITEMS;
  });

  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return CATEGORY_DETAILS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
      localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
    } catch (e) {
      console.error("Storage Save Error");
    }
  }, [items, categories]);

  const handleUpdateItems = (updater: PortfolioItem[] | ((prev: PortfolioItem[]) => PortfolioItem[])) => {
    setItems(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return [...next];
    });
  };
  
  const handleUpdateCategories = (newCats: CategoryInfo[]) => {
    setCategories([...newCats]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header 
        onAdminClick={() => setIsAdminOpen(true)} 
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onPortfolioClick={() => scrollToSection('portfolio')}
        onContactClick={() => scrollToSection('contact')}
        categories={categories}
        onCategorySelect={(cat) => scrollToSection(cat)}
      />
      
      <main>
        <Hero />
        <div id="portfolio" className="py-20 px-6 max-w-7xl mx-auto space-y-32">
          {categories.map((cat) => (
            <PortfolioSection 
              key={cat.type}
              categoryInfo={cat}
              items={items.filter(item => item && item.category === cat.type)}
              index={0}
            />
          ))}
        </div>
        <Contact />
      </main>

      <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/5 bg-[#0a0a0a]">
        <p>&copy; 2024 Lee Ahyun Editor. All rights reserved.</p>
        <button onClick={() => setIsAdminOpen(true)} className="mt-4 text-xs opacity-20 hover:opacity-100 transition-opacity">Admin Access</button>
      </footer>

      {isAdminOpen && (
        <Admin 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)}
          items={items}
          categories={categories}
          onUpdateItems={handleUpdateItems}
          onUpdateCategories={handleUpdateCategories}
        />
      )}
    </div>
  );
};

export default App;