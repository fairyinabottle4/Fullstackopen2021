import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {

  const message = useSelector(state => state.notification)
  if (message === null) {
    return null
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

const isLoginError = message === "Wrong credentials"
//this is only here for brevity's sake. I know it's ugly
return (
  <div style={isLoginError ? errorStyle : successStyle} className="error">
    {(message &&
      <Alert severity="success">
        {message}
      </Alert>
    )}
  </div>
  )
}

export default Notification
