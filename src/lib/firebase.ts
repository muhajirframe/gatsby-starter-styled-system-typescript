import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAP60SwcOhCj29X8aA_hD2ip45naROp9fU',
  authDomain: 'monad-configs.firebaseapp.com',
  databaseURL: 'https://monad-configs.firebaseio.com',
  messagingSenderId: '104092683837',
  projectId: 'monad-configs',
  storageBucket: 'monad-configs.appspot.com',
};

const app = firebase.initializeApp(config);

export const getFirebaseApp = () => app;
