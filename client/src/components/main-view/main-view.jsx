import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {

        // Call the superclass constructor 
        // so that React can initialize it
        super();

        //Initialize the state to an empty object 
        // so that we can destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            newUser: null
        };
        this.onRegisterUser = this.onRegisterUser.bind(this);
    }

    componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        this.setState({
            user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://myflickz.herokuapp.com/movies', {
           headers: { Authorization: `Bearer ${token}`} 
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onRegisterUser (newUser) {
        this.setState({
          newUser
        });
    }



    // This overrides the render() method of the superclass
    // No need to call super() though, as it does nothin by default
    render() {
        // If the state is not initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies, selectedMovie, user, newUser } = this.state;

        //NEED TO FIND A SOLUTION FOR THIS BELOW!!!!!!!!!!!
        //if (!newUser) return <RegistrationView onRegisterUser={newUser => this.onRegisterUser(newUser)} />;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        
        //Before the movies have been loaded
        if (!movies) return <div className="main-view"/>;

        return (
            <div className="main-view">
                {selectedMovie 
                ? <MovieView 
                    movie={selectedMovie} 
                    onClick={() => this.onMovieClick(null)}/>
                : movies.map(movie => (
                    <MovieCard 
                    key={movie._id} 
                    movie={movie} 
                    onClick={movie => this.onMovieClick(movie)}/>
                ))}
            </div>
        );
    }
}