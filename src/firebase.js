import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAUK6dQCybrVfX1OG8sXPtbKybSaTo5qgs",
    authDomain: "wechat-messenger-f02d3.firebaseapp.com",
    projectId: "wechat-messenger-f02d3",
    storageBucket: "wechat-messenger-f02d3.appspot.com",
    messagingSenderId: "839506948173",
    appId: "1:839506948173:web:b60b93a607fd44e7ee6c04"
  }).auth();

// export { auth,provider,storage};
// export default db;