import {initializeApp} from "firebase/app";
import {getFirestore,serverTimestamp} from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBJgQ_SbICUHKiEToJyZ8EZSP-RoZriLus",
    authDomain: "vue-blog-8855a.firebaseapp.com",
    projectId: "vue-blog-8855a",
    storageBucket: "vue-blog-8855a.appspot.com",
    messagingSenderId: "3871107586",
    appId: "1:3871107586:web:8e3ca3ba56f286eee1d51b"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  let auth = getAuth(app);
  export {db,serverTimestamp,auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut};