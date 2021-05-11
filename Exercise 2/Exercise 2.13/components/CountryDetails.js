import React from "react";

const CountryDetails = ({country}) => (
    <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        {country.languages.map(language => <p>{language.name}</p>)}
        <img src={country.flag} width="200" alt="flag picture not available"/>
    </div>
)


export default CountryDetails