import React, { useState , useEffect } from "react";
import menu from '../assets/menu.svg';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
      };
    
      // Close menu if screen width exceeds 768px (md breakpoint)
      useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768) {
            setIsMenuOpen(false);
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    const handleMouseEnter = (menu) => setHoveredMenu(menu);
    

    const handleMouseLeave = () =>  setHoveredMenu(null);

    return (
        <div className='w-screen h-[80px] z-10 bg-white fixed drop-shadow-lg relative'>
            <div className='flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto'>
                
            <div className='flex items-center'>
            
            <button onClick={toggleMenu} className="block sm:hidden ml-10">
                <img src={menu} alt="menu" className='w-full h-[25px] cursor-pointer' />
            </button>

            
            {isMenuOpen && (
                <div className=" block sm:hidden absolute top-full left-0 w-[40%] bg-white shadow-md">
                    <ul className="flex flex-col items-start p-4">
                    <li 
                            onMouseEnter={() => handleMouseEnter("articles")} 
                            onMouseLeave={handleMouseLeave}
                            className="mr-4 cursor-pointer"
                        >
                            <Link to="/articles">Articles</Link>
                        </li>
                        
                        <li 
                            onMouseEnter={() => handleMouseEnter("images")} 
                            onMouseLeave={handleMouseLeave}
                            className="cursor-pointer"
                        >
                            <Link to="/images">Images</Link>
                        </li>
                        
                    </ul>
                </div>
            )}
        </div>


                
                <div className='flex items-center'>
                    <ul className="hidden sm:flex">
                        
                        <li 
                            onMouseEnter={() => handleMouseEnter("articles")} 
                            onMouseLeave={handleMouseLeave}
                            className="mr-4 cursor-pointer"
                        >
                            <Link to="/articles">Articles</Link>
                        </li>
                        
                        <li 
                            onMouseEnter={() => handleMouseEnter("images")} 
                            onMouseLeave={handleMouseLeave}
                            className="cursor-pointer"
                        >
                            <Link to="/images">Images</Link>
                        </li>
                    </ul>
                </div>

                
                <div className='hidden sm:flex sm:mr-10 md:mr-10'>
                    <Link to="/login">
                    <button className='border-none bg-transparent text-black mr-4'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
