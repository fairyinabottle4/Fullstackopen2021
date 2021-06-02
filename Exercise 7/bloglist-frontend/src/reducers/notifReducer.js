const notifReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIF':
      return action.data
    case 'REMOVE':
      return null    
    default:
      return state
    }
  }
  
  export const setNotification = (content) => {
    //one possibility is to have different types of notification, sent as a second parameter,
    //which will determine the format of the notification. As this is not required now,
    //this is not implemented here
    const duration = 5
    if (window.notificationTimeout) {
      window.clearTimeout(window.notificationTimeout)
    }
  
    return async (dispatch) => {
      dispatch({
        type: 'SET_NOTIF',
        data: content  
      })
      window.notificationTimeout = setTimeout(() => {
        dispatch(removeNotif())
      }, duration * 1000)
    }
  }
  
  export const removeNotif = () => {
    return {type : 'REMOVE'}
  }
  
  export default notifReducer