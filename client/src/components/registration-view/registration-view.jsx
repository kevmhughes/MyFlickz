import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './registration-view.scss';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    
    const newUser = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
    };

    axios
    .post('https://myflickz.herokuapp.com/users', newUser)
    .then ((response) => {
        const data = response.data;
        console.log(data);
        alert('User created successfully.');
        window.open('/', '_self');// the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch((e) => {
        console.log(e.response);
        alert('Error registering the user.');
    });
  };

  return (
  <Container className="registration-view">
    <Navbar fixed="top" variant="light" bg="light">
      <Navbar.Brand href="/">MyFlix</Navbar.Brand>
    </Navbar>
      <Row className="justify-content-center">
        <Col xs={8} sm={8} md={6} lg={4} className="form-container">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter username"
              value={username} 
              onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Enter password"
              value={password} 
              onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="Enter email"
              value={email} 
              onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
              <Form.Control 
              type="birthday" 
              placeholder="Enter date of birth"
              value={birthday} 
              onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Link to={`/client`}>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}