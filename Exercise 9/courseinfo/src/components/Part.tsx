import React from 'react';
import { CoursePart } from '../types'

const Part = ({ part } : { part: CoursePart }) => {


  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <strong>Name: {part.name}</strong>
          <p>Exercise Count: {part.exerciseCount}</p>
          <i>Description: {part.description}</i>
        </div>
      )
    case "Advanced": 
      return (
        <div>
          <strong>Name: {part.name}</strong>
          <p>Exercise Count: {part.exerciseCount}</p>
          <i>Description: {part.description}</i>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <strong>Name: {part.name}</strong>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Group Project Count: {part.groupProjectCount}</p>
        </div>
      )  
    case "Deeper type usage":
      return (
        <div>
          <strong>Name: {part.name}</strong>
          <p>Exercise Count: {part.exerciseCount}</p>
          <i>Description: {part.description}</i>
          <br/>
          <p>Exercise submission link</p>
          <a href={part.exerciseSubmissionLink}> {part.exerciseSubmissionLink}</a>
        </div>
      )  
    default:
      return assertNever(part)
  }
}

export default Part