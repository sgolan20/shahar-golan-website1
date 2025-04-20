
import React from "react";
import { Link } from "react-router-dom";

// NavButton component for consistent navigation styling
const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link to={to} className="block px-3 py-2 hover:text-blue-500 transition-colors">
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
  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            שחר גולן
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
            <div className="relative group">
              <button className="px-3 py-2 hover:text-blue-500 transition-colors">
                בלוג
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <NavButton to="/written-blog">מאמרים</NavButton>
                <NavButton to="/video-blog">בלוג וידאו</NavButton>
              </div>
            </div>
            
            <NavButton to="/contact">צור קשר</NavButton>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className="md:hidden">
        <div className="px-4 py-3 space-y-1 bg-gray-50">
          <MobileNavLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
