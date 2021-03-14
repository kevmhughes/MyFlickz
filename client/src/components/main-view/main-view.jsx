import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

export class MainView extends React.Component {
    constructor() {

        // Call the superclass constructor 
        // so that React can initialize it
        super();

        //Initialize the state to an empty object 
        // so that we can destructure it later
        this.state = {
            movies: [],
            user: null,
        };

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

    // This overrides the render() method of the superclass
    // No need to call super() though, as it does nothin by default
    render() {
        // If the state is not initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies, user } = this.state;

        //Before the movies have been loaded
        if (!movies) return <div className="main-view"/>;

        return (
            <Router>
                <div className="main-view">

                    <Route path='/register' render={() => <RegistrationView />} />

                    <Route exact path='/' render={() => { 
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return movies.map(m => <MovieCard key={m._id} movie={m}/>)}}/>

                    <Route path='/movies/:movieId' render={({match}) => 
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

                    <Route path='/directors/:name' render={({match}) => {
                        if (!movies) return <div className="main-view"/>;
                        return <DirectorView director={movies.find(m => 
                            m.Director.Name === match.params.name).Director}/>
                    }}/>

                    <Route path='/genres/:name' render={({match}) => {
                        if (!movies) return <div className="main-view"/>;
                        return <GenreView genre={movies.find(m => 
                            m.Genre.Name === match.params.name).Genre}/>
                    }}/>

                </div>
            </Router>
        );
    }
}