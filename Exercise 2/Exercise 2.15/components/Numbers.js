import React from 'react'
import Entry from './Entry'


const Numbers = ({namesToShow}) => {
    return (
        <ul>{namesToShow.map(name => <Entry key={name.id} entry={name}/>)}</ul>
    )
}



export default Numbers