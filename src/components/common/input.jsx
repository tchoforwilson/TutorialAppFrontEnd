import React from 'react'

/**
 * Render a form input in the view,
 * @param {String} name -> Input field name
 * @param {String} label -> Input form label
 * @param {} value -> default value of input if any
 * @param {function} handleChange -> Function to handle input field change
 * @param {String} placeholder ->  A placeholder for input field
 * @param {string} type  -> Input field type
 * @returns A div of class form-group with a label and an input field
 */
const Input = (
  name,
  label,
  value,
  handleChange,
  placeHolder = '',
  type = 'text',
) => {
  return (
    <div className="form-group my-3">
      <label htmlFor={name}>
        <strong>{label}</strong>
      </label>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        className="form-control"
      />
    </div>
  )
}

// const Input=(name, label,value,error, handleChange, placeHolder="", type = "text") =>{
//     return (<div className="form-group my-2">
//         <label htmlFor={name}>{label}</label>
//         <input name={name} id={name} type={type} value={value} onChange={handleChange} placeholder={placeHolder} className="form-control" />
//         <div className="bg-danger text-white">{ error}</div>
//     </div>);
// }

export default Input
