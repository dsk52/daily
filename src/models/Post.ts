import { firebase } from '../firebase/app'

export type Post = {
  title: string;
  body: string;
  created_at?: firebase.firestore.FieldValue;
  updated_at?: firebase.firestore.FieldValue;
}

export const createPostModel = (data): Post => {
  return {
    title: data.title,
    body: data.body,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    updated_at: firebase.firestore.FieldValue.serverTimestamp(),
  }
}
