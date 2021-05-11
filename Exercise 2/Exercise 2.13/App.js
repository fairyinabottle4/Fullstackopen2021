import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {

  const [countries, setCountries] = useState([])

  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    console.log("effect")
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
        console.log(countries)
      })
  })
  
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchString.toLowerCase()))

  const sizeOfFilter = filteredCountries.length  

  const handleFilter = (event) => {
    setSearchString(event.target.value)
  }

  if (sizeOfFilter === 1) {
    return (
      <div>
        <form>
          <div>find countries: <input value={searchString} onChange={handleFilter}/></div>
        </form>
        {filteredCountries.map(country => <h2>{country.name}</h2>)}

        {filteredCountries.map(country => <p>capital {country.capital} 
        <br></br>population {country.population}</p>)}

        <h3>languages</h3>

        {filteredCountries.map(country => 
          country.languages.map(language => <p>{language.name}</p>))}  

        {filteredCountries.map(country =>
           <img src={country.flag} alt="hello" width="200" height="200"/>)}   

      </div>
    )
  }


  return (
    <div>
      <form>
        <div>find countries: <input value={searchString} onChange={handleFilter}/></div>
      </form>
      <div>
        {sizeOfFilter > 10
          ? searchString === "" ? <p></p> : <p>Too many matches, specify another filter</p>
          : filteredCountries.map(country => <Country country={country}/>)
        } 

      </div>
    </div>
  )
}

export default App
