import React from "react";
import { useParams } from 'react-router';
import Input from './common/input';
import { getTutorial } from "./services/tutorialService";

class Tutorial extends React.Component {
    state = {
        tutorial : {}
    }
    async componentDidMount() {
        let id = this.props.id;
        if (id) {
            const result = await getTutorial(id);
            this.setState({ tutorial: result.data.data.tutorial })
            console.log(result.data.data.tutorial);
        } 
    }
    handleChange = e => {
        let tutorial = this.state.tutorial;
        tutorial[e.target.name] = e.target.value;
        this.setState({ tutorial });
    }
    render() {
        const {tutorial} = this.state;
        return( <div className="container mx-auto">
           {this.props.id ?  <h4>Update Tutorial</h4> :  <h4>Add Tutorial</h4>}
            <form>
            {
               Input("title", "Title", tutorial.title,this.handleChange)
            }
            {
               Input("description", "Description", tutorial.description,this.handleChange)
            }
         </form>

        </div>)
    }
}

export default function Tuts() {
    let { id } = useParams();
    return <Tutorial id={id}/>
}

//export default Tutorial;


// const Tutorial = () => {
//         let { id } = useParams();
//     //console.log(props.value)
//     return id ? <div className="container-fluid">
//         <h1>Update Tutorial</h1>
//         <form>
//             {
//                 Input("title", "Title", '')
//             }
//         </form>
//     </div> : <h2>Add new</h2>;
// }
//  export default Tutorial;
