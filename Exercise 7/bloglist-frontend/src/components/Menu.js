import {
    BrowserRouter as Router, Link,
  } from "react-router-dom"
  



const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link to='/' style={padding}>home</Link>
        <Link to='/blogs' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        <Link to='/about' style={padding}>about</Link>
        <Link to='/create-new' style={padding}>create new</Link>
      </div>
    )
  }    

  export default Menu