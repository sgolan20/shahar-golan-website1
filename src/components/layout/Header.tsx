import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { title: "בית", path: "/" },
    { title: "אודות", path: "/about" },
    { title: "למה אני?", path: "/why-me" },
    { title: "בלוג", path: "/blog" },
    { title: "צור קשר", path: "/contact" },
  ];

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="text-2xl font-display font-bold text-gradient"
          >
            שחר גולן
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isLinkActive(link.path) ? "active" : ""}`}
              >
                {link.title}
              </Link>
            ))}
            <Button 
              asChild 
              variant="outline" 
              size="sm"
            >
              <a 
                href="https://www.youtube.com/channel/UCxxxxxxxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-red-600 text-white hover:bg-red-700 border-red-600 hover:border-red-700"
              >
                <Youtube className="ml-2 h-4 w-4" />
                ערוץ היוטיוב
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col text-right">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`py-2 px-4 text-lg ${
                  isLinkActive(link.path)
                    ? "text-primary font-medium"
                    : "text-foreground"
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Button 
              asChild 
              variant="outline" 
              size="sm"
            >
              <a 
                href="https://www.youtube.com/channel/UCxxxxxxxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-red-600 text-white hover:bg-red-700 border-red-600 hover:border-red-700"
              >
                <Youtube className="ml-2 h-4 w-4" />
                ערוץ היוטיוב
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
