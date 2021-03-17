import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import {DirectorView} from '../director-view/director-view.jsx'

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function DirectorList(props) {
  const {directors, visibilityFilter} = props;
  let filteredDirectors = directors;
  console.log(filteredDirectors)

  if (visibilityFilter != '') {
    filteredDirectors = directors.filter(d => d.Name.includes(visibilityFilter))
  }

  if (!directors) return <div className="SuperDiv"/>

  return <div>
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    {/* {filteredDirectors.map(d => <DirectorView key={d._id} directors={d}/>)} */}
  </div>

}

export default connect(mapStateToProps)(DirectorList)