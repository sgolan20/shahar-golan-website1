import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

// NavButton component for consistent navigation styling
const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link 
      to={to} 
      className="block px-3 py-2 transition-colors relative group"
    >
      <span className="relative z-10 text-[#4a52a3] hover:text-[#4a52a3]/80 transition-all duration-300">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gradient group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

// BlogDropdown component for desktop
const BlogDropdown = () => {
  return (
    <div className="relative group">
      <div className="flex items-center px-3 py-2 cursor-pointer transition-colors relative group">
        <span className="relative z-10 text-[#4a52a3] group-hover:text-[#4a52a3]/80 transition-all duration-300">
          בלוג
        </span>
        <ChevronDown className="w-4 h-4 mr-1 text-[#4a52a3] group-hover:text-[#4a52a3]/80 transition-all duration-300" />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gradient group-hover:w-full transition-all duration-300"></span>
      </div>
      
      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
        <div className="py-1">
          <Link 
            to="/video-blog" 
            className="block px-4 py-2 text-right text-[#4a52a3] hover:bg-gray-50 hover:text-[#4a52a3]/80 transition-colors"
          >
            בלוג וידאו
          </Link>
          <Link 
            to="/articles-blog" 
            className="block px-4 py-2 text-right text-[#4a52a3] hover:bg-gray-50 hover:text-[#4a52a3]/80 transition-colors"
          >
            בלוג מאמרים
          </Link>
        </div>
      </div>
    </div>
  );
};

const MobileNavLinks = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const [isBlogMenuOpen, setIsBlogMenuOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-2 py-2">
      <Link to="/focused-course" onClick={onLinkClick} className="block px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">קורס ממוקד</Link>
      <Link to="/focused-workshop" onClick={onLinkClick} className="block px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">סדנה ממוקדת</Link>
      <Link to="/custom-lecture" onClick={onLinkClick} className="block px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">הרצאה בהתאמה אישית</Link>
      <Link to="/intro-workshop" onClick={onLinkClick} className="block px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">סדנת היכרות</Link>
      
      {/* Mobile Blog Menu */}
      <div>
        <button 
          onClick={() => setIsBlogMenuOpen(!isBlogMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-gray-50 rounded-md transition-all"
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isBlogMenuOpen ? 'rotate-180' : ''}`} />
          בלוג
        </button>
        {isBlogMenuOpen && (
          <div className="mr-4 mt-1 space-y-1">
            <Link to="/video-blog" onClick={onLinkClick} className="block px-4 py-2 text-right text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">בלוג וידאו</Link>
            <Link to="/articles-blog" onClick={onLinkClick} className="block px-4 py-2 text-right text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">בלוג מאמרים</Link>
          </div>
        )}
      </div>
      
      <Link to="/why-me" onClick={onLinkClick} className="block px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">למה מרצה לבינה מלאכותית?</Link>
      <Link to="/about" onClick={onLinkClick} className="block px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">אודות</Link>
      <Link to="/contact" onClick={onLinkClick} className="block px-4 py-2 text-right font-medium text-[#4a52a3] hover:bg-brand-gradient hover:text-white rounded-md transition-all">צור קשר</Link>
    </div>
  );
};

// Complete Header component with desktop and mobile navigation
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-gradient-to-r from-white via-white to-white/95 shadow-sm z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <img src="/lovable-uploads/logogolanai2.png" alt="שחר גולן לוגו" className="h-10 md:h-12" />
            <h2 className="text-lg font-bold font-rubik bg-clip-text text-transparent bg-brand-gradient mt-1">שחר גולן</h2>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-auto mr-8" dir="rtl">
            <NavButton to="/focused-course">קורס ממוקד</NavButton>
            <NavButton to="/focused-workshop">סדנה ממוקדת</NavButton>
            <NavButton to="/custom-lecture">הרצאה בהתאמה אישית</NavButton>
            <NavButton to="/intro-workshop">סדנת היכרות</NavButton>
            <NavButton to="/why-me">למה מרצה לבינה מלאכותית?</NavButton>
            <BlogDropdown />
            <NavButton to="/about">אודות</NavButton>
            <NavButton to="/contact">צור קשר</NavButton>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 relative overflow-hidden group z-50 bg-white rounded-md shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="תפריט"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-brand-gradient transition-opacity duration-300 rounded-md"></div>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#4a52a3]" />
            ) : (
              <Menu className="h-6 w-6 text-[#4a52a3]" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 py-2 bg-white/95 border-t border-gray-200 shadow-lg">
            <MobileNavLinks onLinkClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
