import React from 'react';

const ImageList = ({ articles, onSelectArticle }) => {
  // Function to truncate long strings for display
  

  return (
    <div>
      {articles.length > 0 ? (
        <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
          {articles.map(article => (
            <div
              key={article.id}
              className="border bg-[#f9f9f9] flex flex-col items-center justify-between rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelectArticle(article)}
            >
              <img
                src={article.image}
                className="w-full h-full rounded-lg shadow-lg" 
                alt={article.title}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>No articles available</div>
      )}
    </div>
  );
};

export default ImageList;
