import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Youtube, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/services/userService";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { user, isAdmin } = useAuth();

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
    { title: "קורס ממוקד", path: "/focused-course" },
    { title: "סדנה ממוקדת", path: "/focused-workshop" },
    { title: "הרצאה מותאמת", path: "/custom-lecture" },
    { title: "סדנת היכרות", path: "/intro-workshop" },
    { title: "קורסים דיגיטלים", path: "/digital-courses" },
    { 
      title: "בלוג", 
      path: "#",
      isDropdown: true,
      subLinks: [
        { title: "בלוג וידאו", path: "/blog" },
        { title: "בלוג מאמרים", path: "/written-blog" }
      ]
    },
    { title: "למה מרצה לבינה מלאכותית?", path: "/why-me" },
    { title: "אודות", path: "/about" },
    { title: "צור קשר", path: "/contact" },
  ];

  const adminLinks = [
    { title: "ניהול בלוג", path: "/blog-admin" },
    { title: "ניהול קורסים", path: "/course-admin" },
    { title: "ניהול משתמשים", path: "/user-admin" },
  ];

  const combinedLinks = isAdmin 
    ? [
        ...navLinks.slice(0, 5),
        {
          title: "ניהול",
          path: "#",
          isDropdown: true,
          subLinks: adminLinks
        },
        ...navLinks.slice(5)
      ]
    : navLinks;

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (subLinks: { path: string }[]) => {
    return subLinks.some(link => location.pathname === link.path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
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
            <NavigationMenu dir="rtl" className="rtl">
              <NavigationMenuList className="rtl">
                {combinedLinks.map((link) => (
                  link.isDropdown ? (
                    <NavigationMenuItem key={link.title}>
                      <div className="group relative">
                        <button 
                          className={`nav-link group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 ${isParentActive(link.subLinks) ? "active" : ""}`}
                        >
                          {link.title}
                          <ChevronDown
                            className="relative top-[1px] mr-1 h-3 w-3 transition duration-200 group-hover:rotate-180"
                            aria-hidden="true"
                          />
                        </button>
                        <div className="absolute right-0 top-full z-50 mt-0 hidden w-[200px] rounded-md border bg-popover p-2 shadow-md group-hover:block transition-all duration-300 opacity-0 group-hover:opacity-100 [transition-delay:0ms] group-hover:[transition-delay:200ms]">
                          <ul className="grid gap-1">
                            {link.subLinks.map((subLink) => (
                              <li key={subLink.path}>
                                <Link
                                  to={subLink.path}
                                  className={`block w-full rounded-md p-2 text-right hover:bg-accent ${
                                    isLinkActive(subLink.path) ? "bg-accent" : ""
                                  }`}
                                >
                                  {subLink.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.path}>
                      <Link
                        to={link.path}
                        className={`nav-link ${isLinkActive(link.path) ? "active" : ""}`}
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuItem>
                  )
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  התנתק
                </Button>
              </div>
            ) : (
              <Button 
                asChild 
                variant="default" 
                size="sm"
                className="mr-2"
              >
                <Link to="/auth">התחבר / הירשם</Link>
              </Button>
            )}
            
            <Button 
              asChild 
              variant="outline" 
              size="sm"
            >
              <a 
                href="https://www.youtube.com/@sgolan20" 
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
            {combinedLinks.map((link) => (
              link.isDropdown ? (
                <div key={link.title} className="py-2">
                  <div className="flex items-center justify-between px-4 py-2 text-lg font-medium">
                    {link.title}
                    <ChevronDown className="h-4 w-4" />
                  </div>
                  <div className="pr-6 mt-1">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.path}
                        to={subLink.path}
                        onClick={closeMobileMenu}
                        className={`block py-2 px-4 text-lg ${
                          isLinkActive(subLink.path)
                            ? "text-primary font-medium"
                            : "text-foreground"
                        }`}
                      >
                        {subLink.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
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
              )
            ))}
            
            {/* User authentication for mobile */}
            {user ? (
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="mt-4 mx-4"
              >
                התנתק
              </Button>
            ) : (
              <Button 
                asChild 
                className="mt-4 mx-4"
              >
                <Link to="/auth" onClick={closeMobileMenu}>התחבר / הירשם</Link>
              </Button>
            )}
            
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="mt-4 mx-4"
            >
              <a 
                href="https://www.youtube.com/@sgolan20" 
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
