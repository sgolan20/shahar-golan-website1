
const ValueSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">היתרון שלי</h2>
          <p className="text-xl mb-8 leading-relaxed">
            היכולת שלי למקד את התוכן לקהל היעד הספציפי ולהציג נושאים מורכבים בצורה נגישה ופשוטה הופכת את הלמידה לחוויה אפקטיבית ונעימה לכל המשתתפים.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">התאמה אישית</h3>
              <p className="text-muted-foreground">כל הרצאה וסדנה מותאמת לצרכים והאתגרים הספציפיים של קהל היעד והארגון.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">הנגשת מידע מורכב</h3>
              <p className="text-muted-foreground">הפיכת מושגים ותהליכים מורכבים לפשוטים ומובנים לכל רמת ידע.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">פרקטיקה ותיאוריה</h3>
              <p className="text-muted-foreground">שילוב בין הבנה תיאורטית לבין יישום מעשי של הכלים הנלמדים.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">חוויית למידה</h3>
              <p className="text-muted-foreground">יצירת חוויית למידה מעניינת, אינטראקטיבית ובלתי נשכחת.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
