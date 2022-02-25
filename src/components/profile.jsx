import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMe, updateMe } from './../services/userService'
import Alert from './common/alert'
import Button from './common/button'
import Input from './common/input'

const Profile = () => {
  const [file, setFile] = useState()
  const [user, setUser] = useState({ name: '', email: '', role: '', photo: '' })
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    photo: '',
  })
  const [error, setError] = useState('')

  const [isName, setIsName] = useState(false)
  const [isEmail, setIsEmail] = useState(false)

  const getUserProfileData = async () => {
    const result = await getMe()
    const data = result.data.data.data
    setUser({ ...data })
    setUserData({ ...data })
  }
  useEffect(() => {
    getUserProfileData()
  }, [])
  const saveFile = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
    console.log(file)
  }
  const handleChange = (e) => {
    let userInfo = userData
    userInfo[e.target.name] = e.target.value
    setUserData({ ...userInfo })
  }
  const handleClick = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    file && formData.append('photo', file)
    formData.append('name', userData.name)
    formData.append('email', userData.email)
    try {
      const result = await updateMe(formData)
      if (result.status === 200 && result.statusText === 'OK') {
        const data = result.data.data.user
        setUser({
          ...data,
        })
        setIsName(false)
        setIsEmail(false)
        setFile()
        setError('')
      }
    } catch (ex) {
      const { data } = ex.response
      setError(data.message)
    }
  }
  const handleShowNameForm = (e) => {
    setIsName(true)
    setIsEmail(false)
  }
  const handleShowEmailForm = (e) => {
    setIsEmail(true)
    setIsName(false)
  }
  const handleCancel = (e) => {
    isName ? setIsName(false) : setIsEmail(false)
  }
  return (
    <div className="container my-4" style={{ maxWidth: '500px' }}>
      <div className="row">
        <div className="card py-3">
          <div className="card-header text-center bg-default">
            <figure>
              <img
                src={`http://localhost:8080/public/images/users/${user.photo}`}
                alt={user.name}
                style={{
                  width: '100px',
                  height: 'auto',
                  borderRadius: '50%',
                }}
              />
              <figcaption>
                <h1>{user.role}</h1>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={saveFile}
                  accept="image/*"
                />
                {Button(
                  'Change photo',
                  handleClick,
                  'btn btn-success text-white my-2',
                )}
              </figcaption>
            </figure>
          </div>
          <div className="card-body">
            {error && Alert(error.split('!')[0], error.split('!')[1], 'danger')}
            <div className="row" onClick={handleShowNameForm}>
              <div className="col-1 my-auto">
                <i className="fas fa-user"></i>
              </div>
              <div className="col-5">
                <label htmlFor="name">Name</label>
                <br></br>
                <span>
                  <strong>{user.name}</strong>
                </span>
              </div>
              <div className="col-1">
                <i className="fas fa-edit my-auto"></i>
              </div>
            </div>
            {isName &&
              showEditForm(
                'name',
                'Enter new name',
                userData.name,
                handleChange,
                handleCancel,
                handleClick,
              )}
            <div className="w-1 text-primary my-4"></div>
            <div className="row" onClick={handleShowEmailForm}>
              <div className="col-1 my-auto">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="col-5">
                <label htmlFor="name">Email</label>
                <br></br>
                <span>
                  <strong>{user.email}</strong>
                </span>
              </div>
              <div className="col-1">
                <i className="fas fa-edit my-auto"></i>
              </div>
            </div>
            {isEmail &&
              showEditForm(
                'email',
                'Enter new email',
                userData.email,
                handleChange,
                handleCancel,
                handleClick,
              )}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <Link
          to="/change-password"
          className="btn btn-success text-decoration-none text-white"
        >
          Change password
        </Link>
      </div>
    </div>
  )
}

/**
 * Show a form where user can edit his/her account details
 * @param {String} name
 * @param {String} label
 * @param {String} value
 * @param {Function} handleChange
 * @param {Function} handleCancel
 * @param {Function} handleClick
 * @returns A Form with a single input field with a cancel and save button
 */
function showEditForm(
  name,
  label,
  value,
  handleChange,
  handleCancel,
  handleClick,
) {
  return (
    <div className="form">
      {Input(name, label, value, handleChange)}
      <div>
        {Button('Cancel', handleCancel, 'btn btn-danger my-3')}
        {Button('Save', handleClick, 'btn btn-info my-3 mx-2')}
      </div>
    </div>
  )
}

export default Profile
