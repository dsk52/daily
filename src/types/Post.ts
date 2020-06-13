export type Post = {
  title: string;
  body: string;
  created_at?: firebase.firestore.FieldValue;
  updated_at?: firebase.firestore.FieldValue;
}
