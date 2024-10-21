import axios from "axios"

const baseUrl = 'https://api.openweathermap.org/data/2.5'
const api_key = import.meta.env.VITE_API_KEY

const getWeatherData = (lat, lon) => {
    const request = axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { getWeatherData }