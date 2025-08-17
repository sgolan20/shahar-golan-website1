import React from 'react';
import { Shield, Eye, Lock, FileText, Calendar, Mail, Phone } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* כותרת */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-600 ml-3" />
              <h1 className="text-3xl font-bold text-gray-900">מדיניות פרטיות</h1>
            </div>
            <p className="text-gray-600">
              עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              מדיניות זו מותאמת לתיקון 13 לחוק הגנת הפרטיות
            </p>
          </div>

          {/* מבוא */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 ml-2" />
              מבוא
            </h2>
            <p className="text-gray-700 leading-relaxed">
              שחר גולן ("אנחנו", "שלנו", "האתר") מחויב להגנה על פרטיותכם ולשמירה על המידע האישי שלכם. 
              מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, מעבדים ומגינים על המידע שלכם 
              בעת השימוש באתר golanai.co.il ובשירותים שלנו.
            </p>
          </section>

          {/* פרטי קשר */}
          <section className="mb-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="w-6 h-6 ml-2" />
              פרטי התקשרות
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-900">בעל השליטה במאגר המידע:</p>
                <p className="text-gray-700">שחר גולן</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">דוא"ל:</p>
                <p className="text-gray-700">shahar@golanai.co.il</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">כתובת:</p>
                <p className="text-gray-700">ישראל</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">אתר:</p>
                <p className="text-gray-700">golanai.co.il</p>
              </div>
            </div>
          </section>

          {/* סוגי מידע שאנו אוספים */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 ml-2" />
              סוגי מידע שאנו אוספים
            </h2>
            
            <h3 className="text-lg font-medium text-gray-900 mb-3">מידע שאתם מספקים לנו באופן ישיר:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>פרטי קשר: שם, כתובת דוא"ל, מספר טלפון</li>
              <li>תוכן הודעות ופניות שאתם שולחים דרך טפסי יצירת קשר</li>
              <li>מידע שאתם מספקים בעת הרשמה לאירועים או סדנאות</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-3">מידע שנאסף באופן אוטומטי:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>מידע טכני: כתובת IP, סוג דפדפן, מערכת הפעלה</li>
              <li>נתוני שימוש: עמודים שביקרתם, זמן ביקור, אופן הגעה לאתר</li>
              <li>קוקיז וטכנולוגיות דומות (ראו פירוט להלן)</li>
            </ul>
          </section>

          {/* שימוש בקוקיז */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">שימוש בקוקיז וכלי מדידה</h2>
            
            <div className="space-y-4">
              <div className="border-r-4 border-blue-500 pr-4">
                <h3 className="font-medium text-gray-900 mb-2">Google Analytics</h3>
                <p className="text-gray-700">
                  אנו משתמשים ב-Google Analytics למדידת ביצועי האתר, הבנת התנהגות המשתמשים ושיפור השירות. 
                  כלי זה אוסף מידע אנונימי על השימוש באתר.
                </p>
              </div>
              
              <div className="border-r-4 border-green-500 pr-4">
                <h3 className="font-medium text-gray-900 mb-2">Google Tag Manager</h3>
                <p className="text-gray-700">
                  לניהול וטעינה של כלי מדידה נוספים באופן מרכזי ובטוח.
                </p>
              </div>
              
              <div className="border-r-4 border-purple-500 pr-4">
                <h3 className="font-medium text-gray-900 mb-2">קוקיז הכרחיים</h3>
                <p className="text-gray-700">
                  קוקיז בסיסיים הנדרשים לתפעול תקין של האתר, כולל העדפות שפה וזכירת הסכמתכם לקוקיז.
                </p>
              </div>
            </div>
          </section>

          {/* מטרות השימוש */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">מטרות השימוש במידע</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>מתן שירותים ותגובה לפניותיכם</li>
              <li>תיאום פגישות והרצאות</li>
              <li>שליחת מידע על קורסים וסדנאות (רק בהסכמתכם)</li>
              <li>שיפור האתר והשירותים</li>
              <li>מדידה וניתוח של השימוש באתר</li>
              <li>עמידה בדרישות חוקיות</li>
            </ul>
          </section>

          {/* בסיס חוקי */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">בסיס חוקי לעיבוד</h2>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-700">
                עיבוד המידע מתבסס על הסכמתכם המפורשת, האינטרס הלגיטימי שלנו במתן שירותים איכותיים, 
                או על הצורך לקיום התחייבויות חוזיות.
              </p>
            </div>
          </section>

          {/* שיתוף מידע */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">שיתוף מידע עם צדדים שלישיים</h2>
            <p className="text-gray-700 mb-4">
              אנו לא מוכרים או משתפים את המידע האישי שלכם עם צדדים שלישיים, למעט במקרים הבאים:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>ספקי שירות טכניים (Google Analytics, אחסון ענן) - במסגרת מוגבלת ובהסכמים מחייבים</li>
              <li>כאשר נדרש על פי חוק</li>
              <li>בהסכמתכם המפורשת</li>
            </ul>
          </section>

          {/* אבטחת מידע */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 ml-2" />
              אבטחת מידע
            </h2>
            <p className="text-gray-700">
              אנו נוקטים אמצעי אבטחה טכניים וארגוניים מתאימים להגנה על המידע שלכם, כולל הצפנה, 
              גישה מוגבלת, ועדכונים קבועים של מערכות האבטחה.
            </p>
          </section>

          {/* תקופת שמירה */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-6 h-6 ml-2" />
              תקופת שמירת מידע
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>פרטי קשר: עד 3 שנים מהפעילות האחרונה או עד לבקשת מחיקה</li>
              <li>נתוני אנליטיקס: 26 חודשים (הגדרת Google Analytics)</li>
              <li>יומני שרת: עד 6 חודשים</li>
              <li>התכתבויות: עד 7 שנים (לצורכי תיעוד עסקי)</li>
            </ul>
          </section>

          {/* זכויותיכם */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">זכויותיכם</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">זכות עיון</h3>
                <p className="text-gray-700 text-sm">לדעת איזה מידע שלכם אנו מחזיקים</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">זכות תיקון</h3>
                <p className="text-gray-700 text-sm">לתקן מידע לא מדויק</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">זכות מחיקה</h3>
                <p className="text-gray-700 text-sm">לבקש מחיקת המידע שלכם</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">זכות הגבלה</h3>
                <p className="text-gray-700 text-sm">להגביל עיבוד המידע</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              ליצירת קשר לעניין מימוש זכויותיכם: shahar@golanai.co.il
            </p>
          </section>

          {/* הסכמה */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">הסכמה וביטול הסכמה</h2>
            <p className="text-gray-700">
              ניתן לבטל את ההסכמה בכל עת על ידי פנייה אלינו או באמצעות הגדרות הקוקיז באתר. 
              ביטול ההסכמה לא יפגע בחוקיות העיבוד שבוצע לפני הביטול.
            </p>
          </section>

          {/* עדכונים */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">עדכוני מדיניות</h2>
            <p className="text-gray-700">
              אנו עשויים לעדכן מדיניות זו מעת לעת. עדכונים מהותיים יפורסמו באתר ויישלחו אליכם 
              במידה ויש ברשותנו את פרטי הקשר שלכם.
            </p>
          </section>


          {/* סיום */}
          <section className="text-center border-t pt-6">
            <p className="text-gray-600">
              מדיניות זו נכנסה לתוקף ב-{new Date().toLocaleDateString('he-IL')} 
              ומותאמת לתיקון 13 לחוק הגנת הפרטיות
            </p>
            <p className="text-sm text-gray-500 mt-2">
              לשאלות נוספות: shahar@golanai.co.il
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;