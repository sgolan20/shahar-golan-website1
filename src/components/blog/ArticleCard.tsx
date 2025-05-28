import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  slug: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  summary,
  date,
  imageUrl,
  slug
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link to={`/articles-blog/${slug}`} className="block h-full">
        <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5 flex-grow flex flex-col">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <CalendarIcon className="h-4 w-4 ml-1" />
              <span>{date}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-600 flex-grow line-clamp-3">{summary}</p>
            <div className="pt-4 text-sm text-[#4a52a3] font-medium inline-flex items-center group">
              קרא עוד
              <svg className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard; 