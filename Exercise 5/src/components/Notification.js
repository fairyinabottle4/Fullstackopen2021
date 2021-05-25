import React from 'react'

const Notification = ({ message }) => {
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

return (
    <div style={isLoginError ? errorStyle : successStyle} className="error">
      {message}
    </div>
  )
}

export default Notification
