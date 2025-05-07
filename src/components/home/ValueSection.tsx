const ValueSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">הערך שתקבלו בהדרכות</h2>
          <p className="text-xl mb-8 leading-relaxed">
            הדרכות ה-GEN-AI והבינה המלאכותית מבוססות על ניסיון מעשי עשיר וגישה ייחודית להנגשת טכנולוגיות מתקדמות. תזכו ללמידה שהיא חוויה מהנה ומעשירה, לא רק קבלת מידע.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">התאמה אישית</h3>
              <p className="text-muted-foreground">תקבלו הרצאה וסדנה המותאמות לצרכים הספציפיים שלכם, עם דוגמאות רלוונטיות לתחום העיסוק של הארגון שלכם.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">הנגשת טכנולוגיה מתקדמת</h3>
              <p className="text-muted-foreground">תגלו איך מושגים מורכבים בעולם ה-AI הופכים לפשוטים ומובנים, עם אנלוגיות מחיי היומיום והסברים בגובה העיניים.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">למידה מעשית</h3>
              <p className="text-muted-foreground">תחוו למידה דרך התנסות. בהרצאות ובסדנאות תקבלו כלים מעשיים שתוכלו ליישם מיד בעבודה היומיומית.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">חוויית למידה ייחודית</h3>
              <p className="text-muted-foreground">תיהנו מחווית למידה מלאה בתרגול מעשי, שילוב הומור, ואווירה נעימה שהופכת נושאים מורכבים לנגישים ומהנים.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
