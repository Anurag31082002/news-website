import React, { useState, useEffect } from 'react';
import { getTopHeadlines, getNewsByCategory, searchNews } from './services/newsService';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTopHeadlines();
      setNews(response.articles);
    } catch (error) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (newCategory) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNewsByCategory(newCategory);
      setNews(response.articles);
      setCategory(newCategory);
    } catch (error) {
      setError('Failed to fetch category news. Please try again later.');
      console.error('Error fetching category news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await searchNews(searchQuery);
      setNews(response.articles);
    } catch (error) {
      setError('Failed to search news. Please try again later.');
      console.error('Error searching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="news-header">
        <h1>Latest News</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Category Buttons */}
        <div className="categories">
          {['general', 'business', 'technology', 'sports', 'entertainment', 'health'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`category-button ${category === cat ? 'active' : ''}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <main className="news-container">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && (
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-card">
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title} 
                    className="news-image"
                  />
                )}
                <div className="news-content">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <div className="news-footer">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="read-more"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;