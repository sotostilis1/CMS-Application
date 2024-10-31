import React from 'react';

const ArticleList = ({ articles, onSelectArticle }) => {
  // Function to truncate long strings for display
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    }
    return str;
  };

  return (
    <div>
      {articles.length > 0 ? (
        // Map through articles to render each one
        articles.map(article => (
          <div 
            key={article.id} 
            className='mb-1 py-1 px-2 border bg-[#f9f9f9] flex items-center justify-between rounded-lg
            hover:bg-gray-200 cursor-pointer'
            onClick={() => onSelectArticle(article)} // Call onSelectArticle when an article is clicked
          >
            <div>
              <div className='text-sm font-semibold pb-2'>{article.title}</div>
              <div className='text-xs'>{truncateString(article.content, 100)}</div>
            </div>
            <img src={article.image} className="w-16 h-16 rounded-lg shadow-lg" alt={article.title} />
          </div>
        ))
      ) : (
        <div>No articles available</div>
      )}
    </div>
  );
};

export default ArticleList;
