import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Container, Media, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    let accessToken = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (accessToken !== null) {
      this.getUserData(accessToken);
    }
    console.log(accessToken);
    console.log(user);
  }

  addToFavorites(e) {
    const { movie } = this.props;
    axios
      .post(
        `/users/${localStorage.getItem("user")}/movies/${movie._id}`,
        { username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        document.location.reload(true);
      })
      .catch((error) => {
        alert(`${movie.Title} was not added to your favorites.` + error);
      });
  }

  getUserData(token) {
    axios
      .get(`/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // assign the result to the state
        this.setState({
          user: response.data,
          favoriteMovies: response.data.FavoriteMovies,
        });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //pull fave movie from favoriteMovies array
  removeFavoriteMovie(movieId) {
    axios
      .delete(`/users/${localStorage.getItem("user")}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        document.location.reload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.mounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const { movie } = this.props;
    console.log({ movie });
    if (!movie) return null;

    return (
      <Container className="movie-view">
        <Media className="d-flex flex-lg-row flex-xs-column-reverse flex-sm-column-reverse">
          <Media.Body>
            <a href="/client">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4" />
            </a>

            <div className="movie-title">
              <span className="value">
                <h1>
                  {movie.Title}
                  {this.state.favoriteMovies.includes(movie._id) ? (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="star-toggle-off"
                      onClick={(e) => this.removeFavoriteMovie(movie._id)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="star-toggle-on"
                      onClick={(e) => this.addToFavorites(e)}
                    />
                  )}
                </h1>
              </span>
            </div>
            <br />

            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>

            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
            <br />

            <div className="movie-description" style={{ width: "95%" }}>
              <span className="label">Description: </span>
              <br />
              <span className="value">{movie.Description}</span>
            </div>
            <br />
            <br />
            <br />
          </Media.Body>
          <img
            className="movie-poster"
            src={movie.ImagePath}
            style={{ height: "25rem" }}
          />
        </Media>
      </Container>
    );
  }
}

MovieView.propTypes = {
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
  ),
};
