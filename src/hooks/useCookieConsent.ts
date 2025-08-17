import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const useCookieConsent = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent);
        setPreferences(parsed);
        setHasConsent(true);
        
        // הפעלת Google Analytics רק אם יש הסכמה
        if (parsed.analytics && window.gtag) {
          window.gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        }
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
  }, []);

  const handleAccept = () => {
    // הפעלת כל כלי המדידה
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    // כיבוי כלי מדידה לא הכרחיים
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }
  };

  const handleManage = () => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent);
        if (window.gtag) {
          window.gtag('consent', 'update', {
            'analytics_storage': parsed.analytics ? 'granted' : 'denied',
            'ad_storage': parsed.marketing ? 'granted' : 'denied'
          });
        }
      } catch (error) {
        console.error('Error applying cookie preferences:', error);
      }
    }
  };

  const resetConsent = () => {
    localStorage.removeItem('cookie-consent');
    setPreferences(null);
    setHasConsent(false);
    window.location.reload();
  };

  // פונקציה גלובלית לצורך בדיקות (זמין בקונסול)
  if (typeof window !== 'undefined') {
    (window as any).resetCookieConsent = resetConsent;
  }

  return {
    preferences,
    hasConsent,
    handleAccept,
    handleReject,
    handleManage,
    resetConsent
  };
};

// הרחבת window object עבור gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}