import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBeKDzZFTabU_sAZuYlEn7Y2XtAL9NCQAM',
  authDomain: 'messenger-9dfe9.firebaseapp.com',
  databaseURL: 'https://messenger-9dfe9.firebaseio.com',
  projectId: 'messenger-9dfe9',
  storageBucket: 'messenger-9dfe9.appspot.com',
  messagingSenderId: '509151369315',
  appId: '1:509151369315:web:f3173ddfd384cbb99c4056',
});

export const db = firebaseApp.firestore();
