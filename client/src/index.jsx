import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView  from './components/main-view/main-view';
import moviesApp from './reducers/reducers';
import 'tachyons';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';
// creates a store
const store = createStore(moviesApp);

store.subscribe(() => console.log(store.getState()))

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <MainView/>
    </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);