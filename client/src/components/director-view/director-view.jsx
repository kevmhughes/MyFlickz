import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './director-view.scss';


export class DirectorView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movies, director } = this.props;

        if (!director) return null;

        return (
        <Container className="director-view">

          <Link to="" onClick={() => history.back()}>
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4"/>
          </Link>

          <Media className="d-flex flex-lg-row flex-xs-column flex-sm-column">
            <Media.Body>

              <Link to={`/`}>
                <Button className="director-movies-button" variant="primary" size="sm" >All movies</Button>
              </Link>

            <div className="director-name">
              <h1 className="value">{director.Name}</h1>
            </div>
            <div className="director-dateofbirth">
              <span className="value">Born in {director.Birth}</span>
            </div>
            <br />
            <div className="director-description">
              <span className="label">Biography:</span>
              <br />
              <span className="director-bio">{director.Bio}</span>
            </div>

            </Media.Body>
          </Media>

        <div className="director-view">
        <br/>
        <h4 className=" some-movies-director mt-4 ml-30">Some movies from {director.Name}</h4>
            <div className="director-movie-list d-flex row mt-3 ml-15">
              {movies.map(m => {
                if (m.Director.Name === director.Name) {
                  return (
                    <div key={m._id} style={{ marginRight: "0px", marginBottom: "20px" }}>
                      <Card className="mb-3 mr-2" style={{ width: '16rem' }} >
                        <Card.Img style={{ height: '22rem'}} variant="top" src={m.ImagePath} />
                        <Card.Body className="movie-card-body">
                        <Link to={`/movies/${m._id}`} style={{ textDecoration: "none" }}>
                          <Card.Title style={{ height: '3rem'}}>{m.Title}</Card.Title>
                        </Link>
                          <Card.Subtitle className="text-muted">{m.Genre.Name}</Card.Subtitle>
                          <Card.Text style={{ height: '120px'}}>{m.Description.substring(0, 90)}...</Card.Text>
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

DirectorView.propTypes = {
    director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired
  
  
  };