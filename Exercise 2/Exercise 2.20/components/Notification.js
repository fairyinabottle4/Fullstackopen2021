import react from 'react'

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

    const success = message.includes("Added") || message.includes("Updated")

    return (
      <div style={success ? successStyle : errorStyle}>
        {message}
      </div>
    )
  }
  

export default Notification