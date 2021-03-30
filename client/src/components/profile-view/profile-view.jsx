import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./profile-view.scss";

import axios from "axios";

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
    this.mounted = true;
    let accessToken = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (accessToken !== null) {
      console.log("checking");
      this.getUserData(accessToken);
    }
    //console.log(accessToken);
    //console.log(user);
  }

  getUserData(token) {
    axios.get(`/users/${localStorage.getItem("user")}`, 
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
          favoriteMovies: response.data.FavoriteMovies,
        });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //remove user
  deleteUser(e) {
    e.preventDefault();
    axios.delete(`/users/${localStorage.getItem("user")}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log(response);
        alert("Your account has been succesfully deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/client", "_self");
      })
      .catch((error) => {
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
    console.log(this.state);
  }

  //pull fave movie from favoriteMovies array
  removeFavoriteMovie(movieId) {
    axios.delete(
        `/users/${localStorage.getItem("user")}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      .then(response => {
        alert("Movie removed from favorites.");
      })
      .then((response) => {
        document.location.reload(true);
      })
      .catch((error) => {
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
    console.log(this.state);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({ validated: true });
    }
    // notify that fields were validated,
    // therefore feedback can be shown
    // (otherwise it will appear at page load)

    axios
    .put(
      `/users/${localStorage.getItem("user")}`,
      {
        Username: this.state.username,
        Password: this.state.password,
        Email: this.state.email,
        Birthday: this.state.birthday,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((response) => {
      console.log(response);
      alert("Your account details have been updated.");
      localStorage.setItem("user", this.state.username);
      window.open("/client", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch((error) => {
      console.log("error");
    });
}

  goBack = () => {
    window.history.go(-1);
    if (
      window.location.pathname === "/" ||
      (window.history.state && window.history.state.key)
    ) {
      return;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.goBack();
    }, 100);
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.mounted = false;
    // this.setState = (state,callback)=>{
    //     return;
    // };
  }

  render() {
    const { userView, favoriteMovies } = this.state;
    const { movies } = this.props;
    const favoriteMovieList = movies.filter((movie) =>
      this.state.favoriteMovies.includes(movie._id)
    );
    localStorage.getItem("token");
    localStorage.getItem("user");
    console.log("state ebere:", this.state);

    //favoriteMovies view
    if (userView === true) {
      return (
        <Container>
          <a href="#" onClick={this.goBack}>
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4" />
          </a>

          <Row>
            <Col
              style={{ marginRight: "-300px" }}
              xs={{ offset: 1 }}
              sm={{ offset: 0 }}
              md={{ offset: 0 }}
              lg={{ offset: 0 }}
            >
              <h1>Favorite Movies</h1>
            </Col>
            <Col style={{ paddingTop: "10px" }}>
              <Button
                className="go-back-button"
                variant="outline-primary"
                type="submit"
                size="sm"
                style={{ float: "right" }}
                onClick={this.changeUserView}
              >
                Go back
              </Button>
            </Col>
          </Row>

          <div
            className="profile-movie-list d-flex row mt-3"
            style={{ marginLeft: "0px" }}
          >
            {favoriteMovies.length === 0 && (
              <div className="values favorite-movies">
                <h5>No favourite movies have been added yet.</h5>
              </div>
            )}
            {favoriteMovies.length > 0
              ? favoriteMovieList.map((m) => (
                  <Card
                    key={m._id}
                    className="movie-card-body card"
                    style={{
                      minWidth: "16rem",
                      maxWidth: "16rem",
                      marginRight: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={m.ImagePath}
                      style={{ maxHeight: "22rem" }}
                    />
                    <Card.Body
                      className="favorite-card-body"
                      style={{ padding: "20px" }}
                    >
                      <Link
                        to={`/movies/${m._id}`}
                        style={{
                          textDecoration: "none",
                          textAlign: "center",
                          color: "black",
                        }}
                      >
                        <Card.Title style={{ height: "3rem" }}>
                          {m.Title}
                        </Card.Title>
                      </Link>
                      <Button
                        onClick={(e) => this.removeFavoriteMovie(m._id)}
                        variant="outline-primary"
                        size="sm"
                        block
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              : ""}
          </div>
        </Container>
      );
    }

    //update user view
    return (
      <Container style={{ paddingTop: "100px" }}>
        <a href="#" onClick={this.goBack}>
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4" />
        </a>

        <div className="profile-view">
          <Row className="profile-form">
            <Col>
              <Col>
                <h1>User Profile</h1>
                <br />
              </Col>

              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
              >
                <Form.Group controlId="formBasicUsername">
                  <Form.Control
                    className="profile-input"
                    size="sm"
                    type="text"
                    name="username"
                    value={undefined}
                    onChange={this.changeHandler}
                    required
                    minLength={5}
                    pattern="[a-zA-Z0-9]+"
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    Username must be alphanumeric and include at least 5
                    characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    className="profile-input"
                    size="sm"
                    type="password"
                    name="password"
                    value={undefined}
                    onChange={this.changeHandler}
                    required
                    minLength={5}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must include at least 5 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    className="profile-input"
                    size="sm"
                    type="email"
                    name="email"
                    value={undefined}
                    onChange={this.changeHandler}
                    required
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicBirthday">
                  <Form.Control
                    className="profile-input"
                    size="sm"
                    type="date"
                    name="birthday"
                    value={undefined}
                    onChange={this.changeHandler}
                    required
                    pattern="^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$"
                    placeholder="Enter birthday (e.g. 1970/02/31)"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date (e.g. yyyy/mm/dd)
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="button">
                  <Button
                    className="update-button"
                    variant="primary"
                    type="submit"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    Update
                  </Button>
                </div>

                <div>
                  <Button
                    className="delete-button"
                    variant="danger"
                    type="button"
                    onClick={(e) => this.deleteUser(e)}
                  >
                    Unregister
                  </Button>
                </div>

                <div>
                  <Button
                    className="fave-view-button"
                    style={{ textDecoration: "none" }}
                    variant="link"
                    onClick={this.changeUserView}
                  >
                    See favorite movies
                    <FontAwesomeIcon
                      icon={faStar}
                      className="profile-star"
                      style={{ height: "30px", width: "25px" }}
                    ></FontAwesomeIcon>
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  users: PropTypes.shape({
    email: PropTypes.string,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Birthday: PropTypes.date,
  }),
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      Title: PropTypes.string,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string,
      }),
    })
  ).isRequired,
};
