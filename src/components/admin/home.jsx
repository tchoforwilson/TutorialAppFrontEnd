import { Routes, Route, useParams} from "react-router-dom";
import { Fragment } from "react/cjs/react.development";
import NavBar from './navbar';
import Tutorial from './tutorial';
import TutorialList from './tutorialList';
import auth from './../../services/authService';
const AdminHome=()=> {
    const { id } = useParams();
    //const [user, setUser] = useState();
    return (
        <Fragment>
            <NavBar user={auth.getCurrentUser()}/>
            <TutorialList />
            <Routes>
                <Route path=":id" element={<Tutorial id={id} />} />
            </Routes>
       </Fragment>
   );
}

export default AdminHome;