import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

/**
 * returns a state that can be changed by a action
 * @function visibilityFilter
 * @param {string} state 
 * @param {object} action 
 * @returns {state}
 */
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}
/**
 * returns a state that can be changed by a action
 * @function movies
 * @param {object} state 
 * @param {object} action 
 * @returns {state}
 */
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}
/**
 * returns a state that can be changed by a action
 * @function users
 * @param {object} state 
 * @param {object} action 
 * @returns {state}
 */
function users(state = [], action) {
  switch (action.type) {
    case SET_USER:
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
    users
});

export default moviesApp;