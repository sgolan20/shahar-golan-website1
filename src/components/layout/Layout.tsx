import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SEOHelmet from "./SEOHelmet";
import { useLocation } from "react-router-dom";
import CookieConsent from "../CookieConsent";
import { useCookieConsent } from "../../hooks/useCookieConsent";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const Layout = ({ 
  children, 
  title, 
  description, 
  keywords, 
  ogImage 
}: LayoutProps) => {
  const location = useLocation();
  const { handleAccept, handleReject, handleManage } = useCookieConsent();
  
  // Define SEO data for each page
  const getSEOData = () => {
    switch (location.pathname) {
      case "/":
        return {
          title: title || "שחר גולן - מרצה ומומחה ל-AI ובינה מלאכותית",
          description: description || "מרצה ומדריך לבינה מלאכותית וכלי AI, מלמד כיצד להשתמש בכלים מתקדמים בחיי היום יום והעבודה",
          keywords: keywords || "בינה מלאכותית, AI, הרצאות, סדנאות, למידת מכונה, שחר גולן"
        };
      case "/about":
        return {
          title: title || "אודות שחר גולן - מרצה ומומחה לבינה מלאכותית",
          description: description || "הכירו את שחר גולן, מרצה מוביל בתחום הבינה המלאכותית עם ניסיון רב בהדרכות מעשיות",
          keywords: keywords || "אודות שחר גולן, ניסיון בינה מלאכותית, רקע מקצועי, מרצה AI"
        };
      case "/why-me":
        return {
          title: title || "למה ללמוד AI דווקא עם שחר גולן?",
          description: description || "10 סיבות מובילות ללמוד בינה מלאכותית ו-AI עם שחר גולן - הדרכה מותאמת אישית ומעשית",
          keywords: keywords || "למה שחר גולן, יתרונות למידה, הדרכת AI, קורסים בינה מלאכותית"
        };
      case "/blog":
        return {
          title: title || "בלוג AI - שחר גולן | חדשות ועדכונים בתחום הבינה המלאכותית",
          description: description || "מאמרים, טיפים וחדשות על בינה מלאכותית, כלי AI חדשים ואיך להשתמש בהם בצורה יעילה",
          keywords: keywords || "בלוג AI, מאמרים בינה מלאכותית, טיפים לשימוש ב-AI, חדשות טכנולוגיה"
        };
      case "/contact":
        return {
          title: title || "צור קשר - שחר גולן | הרצאות וסדנאות בינה מלאכותית",
          description: description || "רוצים לקבוע הרצאה, סדנה או קורס בינה מלאכותית? צרו קשר עם שחר גולן עוד היום",
          keywords: keywords || "צור קשר, הזמנת הרצאות, סדנאות AI, ייעוץ בינה מלאכותית"
        };
      case "/focused-course":
        return {
          title: title || "קורס ממוקד בהתאמה אישית - שחר גולן",
          description: description || "קורס בינה מלאכותית בהתאמה מיוחדת לצרכים הספציפיים של הארגון שלך, עם דגש על כלים פרקטיים",
          keywords: keywords || "קורס AI, קורס בינה מלאכותית, הדרכה מותאמת אישית, קורס לארגונים"
        };
      case "/focused-workshop":
        return {
          title: title || "סדנה ממוקדת - שחר גולן | סדנת AI מותאמת לארגונים",
          description: description || "סדנה מעשית וממוקדת של מספר שעות המותאמת לצרכים הספציפיים של הארגון שלך",
          keywords: keywords || "סדנת AI, סדנה מעשית, בינה מלאכותית לארגונים, כלים פרקטיים"
        };
      case "/custom-lecture":
        return {
          title: title || "הרצאה מותאמת - שחר גולן | הרצאות AI מותאמות אישית",
          description: description || "הרצאה מרתקת ועדכנית על עולם הבינה המלאכותית, מותאמת במיוחד לקהל היעד שלכם",
          keywords: keywords || "הרצאות AI, הרצאות בינה מלאכותית, הרצאה מותאמת, מרצה טכנולוגיה"
        };
      case "/intro-workshop":
        return {
          title: title || "סדנת היכרות עם עולם ה-AI - שחר גולן",
          description: description || "סדנה מקוונת להיכרות ראשונית עם עולם הבינה המלאכותית והכלים שמשנים את חיינו",
          keywords: keywords || "סדנת היכרות AI, מבוא לבינה מלאכותית, סדנה מקוונת, כלי AI למתחילים"
        };
      default:
        return {
          title: title || "שחר גולן - מרצה ומומחה ל-AI ובינה מלאכותית",
          description: description || "מרצה ומדריך לבינה מלאכותית וכלי AI, מלמד כיצד להשתמש בכלים מתקדמים בחיי היום יום והעבודה",
          keywords: keywords || "בינה מלאכותית, AI, הרצאות, סדנאות, למידת מכונה, שחר גולן"
        };
    }
  };
  
  const seoData = getSEOData();
  
  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      <SEOHelmet 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogImage={ogImage}
      />
      <Header />
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      <Footer />
      <CookieConsent 
        onAccept={handleAccept}
        onReject={handleReject}
        onManage={handleManage}
      />
    </div>
  );
};

export default Layout;
