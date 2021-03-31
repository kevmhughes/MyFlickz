import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflickz.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
      window.open('/client', '_self');// the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      alert('that user does not exist');
    });
  };

  return (
    <Container className="login-view">

      <Navbar 
        className="d-flex justify-content-between" 
        fixed="top" 
        variant="light" 
        bg="light">
        <Navbar.Brand href="/">MyFlickz</Navbar.Brand>
      </Navbar>

    <Row className="justify-content-center">
      <Row>
        <Col style={{width: "250px"}}>
        <h1>User Login</h1>
        <br/>
        </Col>
      </Row>

        <Col className="form-container">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Control 
                className ="login-input"
                type="username" 
                size="sm"
                placeholder="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control 
                className ="login-input"
                type="password" 
                size="sm"
                placeholder="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            <Button 
              className="login-button"
              variant="primary"
              onClick={handleSubmit}>
              Log in
            </Button>
            <br/>
            <br/>
            <span style={{width: "100%"}}>
              Not registered? <a href='/client/users' style={{textDecoration: "none"}}>Create an account</a>
            </span>
          
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
