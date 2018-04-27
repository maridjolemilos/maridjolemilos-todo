import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD-HkiLqGR5UXonhP5urcLioVDWHB6_gIY",
    authDomain: "mdjmpzorg.firebaseapp.com",
    databaseURL: "https://mdjmpzorg.firebaseio.com",
    projectId: "mdjmpzorg",
    storageBucket: "mdjmpzorg.appspot.com",
    messagingSenderId: "239222126822"
 };

firebase.initializeApp(config);

 export default firebase;
