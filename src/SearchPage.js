import React, { useState } from 'react';
import './SearchPage.css';

const blogPosts = [
  { id: 1, title: 'React Basics', category: 'React', content: 'Learn React basics step by step.' },
  { id: 2, title: 'JavaScript Tips', category: 'JavaScript', content: 'Tips and tricks for JavaScript.' },
  { id: 3, title: 'Responsive Design', category: 'CSS', content: 'How to create mobile-friendly designs.' },
  { id: 4, title: 'State Management', category: 'React', content: 'Understanding state in React.' },
  { id: 5, title: 'Advanced CSS', category: 'CSS', content: 'Dive deep into Flexbox and Grid layouts.' },
  { id: 6, title: 'NodeJS Basics', category: 'NodeJS', content: 'Learn the fundamentals of NodeJS.' },
  { id: 7, title: 'Building APIs', category: 'NodeJS', content: 'A guide to creating REST APIs with NodeJS.' },
  { id: 8, title: 'Animations in CSS', category: 'CSS', content: 'Make your pages come alive with CSS animations.' },
  { id: 9, title: 'JavaScript ES6+', category: 'JavaScript', content: 'Master modern JavaScript syntax.' },
  { id: 10, title: 'Hooks in React', category: 'React', content: 'Understanding React hooks and their uses.' },
  { id: 11, title: 'Deploying Apps', category: 'NodeJS', content: 'Step-by-step guide to deploying apps.' },
  { id: 12, title: 'GraphQL Basics', category: 'React', content: 'Learn the fundamentals of GraphQL.' },
  { id: 13, title: 'Web Accessibility', category: 'CSS', content: 'Tips for creating accessible web apps.' },
  { id: 14, title: 'Modern JavaScript', category: 'JavaScript', content: 'Discover the latest features in JS.' },
];

const categories = ['All', 'React', 'JavaScript', 'CSS', 'NodeJS'];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to page 1 when search query changes
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  // Filter posts based on search query and selected filter
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery); // Case-insensitive search
    const matchesFilter = filter === 'All' || post.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <h1>Discover Blogs</h1>
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-box"
          />
          <select value={filter} onChange={handleFilterChange} className="filter-dropdown">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </header>
      <section className="results-section">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="result-card">
              <h2>{post.title}</h2>
              <p><strong>Category:</strong> {post.category}</p>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No results found. Try a different search.</p>
        )}
      </section>
      {filteredPosts.length > postsPerPage && (
        <footer className="pagination">
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className="arrow-btn">
            &larr;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className="arrow-btn">
            &rarr;
          </button>
        </footer>
      )}
    </div>
  );
};

export default SearchPage;
