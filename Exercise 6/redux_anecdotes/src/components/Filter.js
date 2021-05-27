import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchString } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(setSearchString(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter