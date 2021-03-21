import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the outer world
        // which, in this case, is 'MainView', as 'MianView' is what´s
        // connected to your database via the movies endpoint of your API
        const { movie } = this.props;
        
        return (
        <Container className="card-container">
                <Card style={{ width: '14rem'}}>
                    <Card.Img style={{ height: '18rem'}} variant="top" src={movie.ImagePath}/>
                    <Card.Body>
                      <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
                        <Card.Title style={{ height: '3rem'}}>{movie.Title}</Card.Title>
                      </Link>
                        <Card.Subtitle className="text-muted">{movie.Genre.Name}</Card.Subtitle>
                        <Card.Text style={{ height: '120px'}}>{movie.Description.substring(0, 90)}...</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="primary" size="sm">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
        </Container>
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
        Description: PropTypes.string.isRequired
      }),
    }).isRequired,
};