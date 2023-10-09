import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

// import assets
import BackArrowLight from '../assets/back-arrow-white.png'
import BackArrowDark from '../assets/back-arrow.png'


// Improt Json
import countriesData from '../data.json';

const getCountryNameByCode = (code) => {
    // Assuming countriesData is your array of countries
    const country = countriesData.find((country) => country.alpha3Code === code);
    return country ? country.name : code;
  };

const fetchCountryDetails = async (countryName) => {
    const countryDetails = countriesData.find((country) => country.alpha3Code === countryName);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return countryDetails;
  };

const Detail = () => {
    const {countryName} = useParams();
    const [countryDetails, setCountryDetails] = useState(null);
    const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const details = await fetchCountryDetails(countryName);
      setCountryDetails(details);
    };

    fetchData();
  }, [countryName]);

  if (!countryDetails) {
    // Loading state, you can add a loading spinner or message here
    return <div>Loading...</div>;
  }

  return (
    <div className={`page-container ${isDarkMode ? 'dark' : 'light'}`}>

        <Link className={`back-button ${isDarkMode ? 'dark' : 'light'}`} to='/'>
            <img alt="Left arrow back button" src={isDarkMode ? BackArrowLight : BackArrowDark}></img>
            <p>Back</p>
        </Link>

        <div className='country-details'>

            <img alt="Country flag picture" src={countryDetails.flags.png}></img>

            <div className='details-container'>
                <p className='name'>{countryDetails.name}</p>

                <div className="details">
                    <div>
                        <p><span>Native Name: </span> {countryDetails.nativeName}</p>
                        <p><span>Population: </span> {countryDetails.population.toLocaleString('en-US')}</p>
                        <p><span>Region: </span>{countryDetails.region}</p>
                        <p><span>Sub Region: </span> {countryDetails.subregion}</p>
                        <p><span>Capital:</span> {countryDetails.subregion}</p>
                    </div>
                    <div>
                        <p><span>Top Level Domain: </span> {countryDetails.topLevelDomain}</p>
                        <p><span>Currencies: </span> {countryDetails.currencies[0].name}</p>
                        <p><span>Languages: </span>
                        {countryDetails.languages.map((language, index) => (
                            <span key={index} className='languages'>
                            {language.name}
                            {index < countryDetails.languages.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                        </p>
                    </div>
                </div>

                <p className='border-countries'>
                    <span className='label'>Border Countries: </span>
                    {countryDetails.borders && countryDetails.borders.length > 0 ? (
                        countryDetails.borders.map((border, index) => (
                        <span key={index} className={`border-name ${isDarkMode ? 'dark' : 'light'}`}>
                            {getCountryNameByCode(border)}
                        </span>
                        ))
                    ) : (
                        <span>No border countries</span>
                    )}
                </p>


            </div>
        </div>
    </div>
  )
}

export default Detail