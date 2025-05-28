import React from 'react';
import ArticleCard from './ArticleCard';

export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  slug: string;
  content: string;
}

interface ArticlesGridProps {
  articles: Article[];
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          summary={article.summary}
          date={article.date}
          imageUrl={article.imageUrl}
          slug={article.slug}
        />
      ))}
    </div>
  );
};

export default ArticlesGrid; 