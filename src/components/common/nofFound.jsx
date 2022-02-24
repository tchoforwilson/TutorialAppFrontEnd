import { Fragment } from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
    return (<Fragment>
        <h1>Page not found</h1> 
        <Link to="/signin">home</Link>
    </Fragment>);
}
 
export default NotFound;