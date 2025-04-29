
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
      <span className="relative z-10 bg-clip-text text-transparent bg-brand-gradient hover:bg-brand-gradient-hover transition-all duration-300">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gradient group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
};

const MobileNavLinks = () => {
  return (
    <div className="flex flex-col space-y-2 py-2">
      <Link to="/" className="block px-4 py-2 text-right font-medium text-gray-800 hover:bg-brand-gradient hover:text-white rounded-md transition-all">דף הבית</Link>
      <Link to="/focused-course" className="block px-4 py-2 text-right font-medium text-gray-800 hover:bg-brand-gradient hover:text-white rounded-md transition-all">קורס ממוקד</Link>
      <Link to="/focused-workshop" className="block px-4 py-2 text-right font-medium text-gray-800 hover:bg-brand-gradient hover:text-white rounded-md transition-all">סדנה ממוקדת</Link>
      <Link to="/custom-lecture" className="block px-4 py-2 text-right font-medium text-gray-800 hover:bg-brand-gradient hover:text-white rounded-md transition-all">הרצאה בהתאמה אישית</Link>
      <Link to="/intro-workshop" className="block px-4 py-2 text-right font-medium text-gray-800 hover:bg-brand-gradient hover:text-white rounded-md transition-all">סדנת מבוא</Link>
      <Link to="/video-blog" className="block px-4 py-2 text-right font-medium text-gray-800 hover:bg-brand-gradient hover:text-white rounded-md transition-all">בלוג וידאו</Link>
      <Link to="/contact" className="block px-4 py-2 text-right font-medium text-gray-800 hover:bg-brand-gradient hover:text-white rounded-md transition-all">צור קשר</Link>
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
            <img src="/lovable-uploads/a1101c8c-6041-4b87-b131-c307256136f7.png" alt="שחר גולן לוגו" className="h-10 md:h-12" />
            <h2 className="text-lg font-bold font-rubik bg-clip-text text-transparent bg-brand-gradient mt-1">שחר גולן</h2>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-auto" dir="rtl">
            <NavButton to="/">דף הבית</NavButton>
            <NavButton to="/focused-course">קורס ממוקד</NavButton>
            <NavButton to="/focused-workshop">סדנה ממוקדת</NavButton>
            <NavButton to="/custom-lecture">הרצאה בהתאמה אישית</NavButton>
            <NavButton to="/intro-workshop">סדנת מבוא</NavButton>
            <NavButton to="/video-blog">בלוג וידאו</NavButton>
            
            <NavButton to="/contact">צור קשר</NavButton>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 relative overflow-hidden group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-brand-gradient transition-opacity duration-300"></div>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-transparent bg-clip-text bg-brand-gradient" />
            ) : (
              <Menu className="h-6 w-6 text-transparent bg-clip-text bg-brand-gradient" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 py-2 bg-white/95 border-t border-gray-200 shadow-lg">
            <MobileNavLinks />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
