import React, { useState, useEffect } from 'react';
import { X, Settings, Shield } from 'lucide-react';

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
  onManage: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onReject, onManage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // תמיד מופעל
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
    
    // האזנה לאירוע הצגת הגדרות קוקיז
    const handleShowSettings = () => {
      setIsVisible(true);
      setShowSettings(true);
    };
    
    window.addEventListener('show-cookie-settings', handleShowSettings);
    
    return () => {
      window.removeEventListener('show-cookie-settings', handleShowSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    onAccept();
  };

  const handleRejectAll = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    onReject();
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    setShowSettings(false);
    onManage();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {!showSettings ? (
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">אנחנו משתמשים בקוקיז</h2>
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">
                האתר עושה שימוש בקוקיז וכלי מדידה לצורכי תפעול בסיסי, מדידה ושיפור השירות. 
                הנתונים מעובדים בהתאם למדיניות הפרטיות שלנו.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>קוקיז הכרחיים:</strong> נדרשים לתפעול בסיסי של האתר</li>
                <li><strong>Google Analytics:</strong> למדידת ביצועים ושיפור החוויה</li>
                <li><strong>Google Tag Manager:</strong> לניהול כלי מדידה</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                מאשר את כל הקוקיז
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                דחיית קוקיז לא הכרחיים
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                ניהול העדפות
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              <a 
                href="/privacy-policy" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                מדיניות הפרטיות
              </a>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">ניהול העדפות קוקיז</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">קוקיז הכרחיים</h3>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    תמיד מופעל
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  קוקיז אלה הכרחיים לתפעול בסיסי של האתר ולא ניתן לכבות אותם.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">מדידה ואנליטיקס</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-gray-600 text-sm">
                  Google Analytics למדידת ביצועי האתר ולהבנת התנהגות המשתמשים.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">שיווק וכלי מדיה חברתית</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-gray-600 text-sm">
                  כלים לשיווק מותאם אישית ומעקב במדיה החברתית (כרגע לא פעילים באתר).
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSavePreferences}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                שמירת העדפות
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;