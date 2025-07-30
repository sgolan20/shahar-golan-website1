import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div dir="rtl">
      <ContactHero />
      
      {/* Quick Actions Section */}
      <section className="py-12 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Consultation */}
            <div className="text-center bg-white/50 p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-brandBlue mb-3">פגישת היכרות חינמית</h3>
              <p className="text-muted-foreground mb-4">
                שיחה קצרה להבהרת צרכים והצעת מחיר מותאמת
              </p>
              <Link 
                to="/zoom-meeting" 
                className="inline-flex items-center gap-2 bg-brand-gradient text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-gradient-hover transition-all duration-300 btn-shine"
              >
                📅 קביעת פגישת זום
              </Link>
            </div>

            {/* Private Lesson */}
            <div className="text-center bg-gradient-to-br from-brandBlue/5 to-brandTeal/5 p-6 rounded-lg border border-brandBlue/20">
              <h3 className="text-xl font-semibold text-brandBlue mb-3">שיעור פרטי</h3>
              <p className="text-muted-foreground mb-4">
                למידה אישית ומותאמת - שעה מלאה של ידע מרוכז
              </p>
              <Link 
                to="/private-lesson" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brandBlue to-brandTeal text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
              >
                🎯 הזמנת שיעור פרטי
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gray-300 flex-1 max-w-32"></div>
            <span className="text-xl font-semibold text-muted-foreground">או</span>
            <div className="h-px bg-gray-300 flex-1 max-w-32"></div>
          </div>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            השאירו לי פנייה עם פרטים ואחזור אליכם במייל
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
      
      <ContactFaq />
    </div>
  );
};

export default Contact;
