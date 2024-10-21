import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getByName = (countryName) => {
    const url = `${baseUrl}/name/${countryName.toLowerCase()}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { getAll, getByName }