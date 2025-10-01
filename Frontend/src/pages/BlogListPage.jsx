import React, { useState, useEffect } from 'react';
import './BlogListPage.css';
import { articles as allArticles } from '../blogData';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import { FaSearch } from 'react-icons/fa';

const categories = ['All', 'Diabetes Care', 'Heart Health', 'Mental Health', 'Skin Care', 'Bone Health'];

const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  useEffect(() => {
    let result = allArticles;
    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(article => article.category === activeCategory);
    }
    // Filter by search term
    if (searchTerm) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredArticles(result);
  }, [searchTerm, activeCategory]);

  const featuredArticle = allArticles.find(a => a.isFeatured);

  return (
    <div className="blog-list-page">
      <div className="blog-header">
        <h1>Health <span className="highlight">Blogs & Articles</span></h1>
        <p>Stay informed with expert insights, health tips, and the latest medical information from our healthcare professionals</p>
      </div>

      <div className="blog-filters">
        <div className="blog-search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search articles, topics, or conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
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
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;