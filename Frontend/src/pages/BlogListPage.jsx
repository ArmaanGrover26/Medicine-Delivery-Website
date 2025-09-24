import React from 'react';
import './BlogListPage.css';
import { Link } from 'react-router-dom';
import { articles as allArticles } from '../blogData';
import ArticleCard from '../components/ArticleCard/ArticleCard';
// 1. Import the icons you'll need for the trust bar
import { BsArrowLeft } from 'react-icons/bs';
import { FaRegLightbulb, FaRegFileAlt, FaRegClock } from 'react-icons/fa';

const BlogListPage = () => {
  const featuredArticle = allArticles.find(a => a.isFeatured);
  const latestArticles = allArticles.filter(a => !a.isFeatured);

  return (
    <div className="blog-list-page">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>

      <div className="blog-header">
        <h1>Health <span className="highlight">Blogs & Articles</span></h1>
        
        {/* --- THIS IS THE NEW TRUST BAR SECTION --- */}
        <div className="trust-bar">
          <div className="trust-item">
            <div className="trust-icon-wrapper">
              <FaRegLightbulb />
            </div>
            <span>Integrity</span>
          </div>
          <div className="trust-item">
            <div className="trust-icon-wrapper">
              <FaRegFileAlt />
            </div>
            <span>Verified</span>
          </div>
          <div className="trust-item">
            <div className="trust-icon-wrapper">
              <FaRegClock />
            </div>
            <span>Reliable</span>
          </div>
        </div>
        {/* --- END OF NEW SECTION --- */}

      </div>

      {featuredArticle && (
        <div className="featured-article-section">
          <h3>Featured Article</h3>
          <ArticleCard article={featuredArticle} />
        </div>
      )}

      <div className="latest-articles-section">
        <h3>Latest Articles</h3>
        <div className="articles-grid">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;