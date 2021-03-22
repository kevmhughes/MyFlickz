import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './genre-view.scss';


export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movies, genre } = this.props;

        if (!genre) return null;

        return (
        <Container className="genre-view">
            
          <Link to="" onClick={() => history.back()}>
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4"/>
          </Link>
          
          <Media className="d-flex flex-lg-row flex-xs-column flex-sm-column">
            <Media.Body>

              <Link to={`/`}>
                <Button className="genre-movies-button" variant="primary" size="sm" >All movies</Button>
              </Link>

              <div className="genre-name">
                  <h1 className="value">{genre.Name}</h1>
              </div>
              <br />
              <div className="genre-description">
                  <span className="label">Description:</span>
              </div>
              <div className="genre-description">
                  <span className="value">{genre.Description}</span>
              </div>

            </Media.Body>
          </Media>

          <div className="genre-view">
          <br/>
          <h4 className="some-movies-genre mt-4 ml-30">Some {genre.Name.toLowerCase()} movies</h4>
            <div className="genre-movie-list d-flex row mt-3 ml-15">
              {movies.map(m => {
                if (m.Genre.Name === genre.Name) {
                  return (
                    <div key={m._id} style={{ marginRight: "15px", marginBottom: "20px" }} >
                      <Card className="cards mb-3 mr-2" style={{ width: '16rem' }} >
                        <Card.Img style={{ height: '22rem'}} variant="top" src={m.ImagePath} />
                        <Card.Body>
                        <Link to={`/movies/${m._id}`} style={{ textDecoration: "none" }}>
                          <Card.Title>{m.Title}</Card.Title>
                        </Link>
                          <Card.Subtitle className="text-muted">{m.Genre.Name}</Card.Subtitle>
                          <Card.Text>{m.Description.substring(0, 90)}...</Card.Text>
                          <Link to={`/movies/${m._id}`}>
                            <Button variant="primary" size="sm" >Read more</Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </Container>
        );
    }
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};
