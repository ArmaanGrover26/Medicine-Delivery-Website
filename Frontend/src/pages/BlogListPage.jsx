import React from 'react';
import './BlogListPage.css';
import { Link } from 'react-router-dom';
import { articles as allArticles } from '../blogData';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import { BsArrowLeft } from 'react-icons/bs';

const BlogListPage = () => {
  // Find the featured article from the full list
  const featuredArticle = allArticles.find(a => a.isFeatured);
  
  // Create a new list for the "Latest Articles" that excludes the featured one
  const latestArticles = allArticles.filter(a => !a.isFeatured);

  return (
    <div className="blog-list-page">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>

      <div className="blog-header">
        <h1>Health <span className="highlight">Blogs & Articles</span></h1>
        <p>Stay informed with expert insights, health tips, and the latest medical information from our healthcare professionals</p>
      </div>

      {/* The search bar and category filters have been removed */}

      {featuredArticle && (
        <div className="featured-article-section">
          <h3>Featured Article</h3>
          <ArticleCard article={featuredArticle} />
        </div>
      )}

      <div className="latest-articles-section">
        <h3>Latest Articles</h3>
        <div className="articles-grid">
          {latestArticles.length > 0 ? (
            latestArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="no-articles-found">No articles to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;