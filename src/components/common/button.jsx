import React from 'react'

/**
 * Render a button in the view,
 * @param {String} name
 * @param {function} handleClick
 * @returns html button
 */
const Button = (
  name,
  handleClick,
  cssClassName = 'btn btn-primary text-decoration-none text-white',
) => {
  return (
    <button id={name} className={cssClassName} onClick={handleClick}>
      {name}
    </button>
  )
}

export default Button
