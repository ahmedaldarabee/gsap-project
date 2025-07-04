/* eslint-disable no-unused-vars */

import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import { useWindowScroll } from 'react-use';
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti';
import clsx from 'clsx';
import { FaShoppingCart } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';
// Question 1:
    //  1.1 Is exist here to avoid re-created after each re-render? [Yes]
const navItem = ["ahmad","Events"];

const Navbar = () => {
    // State for toggling audio and visual indicator if be run to not!
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    // Refs for audio and navigation container
    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null);

    // Question 2:
        //  2.1 What is the react-use library?

        //  2.2 What is the next code do?
            // That monitor current scroll number then return it
        //  2.3 currentScrollY is build-in function or what?
            // No, this is the return value from this hook: useWindowScroll
    const {
        y: currentScrollY
    } = useWindowScroll();

    // Question 3:
        // 3.1 for what these variables
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Toggle audio and visual indicator
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    // Manage audio playback
    useEffect(() => {
        if(isAudioPlaying){
            // Question 4:
                // 4.1 how it play where there is not animation definition?
                // The audio not needed to be work when animation happen!
            audioElementRef.current.play();
        }else{
            audioElementRef.current.pause();
        }
    },[isAudioPlaying]);

    useEffect(() => {
        if(currentScrollY === 0){
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        }else if (currentScrollY > lastScrollY){
            // here we will add dark theme on navbar once out from home page.
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        }else if(currentScrollY < lastScrollY){
            // [ once be in the bottom of page in another section ] and needed to return back to the top.
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }
        setLastScrollY(currentScrollY);
    },[currentScrollY,lastScrollY]);

    useEffect(() => {
        // Question 5
        gsap.to(navContainerRef.current,{
            // isNavVisible = false → يختفي الـ Navbar للأعلى ويُصبح شفاف.
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    },[isNavVisible]);

    return (
        <div 
            ref={navContainerRef}
            // Question 6
                // what mean of inset whatever if be x or y or both?
            className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>

            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    {/* first bar as logo */}
                    <div className='flex items-center gap-7'>
                        <img src='/img/logo.png' alt='logo image' className='w-10'/>
                        <Button 
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>
                    
                    {/* second bar as navigation links and audio button  */}
                    <div className='flex h-full items-center'>
                        {/* Links */}
                        <div className='flex flex-row gap-6 text-sm font-circular-web text-white'>
                            {navItem.map((item,idx) => (
                                    <a  key={idx} href={`#${item.toLowerCase()}`} className='text red group relative overflow-hidden pb-1'> {item} <span className='absolute w-full h-[0.5px] bg-white right-full bottom-1 group-hover:right-0 transition-all duration-300'></span> </a>
                                ))
                            }
                            <a className='hover:scale-110 relative group transition-all hover:rotate-3' href={"/store"}><FaShoppingCart className='inline'/> Store
                             <span className='absolute top-1/2 left-[8px] -translate-1/2 opacity-0 group-hover:-top-2 group-hover:opacity-100 transition-all duration-500'>
                             <BsDot size={28} />
                             </span>
                             <span className='absolute top-1/2 left-[7px] -translate-1/2 opacity-0 group-hover:-top-1 group-hover:left-[20px] group-hover:opacity-100 transition-all duration-500'>
                             <BsDot size={28} />
                             </span>
                             <span className='absolute top-1/2 left-[7px] -translate-1/2 opacity-0 group-hover:-top-1 group-hover:-left-[5px] group-hover:opacity-100 transition-all duration-500'>
                             <BsDot size={28} />
                             </span>
                             </a>
                        </div>

                        {/* audio button */}
                        <button
                                onClick={toggleAudioIndicator}
                                className='ml-10 flex items-center space-x-0.5'
                            >

                            <audio 
                                ref={audioElementRef}
                                className='hidden'
                                src='/audio/loop.mp3'
                                loop
                            />

                            {[1,2,3,4].map((bar) => (
                                <div
                                    key={bar}
                                    className={clsx("indicator-line",{
                                        // Question 7
                                            // active how it defined is be as build-in property?
                                            // [ active ] is already class that exist, where once isIndicatorActive is true it will defined 
                                        active: isIndicatorActive
                                    })}
                                    style={{animationDelay: `${bar * 0.1}s`}}/>
                            ))}

                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar