
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 bg-brand-gradient text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          מוכנים להכיר את עולם הבינה המלאכותית?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          אני מזמין אתכם לשיחת היכרות קצרה, בואו נכיר ונשמע איך אני יכול לעזור לכם - ללא כל התחייבות
        </p>
        <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
          <Link to="/contact">
            צור קשר
            <ArrowRight className="mr-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
