import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_DIRECTORS, SET_GENRES} from '../actions/actions';

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
// New Genre
function genres(state = [], action) {
  switch (action.type) {
    case SET_GENRES:
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
    directors,
    genres
});

export default moviesApp;