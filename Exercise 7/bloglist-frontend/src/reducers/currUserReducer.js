import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notifReducer'

const currUserReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.data
    default:
      return state    
  }
}

export const loginUser = ( username, password ) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      dispatch(setCurrUser(user))
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", 5))
    }
  }
}

export const setCurrUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    data: user
  }
}



export default currUserReducer