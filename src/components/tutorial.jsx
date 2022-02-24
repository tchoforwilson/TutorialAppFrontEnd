import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Alert from './common/alert'
import Input from './common/input'
import Button from './common/button'
import {
  getTutorial,
  updateTutorial,
  deleteTutorial,
} from './../services/tutorialService'

const Tutorial = () => {
  const [currentTutorial, setCurrrentTutorial] = useState({
    title: '',
    description: '',
    published: null,
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { id } = useParams()

  const getTutorialData = async () => {
    if (id) {
      const { data } = await getTutorial(id)
      setCurrrentTutorial(data.data.tutorial)
    } else {
      setCurrrentTutorial({ title: '', description: '', published: null })
    }
  }
  const handleChange = (e) => {
    e.target.name === 'title'
      ? setCurrrentTutorial({
          title: e.target.value,
          description: currentTutorial.description,
        })
      : setCurrrentTutorial({
          description: e.target.value,
          title: currentTutorial.title,
        })
  }
  const updatePublished = (e) => {
    !currentTutorial.published
      ? setCurrrentTutorial({
          published: true,
          description: currentTutorial.description,
          title: currentTutorial.title,
        })
      : setCurrrentTutorial({
          published: false,
          description: currentTutorial.description,
          title: currentTutorial.title,
        })
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const result = await updateTutorial(id, currentTutorial)
      if (result.status === 200 && result.statusText === 'OK') {
        setMessage('The tutorial was updated successfully!')
      }
    } catch (ex) {
      const { data } = ex.response
      setError(data.message)
    }
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const result = await deleteTutorial(id)
      if (result.status === 204 && result.statusText === 'success') {
        window.location = 'dashboard'
      }
    } catch (ex) {
      const { data } = ex.response
      setError(data.message)
    }
  }
  useEffect(() => {
    getTutorialData()
  }, [])

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form className="mb-3">
            {Input(
              'title',
              'Title',
              currentTutorial.title,
              handleChange,
              'title',
              'text',
            )}
            {Input(
              'description',
              'Description',
              currentTutorial.description,
              handleChange,
              'description',
              'text',
            )}

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? 'Published' : 'Pending'}
            </div>
          </form>

          {currentTutorial.published
            ? Button('UnPublished', updatePublished, 'btn btn-primary mx-2')
            : Button('Published', updatePublished, 'btn btn-primary mx-2')}
          {Button('Delete', handleDelete, 'btn btn-danger mx-2')}

          {Button('Update', handleUpdate, 'btn btn-success mx-2')}
          <div>
            {error && Alert(error.split('!')[0], error.split('!')[1], 'danger')}
            {message && Alert(message, '', 'Success')}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  )
}

export default Tutorial
