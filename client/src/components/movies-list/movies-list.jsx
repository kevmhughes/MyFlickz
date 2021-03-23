import React from 'react';
import { connect } from 'react-redux';
import { Row, Container } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <Container className="movies-list-view" style={{ paddingTop: "70px", maxWidth: "1410px" }}>
    <Row className="filter-input-styling">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Row>
    <div  className="movies-list">
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
    </div>
    </Container>
}

export default connect(mapStateToProps)(MoviesList);

