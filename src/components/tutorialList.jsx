const TutorialList = ({ tutorials, currentIndex, setActiveTutorial }) => {
  return (
    <ul className="list-group">
      {tutorials &&
        tutorials.map((tutorial, index) => (
          <li
            className={
              'list-group-item ' + (index === currentIndex ? 'active' : '')
            }
            onClick={() => setActiveTutorial(tutorial, index)}
            key={index}
          >
            {tutorial.title}
          </li>
        ))}
    </ul>
  )
}

export default TutorialList
