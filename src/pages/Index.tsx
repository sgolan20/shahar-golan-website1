
import { Link } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import VideoSection from "@/components/home/VideoSection";
import GallerySection from "@/components/home/GallerySection";
import OrganizationsSection from "@/components/home/OrganizationsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ValueSection from "@/components/home/ValueSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";
import StructuredData from "@/components/home/StructuredData";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getPublishedCourses } from "@/services/courseService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

const Index = () => {
  const { data: courses } = useQuery({
    queryKey: ["featuredCourses"],
    queryFn: getPublishedCourses,
    staleTime: 5 * 60 * 1000  // 5 minutes
  });

  // Get up to 3 featured courses
  const featuredCourses = courses?.slice(0, 3) || [];

  return (
    <div>
      <StructuredData />
      <HeroSection />
      <ServicesSection />
      <VideoSection />
      
      {/* Digital Courses Section */}
      {featuredCourses.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">הקורסים הדיגיטליים שלי</h2>
              <p className="text-lg text-muted-foreground mb-6">
                למד AI בקצב שלך עם הקורסים הדיגיטליים המקיפים שלי
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all duration-300">
                  {course.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={course.image_url} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/digital-courses/${course.slug}`}>
                        <PlayCircle className="ml-2 h-5 w-5" />
                        לפרטים נוספים
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/digital-courses">צפה בכל הקורסים</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      
      <GallerySection />
      <TestimonialsSection />
      <OrganizationsSection />
      <ValueSection />
      <CtaSection />
    </div>
  );
};

export default Index;
