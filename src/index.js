import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import the default exports from the index.js files from the given folders
import reducer from './reducers';
import middleware from './middleware';

// Create the store and
// pass the middleware as the second argument
const store = createStore(reducer, middleware);

// Wrap the App component into react-redux's context Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
