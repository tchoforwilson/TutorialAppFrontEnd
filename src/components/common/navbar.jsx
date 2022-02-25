import { NavLink } from 'react-router-dom'

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/dashboard">
        TutorialApp
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navBar"
        aria-controls="navBar"
        aria-expanded="false"
        aria-label="Toggle Navigation"
      >
        <span className="navbr-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navBar">
        <div className="navbar-nav mr-auto">
          <NavLink className="nav-item nav-link" to="/tutorials">
            Tutorials
          </NavLink>
          {user.role === 'admin' && (
            <NavLink className="nav-item nav-link" to="/users">
              Users
            </NavLink>
          )}
        </div>
        <div>
          <NavLink className="navbar-brand" to="/me">
            <figure>
              <img
                className="img-circle"
                src={`http://localhost:8080/public/images/users/${user.photo}`}
                alt={`${user.name}`}
                style={{
                  width: '50px',
                  height: 'auto',
                  borderRadius: '50%',
                }}
              />
            </figure>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  )
  // return (
  //   <nav className="navbar navbar-expand navbar-dark bg-dark">
  //     <div className="container">
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-toggle="collapse"
  //         data-target="#navbarTogglerDemo01"
  //         aria-controls="navbarTogglerDemo01"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>
  //       <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
  //         <NavLink className="navbar-brand" to="/profile">
  //           <figure>
  //             <img
  //               className="img-circle"
  //               src={`http://localhost:8080/public/images/users/${user.photo}`}
  //               alt={`${user.name}`}
  //               style={{
  //                 width: '50px',
  //                 height: 'auto',
  //                 borderRadius: '50%',
  //               }}
  //             />
  //           </figure>
  //         </NavLink>
  //         <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
  //           <li className="nav-item active">
  //             <NavLink className="nav-link" to="/">
  //               Tutorials <span className="sr-only">(current)</span>
  //             </NavLink>
  //           </li>
  //           {user.role === 'admin' && (
  //             <>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/publishers">
  //                   Publishers
  //                 </NavLink>
  //               </li>
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" to="/users">
  //                   Users
  //                 </NavLink>
  //               </li>
  //             </>
  //           )}
  //         </ul>
  //       </div>
  //       <NavLink className="nav-link" to="/logout">
  //         Logout
  //       </NavLink>
  //     </div>
  //   </nav>
  // )
}

export default NavBar
