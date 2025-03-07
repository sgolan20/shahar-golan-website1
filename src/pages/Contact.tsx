
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";

const Contact = () => {
  return (
    <div dir="rtl">
      <ContactHero />
      
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
