import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import QueryContainer from './js/components/container/QueryContainer';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA7hJ3vZSjJB0l_snwy0pOJImHuzT2dXVA',
  authDomain: 'travbase-dev.firebaseapp.com',
  databaseURL: 'https://travbase-dev.firebaseio.com',
  projectId: 'travbase-dev',
  storageBucket: 'travbase-dev.appspot.com',
  messagingSenderId: '264009264782',
};
firebase.initializeApp(config);

const wrapper = document.getElementById('formm');
wrapper ? ReactDOM.render(<QueryContainer />, wrapper) : false;
