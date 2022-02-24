import { Link } from 'react-router-dom'
/**
 * Display the information of the current tutorial selected
 * @param {Object} tutorial -> The tutorial to be display
 * @param {String} name -> Name of the link
 * @param {String} to -> Link direction
 * @returns Container
 */
const TutorialInfo = ({ tutorial, name, to }) => {
  return (
    <div className="continer">
      <label htmlFor="title">
        <strong>Title:</strong>
        <span>{tutorial.title}</span>
      </label>
      <br />
      <label htmlFor="title">
        <strong>Description: </strong>
        <span>{tutorial.description}</span>
      </label>
      <br />
      <label htmlFor="title">
        <strong>Published: </strong>
        <span>{tutorial.published ? 'True' : 'False'}</span>
      </label>
      <br />
      <Link to={to} className="btn btn-success text-decoration-none text-white">
        {name}
      </Link>
    </div>
  )
}

export default TutorialInfo
