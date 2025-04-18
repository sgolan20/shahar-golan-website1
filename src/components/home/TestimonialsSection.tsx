import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "שחר העביר לצוות שלנו סדנת AI מרתקת שממש פתחה את העיניים. הדרך שבה הוא מסביר מושגים מורכבים בצורה פשוטה ומעשית היא מרשימה ביותר.",
      author: "רונית כהן",
      role: "מנהלת שיווק",
      company: "חברת אינוביז",
      image: "/lovable-uploads/testimonial-1.jpg",
    },
    {
      id: 2,
      content: "ההרצאה של שחר על AI בחברה שלנו גרמה לנו לחשוב אחרת לגמרי על איך אנחנו יכולים להטמיע בינה מלאכותית בתהליכי העבודה שלנו. התוצאות מדברות בעד עצמן.",
      author: "אמיר לוי",
      role: "סמנכ\"ל טכנולוגיות",
      company: "מיקרוסופט ישראל",
      image: "/lovable-uploads/testimonial-2.jpg",
    },
    {
      id: 3,
      content: "קיבלתי המון כלים מעשיים מהסדנה של שחר. הוא מצליח להפוך את הטכנולוגיה למשהו נגיש ושימושי למגוון אנשים, גם לכאלה שאינם אנשי טכנולוגיה.",
      author: "מיכל אברהם",
      role: "מנהלת משאבי אנוש",
      company: "אל-על",
      image: "/lovable-uploads/testimonial-3.jpg",
    },
    {
      id: 4,
      content: "מעבר לידע המקצועי העמוק, שחר הוא מרצה כריזמטי שיודע לרתק קהל. הוא הצליח לגרום לכל הצוות שלנו להתלהב מהאפשרויות שבינה מלאכותית פותחת בפנינו.",
      author: "יוסי מזרחי",
      role: "מנכ\"ל",
      company: "סטארטאפ נייישן",
      image: "/lovable-uploads/testimonial-4.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 overflow-hidden relative" id="testimonials">
      {/* Animated background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute opacity-10 w-[500px] h-[500px] rounded-full border border-purple-300 -top-64 -right-64" />
        <div className="absolute opacity-10 w-[300px] h-[300px] rounded-full border border-purple-300 bottom-10 left-20" />
        <div className="absolute opacity-5 w-[700px] h-[700px] rounded-full border border-purple-400 -bottom-96 -left-96" />
        
        <div className="particle particle-1 opacity-20" style={{ left: '15%' }}></div>
        <div className="particle particle-3 opacity-20" style={{ left: '75%' }}></div>
        <div className="particle particle-5 opacity-20" style={{ left: '35%' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-l from-purple-700 to-purple-500">
            מה אומרים עלי
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            אלו שכבר השתתפו בסדנאות ובהרצאות שלי
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative overflow-hidden z-0 bg-gradient-to-r from-purple-50 to-white rounded-2xl shadow-xl p-2">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "w-full flex-shrink-0 transition-all duration-500 p-8",
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  )}
                  style={{ transform: `scale(${activeIndex === index ? 1 : 0.9})` }}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative mb-6 md:mb-0 w-32 h-32 flex-shrink-0">
                      <div className="absolute -top-4 -left-4 text-purple-500">
                        <Quote size={40} className="opacity-50" />
                      </div>
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center text-purple-500 text-2xl font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                      <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full shadow-lg"></div>
                    </div>

                    <div className="flex-1">
                      <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-bold text-lg text-gray-800">{testimonial.author}</h4>
                        <p className="text-purple-600">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Control buttons */}
            <div className="flex justify-center gap-4 mt-6 pb-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors shadow-sm hover-scale"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeIndex === index
                      ? "bg-purple-600 w-6"
                      : "bg-purple-200 hover:bg-purple-300"
                  )}
                />
              ))}
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-purple-200 flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors shadow-sm hover-scale"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 -left-10 w-24 h-24 bg-purple-100 rounded-full opacity-50 -z-10"></div>
          <div className="absolute bottom-10 -right-10 w-32 h-32 bg-purple-100 rounded-full opacity-50 -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
