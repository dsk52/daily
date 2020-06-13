import * as React from 'react'
import { useHistory, Link } from 'react-router-dom';
import { db, postCollection } from 'firebase/app';
import { firebase } from '../../firebase/app';
import { Formik, Form, Field } from 'formik'
import { Post } from 'types/Post';

const post = async (values: Post, history) => {
  try {
    await db.collection(postCollection).add({
      'author_id': 1,
      'title': values.title,
      'body': values.body,
      'created_at': firebase.firestore.FieldValue.serverTimestamp(),
      'updated_at': firebase.firestore.FieldValue.serverTimestamp(),
    })

    history.replace('/daily/list')

  } catch (error) {
    console.error(error);
  }
}

const Add: React.FC = () => {
  const initialValue: Post = { title: '', body: '' }
  const history = useHistory()

  return (
    <div>
      <h2>Add</h2>
      <Link to='/daily/list'>トップへ</Link>

      <Formik
        initialValues={initialValue}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          post(values, history)
        }}
        render={formikBag => (
          <Form>
            <Field
              name="title"
              render={({ field, form, meta }) => (
                <div>
                  <input type="text" {...field} />
                  {meta.touched && meta.error && meta.error}
                </div>
              )}
            />

            <Field
              name="body"
              render={({ field, form, meta }) => (
                <div>
                  <textarea {...field} placeholder="" />
                  {meta.touched && meta.error && meta.error}
                </div>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  )
}

export { Add }
