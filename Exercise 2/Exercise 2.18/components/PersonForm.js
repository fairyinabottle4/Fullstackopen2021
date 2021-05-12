import React from 'react'

const PersonForm = ({action, newName, newNumber, handleName, handleNumber}) => {
    return (
        <form onSubmit={action}>
            <div>name: <input value={newName} onChange={handleName}/></div>
            <div>number: <input value={newNumber} onChange={handleNumber}/></div>
            <div><button type="submit">add</button></div>
        </form>

    )
}





export default PersonForm