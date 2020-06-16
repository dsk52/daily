import firebase from 'firebase/app';

import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
export const providerTwitter = new firebase.auth.TwitterAuthProvider();

const db = firebase.firestore();
const postCollection = 'posts'

export { firebase, db, postCollection };
