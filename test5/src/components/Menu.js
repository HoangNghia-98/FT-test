import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Menu = () => {
  const history = useHistory()
  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/login')

  }
  return (
    <div>
      <h3>Menu</h3>
      <ul id='menu'>
        <li><Link to="/dashboard">/dashboard</Link></li>
        <li><Link to="/setting">/setting</Link></li>
        <li><button data-test='logout__btn' onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  )
}

export default Menu