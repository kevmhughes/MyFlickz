import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './movie-view.scss';


export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};

    }

    addToFavorites(e) {
        const { movie } = this.props;
        axios.post(
          `https://myflickz.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`,
          { username: localStorage.getItem('user') },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          .then(res => {
            alert(`${movie.Title} successfully added to your favorites`);
          })
          .then(res => {
            window.open('/', '_self')
          })
          .catch(error => {
            alert(`${movie.Title} not added to your favorites` + error)
          });
      }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <Container className="movie-view">
                <Media className="d-flex flex-lg-row flex-xs-column-reverse flex-sm-column-reverse">
                  <Media.Body>

                    <Link to="" onClick={() => history.back()}>
                      <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4"/>
                    </Link>

                    <div className="movie-title">
                        <span className="value"><h1>{movie.Title}</h1></span>
                    </div>
                    <br/>

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

                    <div className="movie-description" style={{width: "95%"}}>
                        <span className="label">Description: </span>
                        <br />
                        <span className="value">{movie.Description}</span>
                    </div>
                    <br />
                    <Button onClick={e => this.addToFavorites(e)} size="sm" >
                    Add to favorites
                </Button>

                  </Media.Body>
                  <img className="movie-poster" src={movie.ImagePath} style={{height: "25rem"}}/>
                </Media>

            </Container>
            );
        }

    }


MovieView.propTypes = {
    movie: PropTypes.shape({
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
        Birth: PropTypes.string
      })
    }).isRequired
  };

 
