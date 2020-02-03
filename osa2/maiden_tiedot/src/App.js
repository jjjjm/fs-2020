import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {
  return (<div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt={'flag'} style={{ maxWidth: '200px', maxHeight: '200px' }}></img>
  </div>
  )
}

const Weather = ({ weather, capital }) => {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div><b>temperature</b> {weather.current.temperature} celcius</div>
      <img src={weather.current.weather_icons} alt={'weather-icon'} style={{ maxWidth: '200px', maxHeight: '200px' }}></img>
      <div><b>wind</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  )
}

const Countries = ({ countries, showAction }) => {
  return (
    <div>
      {countries.length > 10
        ? 'Too many matches, specify another filter'
        : countries.map(country => {
          return (
            <div key={country.name}>
              {country.name}
              <button onClick={() => showAction(country.name)}>show</button>
            </div>
          )
        })
      }
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [visible, setVisible] = useState('')
  const [search, setSearch] = useState('')
  const [capital, setCapital] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    const curr = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
    setVisible(
      search.length > 0
        ? curr.length === 1
          ? <Country country={curr[0]} />
          : <Countries countries={curr} showAction={setSearch} />
        : '')
    setCapital(curr.length === 1 ? curr[0].capital : '')
  }, [search, countries])

  useEffect(() => {
    console.log(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
    if (capital) {
      Axios
        .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
        .then(response => setWeather(<Weather weather={response.data} capital={capital} />))
    } else { setWeather('') }
  }, [capital])

  return (
    <>
      <div>
        find countries <input value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      <div>
        {visible}
        {weather}
      </div>
    </>
  )
}

export default App;
