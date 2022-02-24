import React from 'react';
import { Link } from 'react-router-dom';
import { getTutorials } from '../../services/tutorialService';
class TutorialList extends React.Component{
    state = {
        books: [],
        currentTutorial: {
        },
        searQuery: {
            title: '', limit : 3, page : 1
        },
        active: false
    }
    async componentDidMount() {
    const { data } = await getTutorials(this.state.searQuery);
        const books = data.data.tutorials;
        this.setState({ books })

    }
    handleClick = book => {
        this.setState({ currentTutorial: book, active: true });
    }
    handleMore = () => {
        let query = this.state.searQuery;
        query.limit *= 2;
        this.setState({ searQuery: query });
        this.componentDidMount();
    }
    handleLess = () => {
        let query = this.state.searQuery;
            query.limit /= 2;
            this.setState({ searQuery: query });
            this.componentDidMount();
    }
    render() {
        const { books, currentTutorial: tutorial, active } = this.state;
        
        return (<div className="container">
            <div className="row">
                <div className="col-md-8">
                    {books.length > 0 ?
                        <div>
                            <h4>Tutorials List</h4>
                            <ul className="list-group">
                            {books.map(book => <li key={book._id} className="list-group-item" onClick={()=> this.handleClick(book)}>{book.title}</li>)}
                            </ul>
                        </div>
                        : <h4>No tutorials found</h4>
                    }
                    <div className="my-2">
                        <button className="btn btn-primary" onClick={this.handleMore}>More..</button>
                        <button className="btn btn-primary ml-3" onClick={this.handleLess} disabled={this.state.searQuery.limit <= 3}>Less..</button>
                    </div>
                </div>
                <div className="col">
                    {active ? <div className="continer">
                    <label htmlFor="title"><strong>Title:</strong><span>{tutorial.title}</span></label><br />
                    <label htmlFor="title"><strong>Description: </strong><span>{tutorial.description}</span></label><br />
                    <label htmlFor="title"><strong>Published: </strong><span>{tutorial.published ? "True" : "False"}</span></label><br/>
                    <button className="btn btn-success"> <Link to={`${tutorial._id}`} className="text-decoration-none text-white">Update</Link> </button>
                    </div> : <p><b>Please click on a Tutorial...</b></p>
                    }
                </div>
            </div>
        </div>);
    }
}
 
export default TutorialList;