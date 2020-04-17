import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import App from './_framework';
import * as serviceWorker from './serviceWorker';

import onboard from './_modules/onboard';
import chatModule from './_modules/chat';
import profileModule from './_modules/profile';
import homeModule from './_modules/home';

const firebaseConfig = {
  apiKey: "AIzaSyCIcgUt_Q1a-lGmG5457DC_EN0vlBn4XT8",
  authDomain: "fight-record-dev.firebaseapp.com",
  databaseURL: "https://fight-record-dev.firebaseio.com",
  projectId: "fight-record-dev",
  storageBucket: "fight-record-dev.appspot.com",
  messagingSenderId: "1042678923512",
  appId: "1:1042678923512:web:d642c40a462ed549d47b0d",
  measurementId: "G-GPXXHRVMR8"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render((
  <App
    modules={[
      chatModule,
      homeModule,
      profileModule
    ]}
    renderOnboarder={onboard}
  />
), document.getElementById('root'));

serviceWorker.unregister();
