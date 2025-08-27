import React, { useState } from 'react';
import './ArticlePage.css';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../blogData';
import { FaUserCircle, FaRegCalendarAlt, FaRegClock, FaRegEye, FaRegHeart, FaBookmark, FaShareAlt, FaThumbsUp, FaRegCommentAlt } from 'react-icons/fa';

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find(a => a.id === articleId);
  const [feedback, setFeedback] = useState('');

  if (!article) {
    return <div>Article not found!</div>;
  }

  const handleHelpfulClick = () => {
    setFeedback('Thank you for your feedback!');
  };

  return (
    <div className="article-page">
      <div className="article-container">
        <Link to="/blogs" className="back-to-blogs">← Back to All Articles</Link>
        <h1>{article.title}</h1>
        <div className="article-meta-bar">
          <div className="author-details">
            <FaUserCircle size={40} />
            <div>
              <strong>{article.author.name}</strong>
              <span>{article.author.title}</span>
            </div>
          </div>
          <div className="article-stats">
            <span><FaRegCalendarAlt /> {article.date}</span>
            <span><FaRegClock /> {article.readTime} min read</span>
            <span><FaRegEye /> {article.views}</span>
          </div>
          <div className="article-actions">
            <span><FaRegHeart /> {article.likes}</span>
            <button><FaBookmark /></button>
            <button><FaShareAlt /></button>
          </div>
        </div>
        <img src={article.image} alt={article.title} className="article-main-image" />
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>

        <div className="article-footer">
          <div className="article-tags-footer">
            <strong>Tags:</strong>
            {article.tags.map(tag => <span key={tag}>{tag}</span>)}
          </div>
          <hr/>
          <div className="author-bio-box">
             <FaUserCircle size={60} />
             <div>
                <strong>{article.author.name}</strong>
                <span>{article.author.title}</span>
                <p>Dedicated healthcare professional with years of experience in patient care and medical research.</p>
             </div>
          </div>
          <div className="feedback-box">
            <h4>Was this article helpful?</h4>
            {feedback ? (
              <p className="feedback-thanks">{feedback}</p>
            ) : (
              <div>
                <button onClick={handleHelpfulClick}><FaThumbsUp /> Yes, helpful</button>
                <button><FaRegCommentAlt /> Share feedback</button>
              </div>
            )}
            <span>Your feedback helps us create better content for you.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;