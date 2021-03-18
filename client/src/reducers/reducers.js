import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_DIRECTORS} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

// New Reducer
function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.value;
      default:
        return state;
  }
}
// Added function
// both functions trigger from this variabl
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    users,
    directors
});

export default moviesApp;