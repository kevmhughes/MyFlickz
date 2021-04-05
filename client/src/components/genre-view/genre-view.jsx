import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Container, Media, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import './genre-view.scss';


export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {

          user: {},
          favoriteMovies: [],
          
        };
        
    }

    componentDidMount() {
      this.mounted = true;
      let accessToken = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      if (accessToken !== null) {
        this.getUserData(accessToken);
      }
    }



    getUserData(token) {
      axios.get(`https://myflickz.herokuapp.com/users/${localStorage.getItem("user")}`, 
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          // assign the result to the state
          this.setState({
            user: response.data,
            favoriteMovies: response.data.FavoriteMovies
            
          });
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };


    goBack = () => {
      window.history.go(-1);
      if (
        window.location.pathname === '/' ||
        (window.history.state && window.history.state.key)
      ) {
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.goBack();
      }, 100);
    };

    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.mounted = false;
      this.setState = (state,callback)=>{
          return;
      };
  }

    render() {
        const { movies, genre } = this.props;

        if (!genre) return null;

        return (
        <Container className="genre-view">
            
            <a onClick={this.goBack} >
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2 mr-sm-4 go-back"/>
            </a>
          
          <Media className="d-flex flex-lg-row flex-xs-column flex-sm-column">
            <Media.Body>

              <Link to={`/`}>
                <Button className="genre-movies-button" size="sm" variant="outline-primary">All movies</Button>
              </Link>

              <div className="genre-name">
                  <h1 className="value">{genre.Name}</h1>
              </div>
              <br />
              <div className="genre-description">
                  <span className="label">Description:</span>
              </div>
              <div className="genre-description">
                  <span className="value">{genre.Description}</span>
              </div>

            </Media.Body>
          </Media>

          <div className="genre-view">
          <br/>
          <h4 className="some-movies-genre mt-4 ml-30">Some {genre.Name.toLowerCase()} movies</h4>
            <div className="genre-movie-list d-flex row mt-3 ml-15">
              {movies.map(m => {
                if (m.Genre.Name === genre.Name) {
                  return (
                    <div key={m._id} style={{ marginRight: "0px", marginBottom: "20px" }} >
                      <Card className="genre-card-body mb-3 mr-2">
                        <Card.Img className="card-image-height" variant="top" src={m.ImagePath} />
                        <Card.Body className="movie-card-body">
                        <Card.Title style={{ height: '3rem'}}><Link to={`/movies/${m._id}`} style={{ textDecoration: "none" }}>{m.Title}</Link><span className="value" >{this.state.favoriteMovies.includes(m._id) 
                          ? <FontAwesomeIcon icon={faStar} style={{color: "orange", height: "15px", marginBottom: "3px"}}/> 
                          : "" }</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted"><Link to={`/genres/${m.Genre.Name}`} style={{ textDecoration: "none" }}>{m.Genre.Name}</Link></Card.Subtitle>
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

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};