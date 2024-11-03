import React, { useState } from "react";
import menu from '../assets/menu.svg';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [hoveredMenu, setHoveredMenu] = useState(null);

    const handleMouseEnter = (menu) => setHoveredMenu(menu);
    

    const handleMouseLeave = () =>  setHoveredMenu(null);

    return (
        <div className='w-screen h-[80px] z-10 bg-white fixed drop-shadow-lg relative'>
            <div className='flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto'>
                
                <div className='flex items-center'>
                    <img src={menu} alt="menu" className='sm:ml-10 ss:ml-10 md:ml-3 w-full h-[25px]' />
                </div>

                
                <div className='flex items-center'>
                    <ul className="hidden md:flex">
                        
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

                
                <div className='hidden md:flex sm:mr-10 md:mr-10'>
                    <Link to="/login">
                    <button className='border-none bg-transparent text-black mr-4'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
