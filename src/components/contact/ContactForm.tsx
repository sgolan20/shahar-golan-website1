
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // יצירת אובייקט FormData מהטופס
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // שליחת הנתונים לנטליפיי
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      });
      
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
    } catch (error) {
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב מאוחר יותר.",
        variant: "destructive"
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="lg:col-span-2" 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6">פנייה כללית</h2>
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        {/* Hidden fields for Netlify */}
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              שם מלא
            </label>
            <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="השם שמופיע בתעודת הזהות 😉" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              אימייל
            </label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="זה שבאמת בודקים..." />
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
            <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required placeholder="על מה נדבר?" />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            הודעה
          </label>
          <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required placeholder="זה המקום לפרט יותר, כדי שאגיע מוכן לשיחה איתך..." />
        </div>
        
        <Button type="submit" className="w-full sm:w-auto btn-shine" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              שולח...
            </>
          ) : (
            <>
              <Send className="ml-2 h-4 w-4" />
              שליחה
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
