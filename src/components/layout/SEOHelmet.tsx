import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const BASE_URL = "https://shahar-golan-website1.netlify.app";
const DEFAULT_OG_IMAGE_PATH = "/lovable-uploads/Screenshot 2025-05-02 010226.png";

/**
 * קומפוננטת SEO מותאמת אישית שמעדכנת את תגיות המטא ב-head
 * חשוב: פתרון זה עובד רק בצד הלקוח, אך אנחנו נוסיף גם את התגיות הסטטיות ב-index.html
 */
const SEOHelmet = ({ 
  title = "שחר גולן - מרצה ומומחה ל-AI ובינה מלאכותית", 
  description = "מרצה ומדריך לבינה מלאכותית וכלי AI, מלמד כיצד להשתמש בכלים מתקדמים בחיי היום יום והעבודה",
  keywords = "בינה מלאכותית, AI, הרצאות, סדנאות, למידת מכונה, שחר גולן, מומחה AI, גנרטיב AI, חדשנות טכנולוגית",
  ogImage = DEFAULT_OG_IMAGE_PATH
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `${BASE_URL}${location.pathname}`;
  const absoluteOgImage = `${BASE_URL}${ogImage}`;
  
  useEffect(() => {
    // עדכון כותרת המסמך
    document.title = title;
    
    // עדכון תגיות מטא
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (tag) {
        tag.content = content;
      } else {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        tag.content = content;
        document.head.appendChild(tag);
      }
    };
    
    // עדכון תגית קנונית
    const updateCanonical = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = href;
      } else {
        link = document.createElement('link');
        link.rel = 'canonical';
        link.href = href;
        document.head.appendChild(link);
      }
    };
    
    // עדכון תגיות רגילות
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // עדכון תגיות Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', absoluteOgImage, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'שחר גולן - AI', true);
    
    // עדכון תגיות Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', absoluteOgImage, true);
    updateMetaTag('twitter:url', currentUrl, true);
    
    // עדכון תגית קנונית
    updateCanonical(currentUrl);
    
  }, [title, description, keywords, absoluteOgImage, currentUrl]);
  
  return null; // קומפוננטה זו לא מרנדרת שום דבר, רק מעדכנת את ה-head
};

export default SEOHelmet;
