import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './genre-view.scss';


export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { genre } = this.props;

        if (!genre) return null;

        return (
        <Container className="genre-view">
            <Navbar fixed="top" variant="light" bg="light">
                <Navbar.Brand href="/">MyFlix</Navbar.Brand>
            </Navbar>
            <Media className="d-flex flex-lg-row flex-xs-column flex-sm-column">
                <Media.Body>
                <div className="genre-name">
                    <span className="value">{genre.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="value">{genre.Description}</span>
                </div>
        </Media.Body>
        </Media>
        </Container>
        );
    }
}
