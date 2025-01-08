import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      if(!name || name === '') {
        setCountry(null)
        setFound(null)
      }
      else {
        try {
          const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
          const response = await axios.get(url)
          setCountry(response.data)
          setFound(true)
        } catch (error) {
          setCountry(null)
          setFound(false)
        }
      }
    }

    fetchCountry()
  }, [name])

  return { country, found }
}

const Country = ({ country, found }) => {
  if (country === null && found === null) {
    return null
  }

  if (!found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { country, found } = useCountry(name)
  

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} found={found} />
    </div>
  )
}

export default App