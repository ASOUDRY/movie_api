import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { GenreView } from './genre-view.jsx';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function GenreList(props) {
  const { genres, visibilityFilter } = props;
  let filteredGenres = genres;
  console.log(filteredGenres)

  if (visibilityFilter !== '') {
    filteredGenres = genres.filter(g => g.Name.includes(visibilityFilter));
  }

  if (!genres) return <div className="main-view"/>;

  return <div>
       <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  {filteredGenres.map(g => <GenreView key={g._id} genres={g}/>)};
  </div>
}

export default connect(mapStateToProps)(GenreList);