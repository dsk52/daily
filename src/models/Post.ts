import { firebase } from '../firebase/apps'

export type Post = {
  id?: string;
  author_id?: string;
  title: string;
  body: string;
  created_at?: firebase.firestore.FieldValue;
  updated_at?: firebase.firestore.FieldValue;
}

type json = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const createPostModel = (data: json): Post => {
  return {
    id: data.id,
    author_id: data.author_id,
    title: data.title,
    body: data.body,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    updated_at: firebase.firestore.FieldValue.serverTimestamp(),
  }
}

export const updatePostModel = (data: json): Post => {
  return {
    title: data.title,
    body: data.body,
    updated_at: firebase.firestore.FieldValue.serverTimestamp(),
  }
}

export const initialPost: Post = {
  id: '',
  title: '',
  body: ''
}
