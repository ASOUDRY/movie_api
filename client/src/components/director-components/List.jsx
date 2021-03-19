// import React from 'react';
// import { connect } from 'react-redux';

// import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
// import {Test} from './View.jsx'

// const mapStateToProps = state => {
//   const { visibilityFilter } = state;
//   return { visibilityFilter };
// };

// function List2(props) {
//   const {directors, visibilityFilter} = props;
//   console.log(directors);
//   let filteredDirectors = directors;
//   console.log(filteredDirectors);
  
//   if (visibilityFilter != '') {
//     filteredDirectors = directors.filter(d => d.Name.includes(visibilityFilter))
//   }

//   if (!directors) return <div className="SuperDiv"/>

//   return  <div>
//     <VisibilityFilterInput visibilityFilter={visibilityFilter} />
//     {filteredDirectors.map(d => <Test key={d._id} director={d}/>)}
//   </div>
// }

// export default connect(mapStateToProps)(List2)


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
  console.log(filteredDirectors)

  if (visibilityFilter !== '') {
    filteredDirectors = directors.filter(d => d.Name.includes(visibilityFilter));
  }

  if (!directors) return <div className="main-view"/>;

  return <div>
       <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  {filteredDirectors.map(d => <DirectorView key={d._id} director={d}/>)};
  </div>
}

export default connect(mapStateToProps)(DirectorList);