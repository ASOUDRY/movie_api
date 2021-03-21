// import { response } from 'express';
import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { DirectorView } from './director-view.jsx';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function DirectorList(props) {
  const { directors, visibilityFilter } = props;
  let filteredDirectors = directors;
  // console.log(filteredDirectors)

  if (visibilityFilter !== '') {
    filteredDirectors = directors.filter(d => d.Name.includes(visibilityFilter));
  }

  // this is the problem
  function test(test) {
    console.log(test)
  }

  if (!directors) return <div className="main-view"/>;

  return <div>
       <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  {filteredDirectors.map(d => <DirectorView key={d._id} director={d} test={test => this.test(test)}/>)};
  </div>
}

export default connect(mapStateToProps)(DirectorList);