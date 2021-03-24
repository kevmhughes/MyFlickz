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
  const [ validated, setValidated ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday, validated);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
    
          {setValidated(true)}

        }
    
    axios
    .post('https://myflickz.herokuapp.com/users', 
    {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
  })
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

    <Row>
        <Col xs={{ offset: 1 }} sm={{ offset: 0 }} md={{ offset: 0 }} lg={{ offset: 0 }}>
          <h1>Register for MyFlix</h1>
          <br/>
        </Col>
    </Row>

      <Row className="justify-content-center">
        <Col xs={8} sm={8} md={6} lg={4} className="form-container">
          <Form noValidate validated={setValidated}
              onSubmit={handleSubmit}>
            
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              size="sm"
              type="text" 
              placeholder="Enter username"
              value={username} 
              required minLength={5} pattern="[a-zA-Z0-9]+"
              onChange={e => setUsername(e.target.value)} />
              <Form.Control.Feedback type="invalid">
              Username must be alphanumeric and include at least 5 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              size="sm"
              type="password" 
              placeholder="Enter password"
              value={password} 
              required minLength={5} 
              onChange={e => setPassword(e.target.value)} />
              <Form.Control.Feedback type="invalid">
              Password must include at least 5 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              size="sm"
              type="email" 
              placeholder="Enter email"
              value={email} 
              required
              onChange={e => setEmail(e.target.value)} />
              <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control 
                size="sm"
                type="date" 
                placeholder="Enter date of birth"
                value={birthday} 
                onChange={e => setBirthday(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                Please provide a valid date (e.g. 01/01/1970)
              </Form.Control.Feedback>
            </Form.Group>

            <Link to={`/client`}>
              <Button 
                variant="primary" 
                size="sm" 
                style={{ float: "right"}}
                onClick={handleSubmit}>
                Register
              </Button>
            </Link>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}