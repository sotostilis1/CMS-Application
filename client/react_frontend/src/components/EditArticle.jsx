import React,{useState} from 'react'
import axios from 'axios';



const EditArticle = ({ article, fetchArticles, setSelectedArticle}) => {

    

    const[image,setImage]=useState(article.image || "");
    const[content,setContent]=useState(article.content || "");
    const[title,setTitle]=useState(article.title || "");
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const showMessage = (msg) => {
      setMessage(msg);
      setIsVisible(true);
      setTimeout(() => {
          setIsVisible(false);
          setMessage(''); // Clear the message
      }, 2500);
  };



function convertToBase64(e){
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result);
    };
    reader.onerror = error => {
        console.log("Error: ", error);
    }
}

const edit = async () => {
    try {
      // Create an object with only changed fields
      const updatedFields = {};
      if (title !== article.title) updatedFields.title = title;
      if (content !== article.content) updatedFields.content = content;
      if (image !== article.image) updatedFields.image = image;
  
      // Only make the request if there are changes
      if (Object.keys(updatedFields).length > 0) {
        const response = await axios.put(
          `http://localhost:3000/api/articles/${article.id}`,
          updatedFields,
          {
            withCredentials: true, // Important for sending cookies
          }
        );
  
        setTitle('');
        setContent('');
        setImage('');
        showMessage('Article saved!');
        fetchArticles();
        setTimeout(() => {
            setSelectedArticle(null);
          }, 2000);
      } else {
        showMessage('No changes made.');
      }
  
    } catch (error) {
      if (error.response?.status === 403) {
        showMessage('You have to be logged in as Admin to edit Articles');
      } else {
        console.error('Error updating article:', error);
      }
    }
  };
  

  return (
    <div className='w-[52%] bg-[#f9f9f9] m-8 ml-2 mr-2 border rounded'>
        <div className='p-4 pb-0 text-center'>Create an article by setting a <span className="font-bold">title</span>, <span className="font-bold">content</span> and an <span className="font-bold">image</span>. </div>
        <div className='py-8 px-8 flex justify-center '>
        <input placeholder='title'
               className="border w-80 h-10 text-lg"
               value={title} 
               onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className='flex justify-center '>
        <textarea
          placeholder="content"
          className="border p-2 w-96 h-32 text-lg text-left leading-none resize-none"
          value={content} 
          onChange={(e) => setContent(e.target.value)}/></div>
        <div className='py-8 px-8 flex justify-center '>
        <input accept='image/*' type='file' onChange={convertToBase64}></input>
        {image && <img className="mt-2" width={100} height={100} src={image}  />}
        </div>
        <div className='flex justify-end m-4'>
            <button onClick={edit} className='bg-green-400 p-1 rounded-md text-md transition hover:bg-green-500 hover:text-white border-transparent'>
                Save
            </button>
            </div>
            {isVisible && (
            <div className='p-2 flex justify-center text-sm text-red-400'>{message}</div>
            )}
    </div>
  )
}

export default EditArticle