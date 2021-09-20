
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';


  const firebaseConfig = {
    apiKey: "AIzaSyBhsszgeWhHVRqk7csPprJLmf77rhLQH20",
    authDomain: "project-ab96c.firebaseapp.com",
    databaseURL: "https://project-ab96c-default-rtdb.firebaseio.com",
    projectId: "project-ab96c",
    storageBucket: "project-ab96c.appspot.com",
    messagingSenderId: "944129370498",
    appId: "1:944129370498:web:a80eb69a931460ed11c79b"
  };


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }




