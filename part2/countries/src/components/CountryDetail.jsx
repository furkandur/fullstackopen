import { useEffect, useState } from "react"
import countryService from "../services/countries"
import weatherService from "../services/weather"

const CountryDetail = ({ countryName }) => {
    const [country, setCountry] = useState(null)
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        countryService
            .getByName(countryName)
            .then(result => {
                setCountry(result)
            })
    }, [countryName])

    useEffect(() => {
        if (country) {
            weatherService
                .getWeatherData(country.latlng[0], country.latlng[1])
                .then(result => {
                    setWeatherData(result)
                })
        }
    }, [country])

    if (country && weatherData) {
        const languages = Object.values(country.languages)
        const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        return (
        <div>
            <h1>{ country.name.common }</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h3>languages:</h3>
            <ul>
                {languages.map(lang => <li key={lang}>{lang}</li>)}
            </ul>

            <img src={country.flags.png} alt={country.flags.alt} />

            <h1>Weather in {country.capital}</h1>
            <p>Temprature: {weatherData.main.temp} Celsius</p>
            <img src={iconUrl}/>
            <p>Wind: {weatherData.wind.speed} m/s</p>

        </div>
        )
        
    }
} 

export default CountryDetail