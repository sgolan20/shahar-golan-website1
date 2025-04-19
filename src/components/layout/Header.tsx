
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useMobile from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/services/userService";
import { useToast } from "@/components/ui/use-toast";
import { 
  Menu, X, User, ChevronDown, LogOut, BookOpen, 
  Settings, UserCircle
} from "lucide-react";

const Header = () => {
  const { isMobile } = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, isPaidUser, checkingSession } = useAuth();
  const { toast } = useToast();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast({
        title: "התנתקת בהצלחה",
        description: "מקווים לראות אותך שוב בקרוב!",
      });
    } else {
      toast({
        title: "שגיאה בהתנתקות",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  return (
    <header className="sticky top-0 bg-white border-b z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            שחר גולן
          </Link>

          {/* Navigation - Desktop */}
          {!isMobile && (
            <nav className="flex items-center space-x-1 space-x-reverse">
              <NavLinks />
              
              {/* Auth Status */}
              {!checkingSession && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        <UserCircle className="h-4 w-4" />
                        {user.full_name || "חשבון"}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                          <User className="h-4 w-4" />
                          <span>הפרופיל שלי</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem asChild>
                        <Link to="/digital-courses" className="flex items-center gap-2 cursor-pointer">
                          <BookOpen className="h-4 w-4" />
                          <span>הקורסים שלי</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to="/course-admin" className="flex items-center gap-2 cursor-pointer">
                              <Settings className="h-4 w-4" />
                              <span>ניהול קורסים</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/user-admin" className="flex items-center gap-2 cursor-pointer">
                              <Settings className="h-4 w-4" />
                              <span>ניהול משתמשים</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
                        <LogOut className="h-4 w-4" />
                        <span>התנתק</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild variant="outline">
                    <Link to="/auth">התחבר / הירשם</Link>
                  </Button>
                )
              )}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-white z-30 overflow-y-auto">
          <div className="container mx-auto py-6 flex flex-col gap-4">
            <MobileNavLinks />
            
            {/* Auth Status for Mobile */}
            {!checkingSession && (
              <div className="mt-4 border-t pt-4">
                {user ? (
                  <>
                    <div className="text-sm text-muted-foreground mb-2">
                      מחובר כ: {user.full_name || user.email}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="outline" className="justify-start" size="sm">
                        <Link to="/profile" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          הפרופיל שלי
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="justify-start" size="sm">
                        <Link to="/digital-courses" className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          הקורסים שלי
                        </Link>
                      </Button>
                      
                      {isAdmin && (
                        <>
                          <div className="h-px bg-border my-2" />
                          <Button asChild variant="outline" className="justify-start" size="sm">
                            <Link to="/course-admin" className="flex items-center gap-2">
                              <Settings className="h-4 w-4" />
                              ניהול קורסים
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="justify-start" size="sm">
                            <Link to="/user-admin" className="flex items-center gap-2">
                              <Settings className="h-4 w-4" />
                              ניהול משתמשים
                            </Link>
                          </Button>
                        </>
                      )}
                      
                      <div className="h-px bg-border my-2" />
                      <Button onClick={handleSignOut} variant="destructive" className="justify-start" size="sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        התנתק
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button asChild className="w-full">
                    <Link to="/auth">התחבר / הירשם</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Navigation Links
const NavLinks = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "bg-muted" : "";
  };
  
  return (
    <>
      <Button asChild variant="ghost" className={isActive("/")}>
        <Link to="/">דף הבית</Link>
      </Button>
      <Button asChild variant="ghost" className={isActive("/about")}>
        <Link to="/about">אודות</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-1">
            שירותים
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to="/focused-course">קורס ממוקד</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/focused-workshop">סדנה ממוקדת</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/custom-lecture">הרצאה בהתאמה אישית</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/intro-workshop">סדנת מבוא</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/digital-courses">קורסים דיגיטליים</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button asChild variant="ghost" className={isActive("/blog")}>
        <Link to="/blog">מאמרים</Link>
      </Button>
      <Button asChild variant="ghost" className={isActive("/contact")}>
        <Link to="/contact">צור קשר</Link>
      </Button>
    </>
  );
};

// Mobile Navigation Links
const MobileNavLinks = () => {
  return (
    <>
      <NavButton to="/">דף הבית</NavButton>
      <NavButton to="/about">אודות</NavButton>
      <div className="border-t pt-3 pb-1">
        <h3 className="text-sm font-medium mb-2">שירותים</h3>
        <div className="grid gap-1 pr-2">
          <NavButton to="/focused-course">קורס ממוקד</NavButton>
          <NavButton to="/focused-workshop">סדנה ממוקדת</NavButton>
          <NavButton to="/custom-lecture">הרצאה בהתאמה אישית</NavButton>
          <NavButton to="/intro-workshop">סדנת מבוא</NavButton>
          <NavButton to="/digital-courses">קורסים דיגיטליים</NavButton>
        </div>
      </div>
      <NavButton to="/blog">מאמרים</NavButton>
      <NavButton to="/contact">צור קשר</NavButton>
    </>
  );
};

const NavButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Button
      asChild
      variant={isActive ? "default" : "ghost"}
      className="justify-start w-full"
    >
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default Header;
