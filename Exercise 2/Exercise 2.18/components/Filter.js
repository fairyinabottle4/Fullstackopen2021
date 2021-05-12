import React from 'react'

const Filter = ({string, func}) => {
    return (
        <form>
            <div>filter shown with <input value={string} onChange={func}/></div>
        </form>
    )
}




export default Filter