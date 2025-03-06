
import { useEffect } from "react";

const StructuredData = () => {
  useEffect(() => {
    // Create the structured data script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    
    // Define the JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "שחר גולן - מרצה ומומחה לבינה מלאכותית",
      "description": "מרצה ומדריך לבינה מלאכותית וכלי AI, מלמד כיצד להשתמש בכלים מתקדמים בחיי היום יום והעבודה",
      "url": "https://shahar-golan-website1.netlify.app",
      "telephone": "+972527332838",
      "email": "sgolan20@gmail.com",
      "image": "https://shahar-golan-website1.netlify.app/og-image.png",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IL"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      },
      "sameAs": [
        "https://www.youtube.com/channel/UCxxxxxxxx",
        "https://www.linkedin.com/in/shahargolan"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "שירותי הדרכה והרצאות",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "הרצאות בינה מלאכותית",
              "description": "הרצאות מרתקות על בינה מלאכותית וטכנולוגיות חדשות"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "סדנאות AI מעשיות",
              "description": "סדנאות מעשיות ללימוד כלי AI ושימושם בעולם העסקי והאישי"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "קורסים מותאמים אישית",
              "description": "קורסים מותאמים אישית בתחום הבינה המלאכותית לארגונים וחברות"
            }
          }
        ]
      }
    };
    
    script.innerHTML = JSON.stringify(structuredData);
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  return null;
};

export default StructuredData;
