import * as React from 'react'
import { useHistory, Link } from 'react-router-dom';
import { db, postCollection } from 'firebase/app';
import { Formik, Form, Field } from 'formik'
import { Post, createPostModel } from 'models/Post';

const post = async (values: Post) => {
  try {
    await db.collection(postCollection).add(createPostModel(values))

  } catch (error) {
    console.error(error);
  }
}

const Add: React.FC = () => {
  const [isPosting, setIsPosting] = React.useState(false)
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
          setIsPosting(true)
          post(values)

          history.replace('/daily/list')
        }}
        render={formikBag => (
          <Form>
            <Field
              name="title"
              render={({ field, form, meta }) => (
                <div>
                  <label htmlFor="title">title</label>
                  <input type="text" id="title" {...field} />
                  {meta.touched && meta.error && meta.error}
                </div>
              )}
            />

            <Field
              name="body"
              render={({ field, form, meta }) => (
                <div>
                  <label htmlFor="body">body</label>
                  <textarea {...field} id="body" placeholder="" />
                  {meta.touched && meta.error && meta.error}
                </div>
              )}
            />
            <button type="submit" disabled={isPosting}>Submit</button>
          </Form>
        )}
      />
    </div>
  )
}

export { Add }
