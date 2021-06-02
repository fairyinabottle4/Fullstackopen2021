import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/currUserReducer'
import { Button, TextField } from '@material-ui/core'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')   

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(loginUser(username, password))
  }

  return(
    <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    <div>
      <TextField   
        label="username"        
        type="text"
        id="username"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}>
      </TextField>
    </div>
    <div>
      <TextField     
        label="password"  
        type="password"
        id="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}>
      </TextField>
    </div>
    <Button variant="contained" color="primary" id="login-button" type="submit">
      login
    </Button>
  </form>      

  )
}

export default LoginForm
