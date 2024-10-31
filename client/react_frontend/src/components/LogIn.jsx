import React, {useState, useEffect} from 'react'
import axios from 'axios';




const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [guestLogin, setGuestLogin] = useState(false);

    

    const showMessage = (msg) => {
        setMessage(msg);
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            setMessage(''); // Clear the message
        }, 2500);
    };

    const login = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/login', {
            username: username,
            password: password,
          }, {
            withCredentials: true, // Important for sending cookies
          });
          
          console.log('Login successful:', response.data);
          if(response.data.role == "admin"){
            showMessage('Logged in as admin');
          }else{
            showMessage('Logged in as guest');
          }
        } catch (error) {
            if (error.response.status === 401) {
                console.error('Wrong credentials');
                showMessage('Wrong credentials');
              } else if(error.response.status === 400)
                console.error('Error logging in:', error);
        }
      };

    const LogInAsGuest= ()=> {
        setUsername('guest');
        setPassword('guest');
        setGuestLogin(true);
    }

    const submitCredentials= ()=> {
        if (!username || !password) {
            console.log('Username or password cannot be empty');
            showMessage('Username or password cannot be empty');
            
          } else {
            console.log('Username:', username);
            console.log('Password:', password);
            login();
          }


    }

    useEffect(() => {
        if (guestLogin) {
          submitCredentials();
          setGuestLogin(false); // Reset trigger after login
        }
      }, [guestLogin, username, password]);
    

  return (
    <div className='flex justify-center'>
        <div className='w-[30%] bg-[#f9f9f9] m-16 pl-4 p-4 border rounded'>
            <div className='text-2xl flex justify-center' >
                Login
            </div>
            <div className='py-4  flex justify-center '>
              <input placeholder='username'className="border w-70 h-10 text-lg"
                     value={username} 
                     onChange={(e) => setUsername(e.target.value)} ></input>
            </div>
            <div className='py-4 flex justify-center '>
              <input placeholder='password'className="border w-70 h-10 text-lg " 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} ></input>
            </div>
            <div className='flex justify-between pt-4'>
            <button onClick={LogInAsGuest} className='bg-green-400 p-1 rounded-md text-sm transition hover:bg-green-500 hover:text-white border-transparent'>
                Login as Guest
            </button>
            <button onClick={submitCredentials} className='bg-green-400 p-1 rounded-md text-md transition hover:bg-green-500 hover:text-white border-transparent'>
                Login
            </button>
            </div>
            {isVisible && (
            <div className='p-2 flex justify-center text-sm text-red-400'>{message}</div>
            )}

        </div>
    </div>
  )
}

export default LogIn