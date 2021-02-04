import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZNRGcgMXsCmacqcyGLuknQr5fmtZrMxw",
  authDomain: "website-1-21-9f313.firebaseapp.com",
  projectId: "website-1-21-9f313",
  storageBucket: "website-1-21-9f313.appspot.com",
  messagingSenderId: "573169503564",
  appId: "1:573169503564:web:09e800250b83be58ded3e9",
  measurementId: "G-RHR50V3GWT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
