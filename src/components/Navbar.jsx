import React from 'react'
import { useTheme } from './ThemeContext';

// Import assets
import MoonLightIcon from '../assets/moon-icon.png'
import MoonDarkIcon from '../assets/moon-icon-full.png'


const Navbar = () => {

  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`navbar-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1 className='navbar-label'>Where in the world?</h1>

      <div className='toggle-btn-container'>
        <img className='toggle-icon' src={isDarkMode ? MoonDarkIcon : MoonLightIcon} onClick={toggleTheme}></img>
        <p onClick={toggleTheme} >Dark Mode</p>
      </div>
    </nav>
  )
}

export default Navbar