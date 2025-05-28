import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CalendarIcon, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ArticleViewProps {
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

const ArticleView: React.FC<ArticleViewProps> = ({
  title,
  content,
  date,
  imageUrl
}) => {
  // משך קריאה משוער לפי מספר המילים בתוכן
  const readingTime = Math.ceil(content.split(' ').length / 200); // כ-200 מילים לדקה

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* הוספת CSS ספציפי לדף המאמר */}
      <style>{`
        .article-content h1 {
          font-size: 4rem !important;
          line-height: 1.1 !important;
          font-weight: 900 !important;
          color: #4a52a3 !important;
          margin-top: 3rem !important;
          margin-bottom: 2rem !important;
          border-bottom: 4px solid #4a52a3 !important;
          padding-bottom: 1rem !important;
        }
        
        .article-content h2 {
          font-size: 2.5rem !important;
          line-height: 1.1 !important;
          font-weight: 900 !important;
          color: #4a52a3 !important;
          margin-top: 3rem !important;
          margin-bottom: 2rem !important;
          border-bottom: 2px solid #4a52a3 !important;
          padding-bottom: 0.75rem !important;
        }
        
        .article-content h3 {
          font-size: 2.5rem !important;
          line-height: 1.2 !important;
          font-weight: 700 !important;
          color: #374151 !important;
          margin-top: 2.5rem !important;
          margin-bottom: 1.5rem !important;
        }
        
        .article-content p {
          font-size: 1.25rem !important;
          line-height: 1.75 !important;
          color: #374151 !important;
          margin-bottom: 1.5rem !important;
        }
        
        @media (min-width: 768px) {
          .article-content h1 {
            font-size: 3rem !important;
          }
          .article-content h2 {
            font-size: 2rem !important;
          }
          .article-content h3 {
            font-size: 1.8rem !important;
          }
          .article-content p {
            font-size: 1.2rem !important;
          }
        }
        
        @media (min-width: 1024px) {
          .article-content h1 {
            font-size: 2.5rem !important;
          }
          .article-content h2 {
            font-size: 2.3rem !important;
          }
          .article-content h3 {
            font-size: 2rem !important;
          }
          .article-content p {
            font-size: 1.3rem !important;
          }
        }
      `}</style>

      {/* כותרת וניווט */}
      <div className="mb-12">
        <div className="flex items-center text-base text-gray-600 mb-6">
          <Link to="/articles-blog" className="flex items-center hover:text-[#4a52a3] transition-colors duration-300 font-medium">
            <ChevronRight className="h-5 w-5 ml-1" />
            חזרה לכל המאמרים
          </Link>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center text-lg text-gray-700 gap-6 bg-gray-50 px-6 py-4 rounded-xl"
        >
          <div className="flex items-center font-medium">
            <CalendarIcon className="h-5 w-5 ml-2 text-[#4a52a3]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center font-medium">
            <Clock className="h-5 w-5 ml-2 text-[#4a52a3]" />
            <span>{readingTime} דקות קריאה</span>
          </div>
        </motion.div>
      </div>

      {/* תמונת כותרת */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-16 rounded-2xl overflow-hidden shadow-2xl"
      >
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-auto max-h-[600px] object-cover"
        />
      </motion.div>

      {/* כפתורי שיתוף */}
      <div className="flex justify-end mb-12">
        <button className="flex items-center text-lg text-[#4a52a3] hover:text-[#4a52a3]/80 transition-colors duration-300 font-medium bg-[#4a52a3]/10 px-4 py-2 rounded-lg hover:bg-[#4a52a3]/20">
          <Share2 className="h-5 w-5 ml-2" />
          שתף מאמר
        </button>
      </div>

      {/* תוכן המאמר */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="article-content prose prose-xl max-w-none mb-16"
      >
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </motion.div>

      {/* כפתור חזרה למאמרים */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-16 border-t border-gray-200 pt-12 pb-16"
      >
        <Link 
          to="/articles-blog"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#4a52a3] to-[#4aaba3] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <ChevronRight className="h-6 w-6 ml-2" />
          חזרה לכל המאמרים
        </Link>
      </motion.div>
    </div>
  );
};

export default ArticleView; 