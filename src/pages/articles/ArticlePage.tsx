import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleView from '../../components/blog/ArticleView';
import { articlesData } from '../../components/blog/articlesData';
import { Article } from '../../components/blog/ArticlesGrid';
import { motion } from 'framer-motion';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // מחפש את המאמר לפי ה-slug
    const foundArticle = articlesData.find(article => article.slug === slug);
    
    if (foundArticle) {
      setArticle(foundArticle);
      // עדכון כותרת הדף
      document.title = `${foundArticle.title} | שחר גולן`;
    } else {
      // אם המאמר לא נמצא, מעביר לדף הראשי של הבלוג
      navigate('/articles-blog', { replace: true });
    }
    
    setLoading(false);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-pulse w-6 h-6 bg-[#4a52a3] rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return null; // יקרה רק בזמן שה-redirect מתבצע
  }

  return (
    <div dir="rtl">
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArticleView
              title={article.title}
              content={article.content}
              date={article.date}
              imageUrl={article.imageUrl}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage; 