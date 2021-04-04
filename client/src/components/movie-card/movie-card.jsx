import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
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
      console.log(user);
    }
  }

  getUserData(token) {
    axios
      .get(`/users/${localStorage.getItem("user")}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (this.mounted) {
          // assign the result to the state
          this.setState({
            user: response.data,
            favoriteMovies: response.data.FavoriteMovies,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.mounted = false;
  }

  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is 'MainView', as 'MianView' is what´s
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;

    return (
      <div
        className="card-container"
        style={{ marginRight: "20px", marginBottom: "20px" }}
      >
        <Card className="movie-card-body">
          <Card.Img
            style={{ height: "22rem" }}
            variant="top"
            src={movie.ImagePath}
          />
          <Card.Body>
            <Card.Title style={{ height: "3rem" }}>
              <Link
                to={`/movies/${movie._id}`}
                style={{ textDecoration: "none" }}
              >
                {movie.Title}
              </Link>
              <span className="value">
                {this.state.favoriteMovies.includes(movie._id) ? (
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{
                      color: "orange",
                      height: "15px",
                      marginBottom: "3px",
                    }}
                  />
                ) : (
                  ""
                )}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted">
              <Link
                to={`/genres/${movie.Genre.Name}`}
                style={{ textDecoration: "none" }}
              >
                {movie.Genre.Name}
              </Link>
            </Card.Subtitle>
            <Card.Text style={{ height: "120px" }}>
              {movie.Description.substring(0, 90)}...
            </Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="primary" size="sm">
                Open
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
