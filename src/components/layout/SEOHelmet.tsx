import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SEOHelmet = ({ 
  title = "שחר גולן - מרצה ומומחה ל-AI ובינה מלאכותית", 
  description = "מרצה ומדריך לבינה מלאכותית וכלי AI, מלמד כיצד להשתמש בכלים מתקדמים בחיי היום יום והעבודה",
  keywords = "בינה מלאכותית, AI, הרצאות, סדנאות, למידת מכונה, שחר גולן, מומחה AI, גנרטיב AI, חדשנות טכנולוגית",
  ogImage = "/lovable-uploads/Screenshot 2025-05-02 010226.png"
}: SEOProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    }
    
    // Update Open Graph and Twitter meta tags
    const updateMetaProperty = (name: string, content: string) => {
      const elements = document.querySelectorAll(`meta[property="${name}"]`);
      elements.forEach(el => el.setAttribute("content", content));
    };
    
    updateMetaProperty("og:title", title);
    updateMetaProperty("og:description", description);
    updateMetaProperty("og:url", `https://shahar-golan-website1.netlify.app${location.pathname}`);
    updateMetaProperty("og:image", ogImage);
    
    updateMetaProperty("twitter:title", title);
    updateMetaProperty("twitter:description", description);
    updateMetaProperty("twitter:url", `https://shahar-golan-website1.netlify.app${location.pathname}`);
    updateMetaProperty("twitter:image", ogImage);
    
    // Update canonical URL
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (link) {
      link.href = `https://shahar-golan-website1.netlify.app${location.pathname}`;
    }
  }, [title, description, keywords, ogImage, location]);
  
  return null;
};

export default SEOHelmet;
