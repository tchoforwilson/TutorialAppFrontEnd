import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './../common/button'
import SearchBox from './../common/searchBox'
import TutorialList from './../tutorialList'
import { getTutorials } from './../../services/tutorialService'

const UserHome = ({ user }) => {
  const [tutorials, setTutorials] = useState([])
  const [currentTutorial, setCurrentTutorial] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [searchQuery, setSearchQuery] = useState({
    title: '',
    limit: 3,
    page: 1,
  })

  const getData = async () => {
    const { data } = await getTutorials(searchQuery)
    setTutorials(data.data.tutorials)
  }
  // const refreshList = () => {
  //   getData()
  //   setCurrentTutorial(null)
  //   setCurrentIndex(-1)
  // }
  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial)
    setCurrentIndex(index)
  }
  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      searchQuery.title = e.target.value.trim()
      setSearchQuery(searchQuery)
      getData()
    }
  }
  const handleSearchClick = (tutorial) => {
    // setCurrentTutorial(tutorial)
    // setActive(true)
  }

  const handleMore = () => {
    searchQuery.limit *= 2
    setSearchQuery(searchQuery)
    getData()
  }
  const handleLess = () => {
    searchQuery.limit /= 2
    setSearchQuery(searchQuery)
    getData()
  }

  return (
    <div className="container mt-4">
      <div className="list row">
        <div className="col-md-8">
          <SearchBox
            name="title"
            handleChange={handleChange}
            handleClick={handleSearchClick}
          />
        </div>
        {user.role === 'admin' && (
          <div className="col-md-4">
            <Link to="/new" className="btn btn-primary text-right">
              New tutorial
            </Link>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-7">
          <h4>Tutorials List</h4>

          <TutorialList
            tutorials={tutorials}
            currentIndex={currentIndex}
            setActiveTutorial={setActiveTutorial}
          />
          <div className="my-3">
            {searchQuery.limit > 3
              ? Button('Less', handleLess, 'btn btn-primary mx-2')
              : null}
            {Button('More', handleMore, 'btn btn-success mx-2')}
          </div>
        </div>
        <div className="col-md-5">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{' '}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{' '}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{' '}
                {currentTutorial.published ? 'Published' : 'Pending'}
              </div>
              {user.role !== 'admin' && (
                <Link
                  to={`/tutorial/${currentTutorial._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
              )}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserHome
