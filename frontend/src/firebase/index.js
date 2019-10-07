import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
require('firebase/auth');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB0iw2VunD_Nbg_mp2LaR91guLxF5L3KIQ",
    authDomain: "sut523495-clubmanage.firebaseapp.com",
    databaseURL: "https://sut523495-clubmanage.firebaseio.com",
    projectId: "sut523495-clubmanage",
    storageBucket: "sut523495-clubmanage.appspot.com",
    messagingSenderId: "379608150322",
    appId: "1:379608150322:web:a8844aeb63a848283da72b"
};
firebase.initializeApp(config);

const storage = firebase.storage();
const auth = firebase.auth();
//const logout = firebase.auth().signOut()
export {
    storage, auth, firebase as default
}
