import React from 'react';
import PropTypes from "prop-types";
import { Row, Col, Form, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './profile-view.scss';

import axios from 'axios';

export class ProfileView extends React.Component {
  constructor(props) {

    super();
    this.state = {
      user: {},
      isLoading: true,
      userView: false,
      username: "",
      password: "",
      email: "",
      birthday: "",
      validated: "",
      favoriteMovies: [],

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeUserView = this.changeUserView.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (accessToken !== null) {
      this.getUserData(accessToken);
    }
    console.log(accessToken);
    console.log(user);
  }

  getUserData(token) {
    axios.get(`https://myflickz.herokuapp.com/users/${localStorage.getItem("user")}`, 
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        // assign the result to the state
        this.setState({
          user: response.data,
          isLoading: false,
          username: response.data.Username,
          password: null,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
          
        });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //remove user
  deleteUser(e) {
    e.preventDefault();
    axios.delete(`https://myflickz.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log(response);
        alert("Your account has been succesfully deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(error => {
        console.log(error);
      });
  }

    //button to change view method
  changeUserView() {
    const { userView } = this.state;
    if (userView === false) {
      this.setState({ userView: true });
    } else if (userView === true) {
      this.setState({ userView: false });
    }
    console.log(this.state)
  }

  //pull fave movie from favoriteMovies array
  removeFavoriteMovie(movieId) {
    axios.delete(
        `https://myflickz.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      .then(response => {
        alert("movie removed from favorites");
      })
      .then(response => {      
        document.location.reload(true);
      })
      .catch(error => {
        console.error(error);
      });
  }
 
  changeHandler(e) {
    let data = Object.assign({}, this.state);

    this.setState({ [e.target.name]: e.target.value });
    console.log("data: ", data);
  }

  handleSubmit(e) {
    e.preventDefault();

        //handles form validation
        console.log(this.state)
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
    
          this.setState({ validated: true });

        }
        // notify that fields were validated,
        // therefore feedback can be shown
        // (otherwise it will appear at page load)
    
    
 
    axios.put(`https://myflickz.herokuapp.com/users/${localStorage.getItem("user")}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
      .then(response => {
        console.log(response);
        alert("Your account details have been updated.");
        localStorage.setItem("user", this.state.username);
        window.open('/', '_self') // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(error => {
        console.log("error");
      });
  }


render() {
    const { userView, favoriteMovies } = this.state;
    const { movies } = this.props;
    const favoriteMovieList = movies.filter((movie) =>
      this.state.favoriteMovies.includes(movie._id)
    );
    localStorage.getItem("token");
    localStorage.getItem("user");
    console.log(this.state);


    //favoriteMovies view
    if (userView === true) {
      return <Container>
            <Link to="" onClick={() => history.back()}>
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4"/>
            </Link>
              <Row>
                <Col style={{marginRight: "-300px"}} xs={{ offset: 1 }} sm={{ offset: 0 }} md={{ offset: 0 }} lg={{ offset: 0 }}>
                    <h1>Your Favorite Movies</h1>
                </Col>
                <Col style={{paddingTop: "10px"}}>
                  <Button 
                    className="go-back-button" 
                    variant="outline-primary" 
                    type="submit" 
                    size="sm"
                    style={{float: "right"}}
                    onClick={this.changeUserView}>
                    Go back
                  </Button>
                </Col>
              </Row> 

                <div className="profile-movie-list d-flex row mt-3" style={{marginLeft: "0px"}}>
                  {favoriteMovies.length === 0 && <div className="values favorite-movies"><h5>No favourite movies have been added yet.</h5></div>}
                  {(favoriteMovies.length > 0) ? (favoriteMovieList.map(m => 
                  (
                      <Card  key={m._id} className="movie-card-body card" style={{ minWidth: "16rem", maxWidth: '16rem', marginRight: "15px", marginBottom: "20px"  }}>
                      <Card.Img variant="top" src={m.ImagePath} style={{ maxHeight: '22rem' }} />
                      <Card.Body className="favorite-card-body" style={{ padding: '20px' }}>
                      <Link to={`/movies/${m._id}`} style={{ textDecoration: "none", textAlign: "center", color: "black" }}>
                        <Card.Title style={{ height: '3rem'}}>{m.Title}</Card.Title>
                      </Link>
                      <Button onClick={e => this.removeFavoriteMovie(m._id)} variant="outline-primary" size="sm" block >Remove</Button>
                      </Card.Body>
                      </Card>
                      ))) : ""}
                </div>
      </Container>}

    //update user view
    return (
      <Container style={{ paddingTop: "100px" }}>
        <Link to="" onClick={() => history.back()}>
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4"/>
        </Link>
        <Row>
          <Col xs={{ offset: 1 }} sm={{ offset: 0 }} md={{ offset: 0 }} lg={{ offset: 0 }}>
            <h1>Profile</h1>
            <br/>
          </Col>
          <Col style={{paddingTop: "10px"}}>
          <Button 
          className="movies-button" 
          href="/" 
          style={{float: "right" }}
          size="sm" 
          variant='primary'>
          All movies
        </Button>
          </Col>              
        </Row>

       

      <div className="profile-view">


        <Row className="justify-content-center">
          <Col xs={8} sm={8} md={7} lg={5} className="form-container">

            <Form noValidate validated={this.state.validated}
              onSubmit={this.handleSubmit}>
              
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.changeHandler}
                  required minLength={5} pattern="[a-zA-Z0-9]+"
                  placeholder="Enter Username"
                />
                <Form.Control.Feedback type="invalid">
                  Username must be alphanumeric and include at least 5 characters.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.changeHandler}
                  required
                  placeholder="Enter Email" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  name="password"
                  value={null}
                  onChange={this.changeHandler}
                  required minLength={5} 
                  placeholder="Enter Password"
                />
                <Form.Control.Feedback type="invalid">
                Password must include at least 5 characters.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicBirthday" >
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="birthday"
                  value={this.state.birthday}
                  onChange={this.changeHandler}
                  required
                  placeholder="Enter Birthday"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid date (e.g. 01/01/1970)
                </Form.Control.Feedback>
              </Form.Group>
        <div>
              <Button 
                  className="fave-view-button btn-lg" 
                  variant="outline-primary" 
                  type="submit" 
                  style={{float: "left" }}
                  size="sm"
                  onClick={this.changeUserView}>
                    View your favorite movies
                </Button>
                </div>

              <div className="button">
                <Button 
                className="update-button" 
                size="sm"
                style={{float: "right"}}
                variant="primary" 
                type="submit" 
                onClick={e => this.handleSubmit(e)}>
                  Update
                </Button>

                
                
              </div>
              <br />
            </Form>
          </Col>
          <Col style={{maxWidth: "20%", paddingTop: "32px"}}>
          <Button
                  className="delete-button"
                  size="sm"
                  variant='danger'
                  type='button'
                  onClick={e => this.deleteUser(e)}>
                  Unregister
                </Button>
          </Col>
        </Row>
      </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  userProfile: PropTypes.shape({
    email: PropTypes.string,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Birthday: PropTypes.date
  }),
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
  ).isRequired
}