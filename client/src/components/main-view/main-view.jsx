import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card'

export class MainView extends React.Component {
    constructor() {

        // Call the superclass constructor 
        // so that React can initialize it
        super();

        //Initialize the state to an empty object 
        // so that we can destructure it later
        this.state = {};
    }

    componentDidMount() {
        axios.get('https://myflickz.herokuapp.com/movies')
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies:response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // This overrides the render() method of the superclass
    // No need to call super() though, as it does nothin by default
    render() {
        // If the state is not initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies } = this.state;

        //Before the movies have been laoded
        if (!movies) return <div className="main-view"/>;

        return (
            <div className="main-view">
                { movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie}/>
                ))}
            </div>
        );
    }
}