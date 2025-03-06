import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, PhoneCall, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "הודעה נשלחה בהצלחה",
        description: "תודה על פנייתך! אחזור אליך בהקדם האפשרי."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };
  return <div dir="rtl">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">צור קשר</h1>
            <p className="text-xl text-muted-foreground">
              מעוניינים בהרצאה, סדנה או שיתוף פעולה? מוזמנים ליצור איתי קשר
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div className="lg:col-span-2" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <h2 className="text-2xl font-bold mb-6">פנייה כללית</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      שם מלא
                    </label>
                    <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="השם המלא שלך" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      אימייל
                    </label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="האימייל שלך" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      טלפון
                    </label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="מספר הטלפון שלך" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      נושא
                    </label>
                    <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required placeholder="נושא הפנייה" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    הודעה
                  </label>
                  <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required placeholder="פרט את בקשתך כאן..." />
                </div>
                
                <Button type="submit" className="w-full sm:w-auto btn-shine" disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      שולח...
                    </> : <>
                      <Send className="ml-2 h-4 w-4" />
                      שליחה
                    </>}
                </Button>
              </form>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <h2 className="text-2xl font-bold mb-6">פרטי התקשרות</h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="space-y-6">
                  <div className="flex">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">אימייל</h3>
                      <a href="mailto:contact@shahargolan.com" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@shahargolan.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <PhoneCall className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">טלפון</h3>
                      <a href="tel:+972501234567" className="text-muted-foreground hover:text-primary transition-colors">052-733-2838</a>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">מיקום</h3>
                      <p className="text-muted-foreground">
                        תל אביב, ישראל<br />
                        זמין להרצאות וסדנאות בכל רחבי הארץ
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">עקבו אחריי</h3>
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    <a href="https://www.youtube.com/channel/UCxxxxxxxx" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors" aria-label="ערוץ יוטיוב">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/shahargolan" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors" aria-label="לינקדאין">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com/shahargolan" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors" aria-label="טוויטר">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div className="text-center mb-12" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <h2 className="text-3xl font-bold mb-4">שאלות נפוצות</h2>
              <p className="text-muted-foreground">
                תשובות לשאלות שאני מקבל לעיתים קרובות
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.1
            }} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-2">האם אתה מרצה באופן וירטואלי או רק פרונטלי?</h3>
                <p className="text-muted-foreground">
                  אני מציע הרצאות וסדנאות הן באופן פרונטלי והן וירטואלי דרך Zoom. הפורמט יכול להיות מותאם לפי הצרכים והעדפות הארגון.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.2
            }} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-2">כמה עולה הרצאה או סדנה?</h3>
                <p className="text-muted-foreground">
                  המחיר משתנה בהתאם לאורך ההרצאה/סדנה, מספר המשתתפים, ורמת ההתאמה האישית הנדרשת. מוזמנים ליצור קשר לקבלת הצעת מחיר המותאמת לצרכים שלכם.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.3
            }} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-2">האם אתה מציע שירותי ייעוץ לחברות?</h3>
                <p className="text-muted-foreground">
                  כן, אני מציע שירותי ייעוץ לחברות המעוניינות להטמיע כלי בינה מלאכותית בתהליכי העבודה שלהן. הייעוץ כולל בחירת כלים מתאימים, הדרכה והטמעה.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.4
            }} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium mb-2">לכמה זמן מראש צריך להזמין הרצאה?</h3>
                <p className="text-muted-foreground">
                  מומלץ לתאם הרצאות לפחות 3-4 שבועות מראש כדי להבטיח זמינות, אך במקרים דחופים אני משתדל להיות גמיש ככל האפשר.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;