import React from 'react';
import './ArticleCard.css';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaRegEye, FaRegHeart, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/blogs/${article.id}`} className="article-card">
      <div className="article-card-image">
        <img src={article.image} alt={article.title} />
        <span className="article-card-category">{article.category}</span>
      </div>
      <div className="article-card-content">
        <div className="article-card-meta top-meta">
          <span><FaRegCalendarAlt /> {article.date}</span>
          <span><FaRegClock /> {article.readTime} min read</span>
        </div>
        <h4>{article.title}</h4>
        <p>{article.excerpt}</p>
        <div className="article-card-meta bottom-meta">
          <div className="author-info">
            <FaUserCircle /> {article.author.name}
          </div>
          <div className="stats-info">
            <span><FaRegEye /> {article.views}</span>
            <span><FaRegHeart /> {article.likes}</span>
          </div>
        </div>
        <div className="article-card-tags">
          {article.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;