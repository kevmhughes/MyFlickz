import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
            <Navbar fixed="top" variant="light" bg="light">
                <Navbar.Brand href="/">MyFlix</Navbar.Brand>
            </Navbar>
            <Media className="d-flex flex-lg-row flex-xs-column flex-sm-column">
                <Media.Body>
                <div className="director-name">
                    <span className="value">{director.Name}</span>
                </div>
                <div className="director-description">
                    <span className="value">{director.Bio}</span>
                </div>
                <Link to={`/`}>
                <Button variant='primary'>Back</Button>
              </Link>
        </Media.Body>
        </Media>
        </Container>
        );
    }
}
