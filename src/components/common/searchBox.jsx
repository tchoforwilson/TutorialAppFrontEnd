import Button from './button'

const SearchBox = ({ name, handleChange, handleClick }) => {
  // return (
  //   <input
  //     type="text"
  //     name={name}
  //     id={name}
  //     onChange={handleChange}
  //     className="form-control mr-sm-2"
  //     placeholder="Search..."
  //     aria-label="Search"
  //   />
  // )
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        name={name}
        id={name}
        onChange={handleChange}
        className="form-control"
        placeholder="Search by title"
        aria-label="Search"
      />
      <div className="input-group-append">
        {Button('Search', handleClick, 'btn btn-outline-secondary')}
      </div>
    </div>
  )
}

export default SearchBox
