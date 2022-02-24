import { useState } from 'react'
import Input from './common/input'
import Button from './common/button'
import Alert from './common/alert'
import { addTutorial } from './../services/tutorialService'

const AddTutorial = () => {
  const [tutorial, setTutorial] = useState({ title: '', description: '' })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const newTutorial = (e) => {
    setTutorial({ title: '', description: '' })
    setError('')
    setSubmitted(false)
  }
  const handleChange = (e) => {
    let tut = tutorial
    tut[e.target.name] = e.target.value
    setTutorial({ ...tut })
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const result = await addTutorial(tutorial)
      if (result.status === 201 && result.statusText === 'Created') {
        setSubmitted(true)
      }
    } catch (ex) {
      const { data } = ex.response
      setError(data.message)
    }
  }
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          {Alert('You submitted successfully!', '', 'success')}
          {Button('Add', newTutorial, 'btn btn-success')}
        </div>
      ) : (
        <div>
          {error
            ? Alert(error.split('!')[0], error.split('!')[1], 'danger')
            : null}
          <form>
            {Input(
              'title',
              'Title',
              tutorial.title,
              handleChange,
              'title',
              'text',
            )}
            {Input(
              'description',
              'Description',
              tutorial.description,
              handleChange,
              'description',
              'text',
            )}

            {Button('Submit', handleClick, 'btn btn-success')}
          </form>
        </div>
      )}
    </div>
  )
}

export default AddTutorial
