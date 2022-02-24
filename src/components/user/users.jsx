import { useState, useEffect } from 'react'
import { getUsers } from './../../services/userService'
import Alert from './../common/alert'
import SearchBox from './../common/searchBox'
const Users = () => {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState({
    role: 'user',
    name: '',
    limit: 5,
    page: 1,
  })
  const [error, setError] = useState('')
  const getUsersData = async () => {
    try {
      const result = await getUsers(searchQuery)
      if (result.status === 200 && result.statusText === 'OK') {
        setUsers(result.data.data.data)
      }
    } catch (ex) {
      const { data } = ex.response
      setError(data)
    }
  }
  const handleChange = async (e) => {
    searchQuery.name = e.target.value.trim()
    setSearchQuery(searchQuery)
    getUsersData()
  }
  useEffect(() => {
    getUsersData()
  }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <div className="input-group">
              <SearchBox name="title" handleChange={handleChange} />
            </div>
          </form>
        </div>
      </div>
      {error && Alert(error.split('!')[0], error.split('!')[1], 'danger')}
      <div className="container my-4">
        <table className="table table-striped table-dark">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Photo</th>
              <th scope="col">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th scope="row">{i + 1}</th>
                <th className="text-center">{user.name}</th>
                <th>{user.email}</th>
                <th>
                  <img
                    src={`http://localhost:8080/public/images/users/${user.photo}`}
                    alt={user.name}
                    style={{ width: '100px', borderRadius: '50%' }}
                  />
                </th>
                <th>{user.createdOn}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
