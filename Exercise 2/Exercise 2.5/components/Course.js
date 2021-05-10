import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'


const Course = ({courses}) => {
    return (
        <div>
            <Header text={courses.name}/>
            <Content parts={courses.parts}/>
            <Total parts={courses.parts}/>
        </div>
    )    
}


export default Course