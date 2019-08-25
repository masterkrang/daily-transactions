import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import { Grommet } from 'grommet';

const firebaseConfig = {
  apiKey: "AIzaSyC_ncUjfwVo3Y_FgHHD7hkX3-zuEvyTkBM",
  authDomain: "daily-transactions-58c7e.firebaseapp.com",
  databaseURL: "https://daily-transactions-58c7e.firebaseio.com",
  projectId: "daily-transactions-58c7e",
  storageBucket: "daily-transactions-58c7e.appspot.com",
  messagingSenderId: "44563459078",
  appId: "1:44563459078:web:a9ec48e43d1f1fd4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
