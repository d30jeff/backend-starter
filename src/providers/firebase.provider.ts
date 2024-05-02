import firebase from 'firebase-admin';

const admin = firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
});

export { admin };
