import * as React from 'react'
import { useHistory, Link } from 'react-router-dom';
import { db, postCollection } from '../../firebase/apps';
import { Formik, Form, Field } from 'formik'
import { Post, createPostModel, initialPost } from '../../models/Post';
import { Container } from '../../components/container';
import { AuthContext } from '../../providers/AuthProvider';

const post = async (values: Post) => {
  try {
    await db.collection(postCollection).add(createPostModel(values))

  } catch (error) {
    console.error(error);
  }
}

const Add: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const [isPosting, setIsPosting] = React.useState(false)
  const history = useHistory()

  const initialValue: Post = initialPost
  const today = new Date()
  const dateFormat = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`
  initialPost.title = dateFormat

  return (
    <Container>
      <header>
        <Link className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" to='/daily/list'>一覧へ</Link>

        <h1>新規作成</h1>
      </header>

      <div className="body">
        <Formik
          initialValues={initialValue}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            setIsPosting(true)

            values.author_id = user.uid
            post(values)

            history.replace('/daily/list')
          }}
        >
          {(formikBag) => (
          <Form>
            <Field name="title">
              {({field, form, meta}) => (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">タイトル</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="title" required {...field} />
                  {meta.touched && meta.error && meta.error}
                </div>
              )}
            </Field>

            <Field name="body" >
              {({field, form, meta}) => (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">内容</label>
                  <textarea className="resize-y shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="body" required rows="10" {...field} placeholder="" />
                  {meta.touched && meta.error && meta.error}
                </div>
              )}
            </Field>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isPosting}>作成</button>
          </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export { Add }
