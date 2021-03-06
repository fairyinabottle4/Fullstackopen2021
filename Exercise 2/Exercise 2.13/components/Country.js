import React, { useState } from "react";
import CountryDetails from './CountryDetails'

const Country = ({country}) => {
    const [show, setShow] = useState(false)

    const handleButtonClick = () => setShow(!show)

    if (show) {
        return (
            <div>
                {country.name}
                <button onClick={handleButtonClick}>{show ? "Hide" : "Show"}</button>
                <CountryDetails country={country} />
            </div>
        )
    }

    return (
        <div>
            {country.name}
            <button onClick={handleButtonClick}>{show ? "Hide" : "Show"}</button>
        </div>

    )
}



export default Country
