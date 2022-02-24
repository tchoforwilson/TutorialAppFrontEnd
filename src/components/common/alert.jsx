/**
 * Display an alert information to user
 * @param {String} message -> Real message
 * @param {String} details -> details about message
 * @param {String} alertClassName -> Alert css class name
 * @returns
 */
const Alert = (message, details, alertClassName) => {
  return (
    <div
      className={`alert alert-${alertClassName} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{message}!</strong> {details}
    </div>
  )
}

export default Alert
