import React, {useRef} from 'react'
import history from '../history'

const Login = (props) => {

  if (localStorage.getItem('token')) {
    history.push('/dashboard')
  }

  const textInput = useRef(null)
  
  console.log('keep render')
  const handleLogin = (e) => {
    e.preventDefault()
    const password = textInput.current.value
    console.log('password', password)
    if (password === '123') {
      localStorage.setItem('token','dacotoken')
      history.push('/dashboard')
      console.log('push')
    } else {
      textInput.current.value = ''
    }
  }
  return (
    <div>
      {/*  
      TODO: Your login page implementation
      */}
      <form onSubmit={handleLogin}>
        <input data-test='login__pwd' type='password' ref={textInput} />
        <button data-test='login__submit' type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login