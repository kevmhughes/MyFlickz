import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Row, Col, Form, Media, Button } from 'react-bootstrap';
import './movie-view.scss';


export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <Container className="movie-view">
                <Navbar fixed="top" variant="light" bg="light">
                    <Navbar.Brand href="/">MyFlix</Navbar.Brand>
                </Navbar>
                <Media className="d-flex flex-lg-row flex-xs-column flex-sm-column">
                <img className="movie-poster" src={movie.ImagePath}/>
                <Media.Body>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <br />
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <br />
                    <span className="value">{movie.Description}</span>
                </div>
                <br />
                <div
          className="movie-go-back"
          onClick={() => onClick()}
        ><Button variant='primary'>Back</Button></div>
        </Media.Body>
        </Media>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.exact({
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string
      })
    }).isRequired
  };