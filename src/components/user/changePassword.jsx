import { Fragment, useState } from 'react'
import Input from '../common/input'
import Alert from '../common/alert'
import Button from '../common/button'
import { updateMyPassword } from '../../services/userService'

const ChangePassword = () => {
  const [data, setData] = useState({
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const handleChange = (e) => {
    let user = data
    user[e.target.name] = e.target.value
    setData({ ...user })
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const result = await updateMyPassword(data)
      if (result.status === 200 && result.statusText === 'OK') {
        setSuccess(true)
      } else {
        setSuccess(false)
      }
      setData({
        currentPassword: '',
        password: '',
        passwordConfirm: '',
      })
    } catch (ex) {
      const { data } = ex.response
      setError(data.message)
    }
  }
  return (
    <main>
      <div className="container mx-auto my-3" style={{ maxWidth: '500px' }}>
        {success &&
          Alert('Success', 'password successfully updated!', 'success')}
        <Fragment>
          {error && Alert(error.split('!')[0], error.split('!')[1], 'danger')}
          <form>
            {Input(
              'currentPassword',
              'Current password',
              data.currentPassword,
              handleChange,
              'current password',
              'password',
            )}
            {Input(
              'password',
              'New password',
              data.password,
              handleChange,
              'new password',
              'password',
            )}
            {Input(
              'passwordConfirm',
              'Confirm new password',
              data.passwordConfirm,
              handleChange,
              'Confirm new password',
              'password',
            )}
            {Button('Change', handleClick, 'btn btn-success')}
          </form>
        </Fragment>
      </div>
    </main>
  )
}

export default ChangePassword
