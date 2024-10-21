import { useEffect, useState } from 'react'
import Finder from './components/Finder'

import countryService from "./services/countries"
import Content from './components/Content'

function App() {
  const [finder, setFinder] = useState('')
  const [countryList, setCountryList] = useState(null)
  const [foundCountries, setFoundCountries] = useState(null)

  const handleFinderChange = (event) => setFinder(event.target.value)
  const handleShow = (countryName) => setFinder(countryName)

  useEffect(() => {
    if (!countryList) {
      countryService
      .getAll()
      .then(countries => {
        setCountryList(countries.map(country => country.name.common))
      })
    }

    else {
      setFoundCountries(countryList.filter(country => country.match(new RegExp(finder, 'i'))))
    }

  }, [finder])

  return (
    <div>
      <Finder handleFinderChange={handleFinderChange} finder={finder} />
      <Content foundCountries={foundCountries} handleShow={handleShow} />
    </div>
  )
}

export default App
