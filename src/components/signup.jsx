import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from './common/input'
import Button from './common/button'
import Alert from './common/alert'
import * as userService from '../services/userService'
import auth from './../services/authService'

const SignUp = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [error, setError] = useState('')
  const handleChange = (e) => {
    let user = data
    user[e.target.name] = e.target.value
    setData({ ...user })
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const result = await userService.signUp(data)
      auth.loginWithJwt(result.data.token)
      window.location = '/'
    } catch (ex) {
      const { data } = ex.response
      setError(data.message)
    }
  }
  return (
    <div className="container">
      <h4>Tutorial App</h4>
      <div className="container">
        {error ? Alert(error.split('!')[0], error.split('!'), 'danger') : null}
        <form>
          {Input('name', 'Name', data.name, handleChange, 'Your name')}
          {Input(
            'email',
            'Email',
            data.email,
            handleChange,
            'you@example.com',
            'email',
          )}
          {Input(
            'password',
            'Password',
            data.password,
            handleChange,
            'Password',
            'password',
          )}
          {Input(
            'passwordConfirm',
            'Confirm Password',
            data.passwordConfirm,
            handleChange,
            'Confirm password',
            'password',
          )}
          {Button('Sign Up', handleClick)}
        </form>
      </div>
      <div className="container">
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default SignUp
