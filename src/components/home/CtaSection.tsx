
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 bg-brand-gradient-diagonal text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-white/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-md">
          מוכנים לתת לעסק שלכם יתרון תחרותי עם AI?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          בואו נקבע שיחה של 20 דקות לזיהוי התהליכים בעסק שלכם שניתן לשפר עם AI - ללא התחייבות
        </p>
        <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20 hover:border-transparent shadow-lg hover:shadow-xl transition-all duration-300">
          <Link to="/contact">
            בואו נדבר על העסק שלכם
            <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
