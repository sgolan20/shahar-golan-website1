
import { motion } from "framer-motion";

const FaqItem = ({ 
  question, 
  answer, 
  delay 
}: { 
  question: string; 
  answer: string; 
  delay: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.4, delay }} 
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-medium mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </motion.div>
  );
};

const ContactFaq = () => {
  const faqItems = [
    {
      question: "האם אתה מרצה באופן וירטואלי או רק פרונטלי?",
      answer: "אני מציע הרצאות וסדנאות הן באופן פרונטלי והן וירטואלי דרך Zoom. הפורמט יכול להיות מותאם לפי הצרכים והעדפות הארגון."
    },
    {
      question: "כמה עולה הרצאה או סדנה?",
      answer: "המחיר משתנה בהתאם לאורך ההרצאה/סדנה, מספר המשתתפים, ורמת ההתאמה האישית הנדרשת. מוזמנים ליצור קשר לקבלת הצעת מחיר המותאמת לצרכים שלכם."
    },
    {
      question: "האם אתה מציע שירותי ייעוץ לחברות?",
      answer: "כן, אני מציע שירותי ייעוץ לחברות המעוניינות להטמיע כלי בינה מלאכותית בתהליכי העבודה שלהן. הייעוץ כולל בחירת כלים מתאימים, הדרכה והטמעה."
    },
    {
      question: "לכמה זמן מראש צריך להזמין הרצאה?",
      answer: "מומלץ לתאם הרצאות לפחות 3-4 שבועות מראש כדי להבטיח זמינות, אך במקרים דחופים אני משתדל להיות גמיש ככל האפשר."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">שאלות נפוצות</h2>
            <p className="text-muted-foreground">
              תשובות לשאלות שאני מקבל לעיתים קרובות
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <FaqItem 
                key={index}
                question={item.question}
                answer={item.answer}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFaq;
