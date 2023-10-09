import React, {useState, useEffect, useContext} from 'react'
import { useTheme } from '../components/ThemeContext';
import { Link } from 'react-router-dom';

// Import assets
import SearchIcon from '../assets/search-icon.png'
import SearchIconLight from '../assets/search-icon-white.png'
import ArrowIcon from '../assets/arrow-icon.png'
import ArrowIconWhite from '../assets/arrow-icon-white.png'
import LightArrowLeft from '../assets/arrow-left-white.png'
import DarkArrowLeft from '../assets/arrow-left-black.png'


// Improt Json
import countriesData from '../data.json';

const CountryList = ({ filterValue, searchValue }) => {
  const countriesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { isDarkMode, toggleTheme } = useTheme();

  const filteredCountries = countriesData
    .filter((country) => {
      // Filter by region
      if (filterValue && filterValue !== 'Filter by Region') {
        return country.region === filterValue;
      }
      // Filter by search value
      if (searchValue) {
        const searchTerm = searchValue.toLowerCase();
        return (
          (country.name && country.name.toLowerCase().includes(searchTerm)) ||
          (country.capital && country.capital.toLowerCase().includes(searchTerm))
        );
      }
      return true; // If no filter is applied, return all countries
    })
    .slice((currentPage - 1) * countriesPerPage, currentPage * countriesPerPage);

    const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(countriesData.length / countriesPerPage)));
    const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  return (
    <div className='flags-container'>
      {filteredCountries.map((country, index) => (
        <Country key={index} country={country} />
      ))}

      <div className='pages-container'>
        <img onClick={prevPage} alt="Left arrow button" src={isDarkMode ? LightArrowLeft : DarkArrowLeft} className='arrow-btn'></img>
        <img onClick={nextPage} alt="Right arrow button" src={isDarkMode ? LightArrowLeft : DarkArrowLeft} className='arrow-btn rotate'></img>
      </div>
    </div>
  );
};

const Country = ({ country }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
      <div className={`country-element ${isDarkMode ? "dark" : "light"}`}>
        
        <Link to={`/detail/${country.alpha3Code}`} className='flag-link'>
          <img className='country-flag' src={country.flags.png} alt={`image flag of ${country.name}`}></img>   
        </Link>

        
        <div className='country-information'>
            <h2 className='country-name'>{country.name}</h2>
            <p className='country-detail'><span>Population:</span> {country.population}</p>
            <p className='country-detail'><span>Region:</span> {country.region}</p>
            <p className='country-detail'><span>Capital: </span>{country.capital}</p>            
        </div>

      </div>
    );
  };

const Home = () => {

    const [filterDropdown, setFilterDropdown] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [input, setInput] = useState("")

    // Context
    const { isDarkMode, toggleTheme } = useTheme();

    const handleDropdown = () => {
        setFilterDropdown(prev => !prev);
    };

    const handleValue = (value) => {
        setFilterValue(value);
        setFilterDropdown(prev => !prev);
    }
    const handleSearch = (value) => {
      setSearchValue(value);
      console.log(searchValue);
  }

  return (
    <div className={`page-container ${isDarkMode ? 'dark' : 'light'}`}>

        <section className='search-container'>

            <div className={`search-input-box ${isDarkMode ? 'dark' : 'light'}`}>
                <img className='search-icon' src={isDarkMode ? SearchIconLight : SearchIcon} alt='Search icon' onClick={() => handleSearch(input)}></img>
                <input className='input-field' value={input} placeholder='Search for a country...' onChange={(e) => setInput(e.target.value)}></input>
            </div>

            <div className='filter-box'>
                <div className={`filter-input-box ${isDarkMode ? 'dark' : 'light'}`}>
                    <p className='input-field'>{filterValue == null ? "Filter by Region" : filterValue }</p>
                    <img className={`arrow-icon ${filterDropdown ? "rotate" : ''}`} src={isDarkMode ? ArrowIconWhite : ArrowIcon} alt='Arrow down icon' onClick={handleDropdown}></img>
                </div>

                <div className={`dropdown-container ${filterDropdown ? 'expand' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
                    <p className='dropdown-value' onClick={() => handleValue('Africa')}>Africa</p>
                    <p className='dropdown-value' onClick={() => handleValue('Americas')}>Americas</p>
                    <p className='dropdown-value' onClick={() => handleValue('Asia')}>Asia</p>
                    <p className='dropdown-value' onClick={() => handleValue('Europe')}>Europe</p>
                    <p className='dropdown-value' onClick={() => handleValue('Oceania')}>Oceania</p>
                </div>
            </div>

        </section>

        <CountryList filterValue={filterValue} searchValue={searchValue} />

    </div>
  )
}

export default Home