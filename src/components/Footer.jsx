/* eslint-disable no-unused-vars */
import React from 'react'
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className='w-screen bg-white py-10 text-black'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
          <p className="text-center text-sm font-light md:text-left"> &copy; Nova 2024. All rights reserved </p>
          <div className='flex justify-center gap-4 md:justify-start'>
              {
                socialLinks.map((link,idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel='noopener noreferrer'
                    className='text-black transition-all duration-500 ease-in-out hover:text-sky-400'
                    >
                    {link.icon}

                  </a>
                ))
              }
          </div>

          <a target='_self' href='#privacy-policy' className='text-center text-sm font-light hover:underline md:text-right'> privacy policy </a>
      </div>
    </footer>
  )
}

export default Footer