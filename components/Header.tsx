
import React, { useState } from 'react';
import { CategoryInfo, PortfolioCategory } from '../types';

interface HeaderProps {
  onAdminClick: () => void;
  onHomeClick: () => void;
  onPortfolioClick: () => void;
  onContactClick: () => void;
  categories: CategoryInfo[];
  onCategorySelect: (cat: PortfolioCategory) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onAdminClick, 
  onHomeClick, 
  onPortfolioClick, 
  onContactClick,
  categories,
  onCategorySelect
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center text-white">
        <button onClick={onHomeClick} className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-left">
          Lee Ahyun <span className="text-gray-500 font-light">Editor</span>
        </button>
        
        <nav className="hidden md:flex gap-10 items-center text-sm font-medium tracking-wide">
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              onClick={onPortfolioClick}
              className="hover:text-[#ffa04d] transition-colors uppercase py-2"
            >
              Portfolio
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 w-48 bg-black/90 border border-white/10 rounded-sm py-2 shadow-2xl transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              {categories.map((cat) => (
                <button
                  key={cat.type}
                  onClick={() => {
                    onCategorySelect(cat.type);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-[#ffa04d] hover:bg-white/5 transition-colors"
                >
                  {cat.type}
                </button>
              ))}
            </div>
          </div>
          
          <button onClick={onContactClick} className="hover:text-[#ffa04d] transition-colors uppercase">Contact</button>
          <button 
            onClick={onAdminClick}
            className="hover:text-[#ffa04d] transition-colors uppercase text-xs opacity-50 hover:opacity-100"
          >
            Admin
          </button>
        </nav>

        <button 
          onClick={onAdminClick}
          className="md:hidden p-2 text-gray-400 hover:text-[#ffa04d]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
