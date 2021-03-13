import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Button, Card} from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the outer world
        // which, in this case, is 'MainView', as 'MianView' is what´s
        // connected to your database via the movies endpoint of your API
        const { movie, onClick } = this.props;
        
        return (
        <Container className="card-container">
            <Navbar fixed="top" variant="light" bg="light">
                <Navbar.Brand href="/">MyFlix</Navbar.Brand>
            </Navbar>
                <Card style={{ width: '14rem'}}>
                    <Card.Img variant="top" src={movie.ImagePath}/>
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Subtitle className="text-muted">{movie.Genre.Name}</Card.Subtitle>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Button onClick={() => onClick(movie)} variant="primary">Open</Button>
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
    onClick: PropTypes.func.isRequired
};