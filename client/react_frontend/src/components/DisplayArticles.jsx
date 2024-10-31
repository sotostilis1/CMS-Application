import React from 'react';

const DisplayArticles = ({ article, onDeleteArticle, onEditArticle }) => {

    const title = article ? article.title : "Select an article to view details";
    const content = article ? article.content : "";
    const image = article ? article.image : null;

  return (
    <div className='w-[52%] bg-[#f9f9f9] m-8 ml-2 mr-2 border rounded'>
        <div className='py-2 px-2 flex items-start justify-between'>
            <div className='text-xl pb-2'>{title}</div>
            <div>
            {/* Only show edit and delete buttons if an article is selected */}
            {article && (
                <div className='flex items-center'>
                    <button onClick={onEditArticle} className='mr-1 bg-blue-400 p-1 rounded-md text-xs transition hover:bg-blue-500 hover:text-white border-transparent'>
                        Edit
                    </button>
                    <button 
                        className='ml-1 bg-red-400 p-1 rounded-md text-xs transition hover:bg-red-500 hover:text-white border-transparent'
                        onClick={() => onDeleteArticle(article.id)}>
                        Delete
                    </button>
                </div>
            )}
            </div>
        </div>
        <div>
            {image && (
              <img src={image} className="w-32 h-32 rounded-lg shadow-lg float-left mx-2" />
            )}
            <div className='break-normal text-sm px-2'>{content}</div>
          </div>


    </div>
  );
};

export default DisplayArticles;

