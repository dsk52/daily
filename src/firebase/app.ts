import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const providerTwitter = new firebase.auth.TwitterAuthProvider();
const db = firebase.firestore();
const storage = firebase.storage().ref();

const postCollection = 'posts'

export { firebase, db, storage, postCollection };
