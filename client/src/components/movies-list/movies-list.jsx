import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.css';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;
  // console.log(filteredMovies);

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="SuperDiv"/>;

  return <div className="movies-list">
  <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
  </div>
}

export default connect(mapStateToProps)(MoviesList)