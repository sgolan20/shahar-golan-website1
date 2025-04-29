
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

// NavButton component for consistent navigation styling
const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link to={to} className="block px-3 py-2 hover:text-brandBlue transition-colors">
      {children}
    </Link>
  );
};

const MobileNavLinks = () => {
  return (
    <>
      <NavButton to="/">דף הבית</NavButton>
      <NavButton to="/focused-course">קורס ממוקד</NavButton>
      <NavButton to="/focused-workshop">סדנה ממוקדת</NavButton>
      <NavButton to="/custom-lecture">הרצאה בהתאמה אישית</NavButton>
      <NavButton to="/intro-workshop">סדנת מבוא</NavButton>
      <NavButton to="/digital-courses">קורסים דיגיטליים</NavButton>
      <div className="border-t pt-3 pb-1">
        <h3 className="text-sm font-medium mb-2">בלוג</h3>
        <div className="grid gap-1 pr-2">
          <NavButton to="/written-blog">מאמרים</NavButton>
          <NavButton to="/video-blog">בלוג וידאו</NavButton>
        </div>
      </div>
      <NavButton to="/contact">צור קשר</NavButton>
    </>
  );
};

// Complete Header component with desktop and mobile navigation
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/a1101c8c-6041-4b87-b131-c307256136f7.png" alt="שחר גולן לוגו" className="h-10 md:h-12" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-auto" dir="rtl">
            <NavButton to="/">דף הבית</NavButton>
            <NavButton to="/focused-course">קורס ממוקד</NavButton>
            <NavButton to="/focused-workshop">סדנה ממוקדת</NavButton>
            <NavButton to="/custom-lecture">הרצאה בהתאמה אישית</NavButton>
            <NavButton to="/intro-workshop">סדנת מבוא</NavButton>
            <NavButton to="/digital-courses">קורסים דיגיטליים</NavButton>
            
            {/* Blog Dropdown */}
            <div className="relative blog-dropdown">
              <button className="px-3 py-2 hover:text-brandBlue transition-colors flex items-center">
                בלוג
                <ChevronDown className="mr-1 h-4 w-4 chevron-icon transition-transform" />
              </button>
              <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                <NavButton to="/written-blog">מאמרים</NavButton>
                <NavButton to="/video-blog">בלוג וידאו</NavButton>
              </div>
            </div>
            
            <NavButton to="/contact">צור קשר</NavButton>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-brandBlue" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-3 space-y-1 bg-gray-50">
            <MobileNavLinks />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
