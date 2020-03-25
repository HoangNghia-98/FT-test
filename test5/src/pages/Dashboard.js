import React from 'react'
import Menu from '../components/Menu'

const Dashboard = () => {
  return (
    <div>
      <Menu />
      <p data-test='db__welcome'>
        Welcome to dashboard page
      </p>
    </div>
  )
}

export default Dashboard