
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";

const YoutubeSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ערוץ היוטיוב שלי</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              בערוץ היוטיוב שלי אני מעלה באופן קבוע תוכן חינמי ואיכותי על כלי AI חדשים, טיפים, והדרכות מעשיות. הצטרפו לקהילה של למעלה מ-6,000 עוקבים וקבלו עדכונים על כל החידושים בעולם הבינה המלאכותית.
            </p>
            <Button asChild className="btn-shine">
              <a 
                href="https://www.youtube.com/channel/UCxxxxxxxx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center"
              >
                <Youtube className="ml-2 h-5 w-5" />
                לערוץ היוטיוב
              </a>
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white rounded-xl p-2 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
              <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg shadow-inner bg-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0" 
                  alt="ערוץ היוטיוב" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 shadow-lg">
                    <Youtube className="h-10 w-10 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeSection;
