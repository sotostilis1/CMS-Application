import React, { useState, useEffect } from 'react';
import ArticleList from './ArticleList';
import DisplayArticles from './DisplayArticles';
import CreateArticle from './CreateArticle';
import axios from 'axios';
import EditArticle from './EditArticle'

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

    const showMessage = (msg) => {
      setMessage(msg);
      setIsVisible(true);
      setTimeout(() => {
          setIsVisible(false);
          setMessage(''); // Clear the message
      }, 1500);
  };
  


  // Fetch articles from the server
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/articles');
      setArticles(response.data.message); // Update articles in state
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles(); // Fetch articles when the component mounts
  }, []);

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    setIsNewArticle(false);
    setIsEditMode(false);
  };

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setIsNewArticle(true);
    setIsEditMode(false);
  };

  const handleEditArticle = () => {
    setIsEditMode(true); 
};

  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.delete(`http://localhost:3000/api/articles/${articleId}`, {
        withCredentials: true,
      });
      showMessage('Article deleted successfully');
      setSelectedArticle(null);
      fetchArticles(); // Refresh articles after deletion
    } catch (error) {
      if (error.response.status === 403) {
        showMessage('You have to be logged in as Admin to delete Articles');
      }else{
        console.error('Error deleting article:', error);
      }
      
    }
  };

  return (
    <div className='flex items-start justify-between'>
      <div className='w-[45%] bg-white m-8 ml-2 mr-2 border rounded'>
        <div className='bg-[#f9f9f9]'>
          <div className='py-8 px-10 border-b flex items-center justify-between'>
            <div className='text-2xl'>Articles</div>
            <button className='bg-green-400 p-1 rounded-md text-xs transition hover:bg-green-500 hover:text-white border-transparent' onClick={handleNewArticle}>
              New Article
            </button>
          </div>
          {isVisible && (
            <div className='p-2 flex justify-center text-sm text-red-400'>{message}</div>
            )}
          <div className='p-2 bg-white'>
            <div>
              <ArticleList articles={articles} onSelectArticle={handleSelectArticle} />
            </div>
          </div>
        </div>
      </div>

      {selectedArticle && !isNewArticle && !isEditMode  && (
        <DisplayArticles article={selectedArticle} onDeleteArticle={handleDeleteArticle} onEditArticle={handleEditArticle} />
      )}

      {!selectedArticle && isNewArticle && (
        <CreateArticle fetchArticles={fetchArticles} />
      )}

      {selectedArticle && isEditMode && (
        <EditArticle article={selectedArticle} fetchArticles={fetchArticles} setSelectedArticle={setSelectedArticle} />
      )}

      
    </div>
  );
};

export default Articles;
