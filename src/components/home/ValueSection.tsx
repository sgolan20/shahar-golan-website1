const ValueSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">התוצאות שתקבלו עם AI</h2>
          <p className="text-xl mb-8 leading-relaxed">
            אני מכשיר צוותים בארגונים וחברות להטמיע תהליכי AI דרך הדרכות וסדנאות מעשיות. כל הכשרה מותאמת לתחום הפעילות שלכם ומביאה לחיסכון של עשרות אחוזים בזמן ובעלויות.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">חיסכון בזמן ועלויות</h3>
              <p className="text-muted-foreground">תהליכי AI מותאמים שחוסכים זמן לביצוע משימות יומיומיות, ומשחררים את הצוות שלכם למשימות בעלות ערך גבוה יותר.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">יתרון תחרותי</h3>
              <p className="text-muted-foreground">הטמעת AI מותאמת לתחום שלכם שמביאה לשיפור איכות השירות, זמני תגובה מהירים יותר ויכולת להתמודד עם עומסי עבודה גדולים יותר.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">תהליכים מותאמים אישית</h3>
              <p className="text-muted-foreground">כל הדרכה שאני מעביר מותאמת לצרכים הייחודיים של הארגון שלכם - מהתרבות הארגונית ועד לתהליכי העבודה הספציפיים.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">יישום מיידי ותוצאות מהירות</h3>
              <p className="text-muted-foreground">לא רק למידה - אלא גם יישום מעשי שמתחיל עוד במהלך הסדנאות. תקבלו כלים מוכנים לשימוש שמביאים תוצאות כבר בשבועות הראשונים.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
