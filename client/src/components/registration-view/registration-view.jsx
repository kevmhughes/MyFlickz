import React from "react";
import { Navbar, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./registration-view.scss";
import { Link } from "react-router-dom";

export class RegistrationView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    let data = Object.assign({}, this.state);

    this.setState({ [e.target.name]: e.target.value });
    console.log("data: ", data);
  }

  handleSubmit(e) {
    e.preventDefault();

    //handles form validation
    console.log(this.state);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({ validated: true });
    }
    // notify that fields were validated,
    // therefore feedback can be shown
    // (otherwise it will appear at page load)

    axios
      .post("/users", {
        Username: this.state.username,
        Password: this.state.password,
        Email: this.state.email,
        Birthday: this.state.birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("User profile created successfully. Proceed to log in.");
        window.open("/client", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log(e.response);
        alert("Error registering the user");
      });
  }

  render() {
    return (
      <Container className="registration-view">
        <Navbar fixed="top" variant="light" bg="light">
          <Navbar.Brand href="/client/users">MyFlickz</Navbar.Brand>
        </Navbar>

        <div className="registration-view">
          <Row className="justify-content-center">
            <Col className="form-container">
              <Row>
                <Col>
                  <h1>Create Account</h1>
                  <br />
                </Col>
              </Row>

              <Form
                noValidate
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
              >
                <Form.Group controlId="formBasicUsername">
                  <Form.Control
                    className="registration-input"
                    size="sm"
                    type="text"
                    name="username"
                    value={this.username}
                    onChange={this.changeHandler}
                    required
                    minLength={5}
                    pattern="[a-zA-Z0-9]+"
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    Username must be alphanumeric and include at least 5
                    characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    className="registration-input"
                    size="sm"
                    type="password"
                    name="password"
                    value={this.password}
                    onChange={this.changeHandler}
                    required
                    minLength={5}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must include at least 5 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    className="registration-input"
                    size="sm"
                    type="email"
                    name="email"
                    value={this.email}
                    onChange={this.changeHandler}
                    required
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicBirthday">
                  <Form.Control
                    className="registration-input"
                    size="sm"
                    type="date"
                    name="birthday"
                    value={this.birthday}
                    onChange={this.changeHandler}
                    required
                    pattern="^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$"
                    placeholder="Enter birthday (e.g. 1970/02/31)"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date (e.g. yyyy/mm/dd)
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="button">
                  <Button
                    className="registration-button"
                    size="sm"
                    style={{ float: "right" }}
                    variant="primary"
                    type="submit"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    Register
                  </Button>
                </div>
                <br />
                <br />
                <Row>
                  <span style={{ width: "100%", marginTop: "15px" }}>
                    Already registered?{" "}
                    <a href="/client" style={{ textDecoration: "none" }}>
                      Log in
                    </a>
                  </span>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
