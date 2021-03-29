import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Spinner, Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './main-view.scss';

// #0
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {
    constructor() {

        // Call the superclass constructor 
        // so that React can initialize it
        super();

        //Initialize the state to an empty object 
        // so that we can destructure it later
        this.state = {
            user: null,
            isLoading: true,
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
        window.open('/', '_self');
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLogOut() {
        localStorage.removeItem("token"); //, authData.token);
        localStorage.removeItem("user"); //, authData.user.Username);
        this.setState({isLoading: false, user: null });
        window.open('/', '_self');
      }
    
    getMovies(token) {
        axios.get('https://myflickz.herokuapp.com/movies', {
           headers: { Authorization: `Bearer ${token}`} 
        })
        .then(response => {
            // #1
            this.props.setMovies(response.data);
            this.setState({isLoading: false });
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
        // const { movies, user } = this.state;

        // #2
        let { movies } = this.props;
        let { user } = this.state;
        

        //Before the movies have been loaded
        if (!movies) return <div className="main-view"/>;
 
        return (
            <Router>
                <Navbar className="d-flex justify-content-between" fixed="top" variant="light" bg="light">
                    <Navbar.Brand href="/client/">MyFlix</Navbar.Brand>
                        <Nav>
                        <Navbar.Text>Signed in as: {user}</Navbar.Text>
                            <div className="profile-button">
                            <Button href={`/client/users/${user}`}>
                                Profile
                            </Button>
                            </div>
                            <div className="logout-button">
                            <Button variant="outline-primary" href={`/client`} onClick={() => this.onLogOut()}>
                                Log Out
                            </Button>
                            </div>
                        </Nav>
                </Navbar>

                <div className="login-view">
                <Route exact path='/client' render={() => { 
                        if (!user) return <LoginView  onLoggedIn={user => this.onLoggedIn(user)} />;
                        }}/>   
                    </div>

                    <div className="main-view">
                    {this.state.isLoading && (user) 
                    ? (
                    <div>
                    <div className="spinner-div">
                    <Spinner className="spinner" animation="border" />
                    </div>
                    </div>
                    ) : (<div>
                    <Route exact path='/client' render={() => {   
                        if (user) return <MoviesList movies={movies}/>;
                        }}/>     
                    <Route exact path='/client/users' render={() => <RegistrationView />} />

                    <Route exact path="/client/users/:username" render={() => <ProfileView movies={movies} user={user} />} />

                    <Route exact path='/client/movies/:movieId' render={({match}) => 
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />}/>

                    <Route exactpath='/client/directors/:name' render={({match}) => {
                        if (!movies) return <div className="main-view"/>;
                        return <DirectorView director={movies.find(m => 
                            m.Director.Name === match.params.name).Director} movies={movies} />
                    }}/>

                    <Route path='/genres/:name' render={({match}) => {
                        if (!movies) return <div className="main-view"/>;
                        return <GenreView genre={movies.find(m => 
                            m.Genre.Name === match.params.name).Genre} movies={movies}/>
                    }}/>
                    </div>
                    )}
                </div>

            </Router>
        );
    }
}



// #3
let mapStateToProps = state => {
    return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies } )(MainView);

MainView.propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        Title: PropTypes.string,
        ImagePath: PropTypes.string,
        Description: PropTypes.string,
        Genre: PropTypes.shape({
          Name: PropTypes.string,
          Description: PropTypes.string
        }),
        Director: PropTypes.shape({
          Name: PropTypes.string,
          Bio: PropTypes.string,
          Birth: PropTypes.string,
          Death: PropTypes.string
        }),
      })
    ),
  };