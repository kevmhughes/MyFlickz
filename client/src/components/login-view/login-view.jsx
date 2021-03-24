import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
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
    })
    .catch(e => {
      console.log('that user does not exist');
    });
  };

  return (
    <Container className="login-view">

      <Navbar 
        className="d-flex justify-content-between" 
        fixed="top" 
        variant="light" 
        bg="light">
          <Navbar.Brand href="/">MyFlix</Navbar.Brand>
          <Nav>
            <Button href='/users' size="sm">Sign up</Button>
          </Nav>
      </Navbar>

      <Row>
        <Col xs={{ offset: 1 }} sm={{ offset: 0 }} md={{ offset: 0 }} lg={{ offset: 0 }}>
        <h1>Log in to MyFlix</h1>
        <br/>
        </Col>
      </Row>

      <Row className="justify-content-center">
        
        <Col xs={8} sm={8} md={6} lg={4} className="form-container">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="username" 
                size="sm"
                placeholder="Enter username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                size="sm"
                placeholder="Enter password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            <Button 
              style={{ float: "right" }} 
              variant="primary" 
              size="sm" 
              onClick={handleSubmit}>
              Log in
              </Button>
          
          </Form>
        </Col>
      </Row>
    </Container>
  );
}