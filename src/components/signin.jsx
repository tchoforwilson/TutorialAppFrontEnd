import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './common/input'
import Alert from './common/alert'
import Button from './common/button'
import auth from './../services/authService'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    e.target.name === 'email'
      ? setEmail(e.target.value)
      : setPassword(e.target.value)
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await auth.signIn(email, password)
      window.location = '/dashboard'
    } catch (ex) {
      const data = ex.response.data
      setError(data.message)
    }
  }
  return (
    <div className="container mx-auto w-3 my-4">
      <h4 className="text-center">Book App</h4>
      <div className="container">
        {error
          ? Alert(error.split('!')[0], error.split('!')[1], 'danger')
          : null}
        <form>
          {Input(
            'email',
            'Email',
            email,
            handleChange,
            'you@example.com',
            'email',
          )}
          {Input(
            'password',
            'Password',
            password,
            handleChange,
            'Password',
            'password',
          )}
          {Button('Sign in', handleClick)}
        </form>
      </div>
      <div className="container">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default SignIn
