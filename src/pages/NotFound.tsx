
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-primary mb-6 inline-block">
            <svg className="w-24 h-24 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">העמוד לא נמצא</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            העמוד שחיפשת אינו קיים או שהוסר. נסה לחזור לעמוד הבית ולנווט משם.
          </p>
          
          <Button asChild className="btn-shine">
            <Link to="/" className="inline-flex items-center">
              <Home className="ml-2 h-4 w-4" />
              חזרה לעמוד הבית
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
