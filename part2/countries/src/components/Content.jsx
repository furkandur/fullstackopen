import CountryDetail from "./CountryDetail"

const Content = ({ foundCountries, handleShow }) => {
    if (foundCountries && foundCountries.length !== 0) {
        if (foundCountries.length === 1) {
            return (
              <CountryDetail countryName={foundCountries[0]} />
            )
        }
        if (foundCountries.length > 10) {
            return (
                <div>
                    <p>Too many matches, specify another filter</p>
                </div>
            )
        }
        else {
            return (
                <div>
                    {foundCountries.map(country => 
                        <p key={country}>{country} <button onClick={() => handleShow(country)}>Show</button></p>
                    )}
                </div>
            )
        }
        
    } else {
        return (
            <div>
                <p>Please specify a filter</p>
            </div>
        )
    }
}
  
export default Content;
  