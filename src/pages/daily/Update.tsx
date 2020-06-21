import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as H from 'history'
import { firebase, db, postCollection } from '../../firebase/apps'
import { Post, createPostModel, initialPost } from '../../models/Post'
import { Formik, Form, Field } from 'formik'
import { Container } from '../../components/container'

type Params = {
  id: string
}

const update = async (id: string, values: Post) => {
  try {
    const post = await db.collection(postCollection).doc(id)
    post.update({
      'title': values.title,
      'body': values.body,
      'updated_at': firebase.firestore.FieldValue.serverTimestamp(),
    })
  } catch (error) {
    console.error(error);
  }
}

const fetchPost = async(id: string) => {
  try {
    const postSnapshot = await db.collection(postCollection)
      .doc(id)
      .get()

    let post: Post = null
    if (!postSnapshot.exists) { return post }
    post = createPostModel(postSnapshot.data())

    return post
  } catch (error) {
    console.error(error);
  }
}

const backToDetail = (id: string, history: H.History) => {
  history.push(`/daily/detail/${id}`)
}

export const Update: React.FC = () => {
  const [post, setPost] = React.useState<Post>(null)
  const [initialValue, setInitialValue] = React.useState<Post>(initialPost)
  const [isPosting, setIsPosting] = React.useState(false)
  const history = useHistory()
  const params = useParams<Params>()

  React.useEffect(() => {
    if (!params.id) {
      history.replace('/daily/list')
    }

    (async () => {
      const postDatas = await fetchPost(params.id)
      if (!postDatas) {
        history.replace('/daily/list')
      }
      setPost(postDatas)
      setInitialValue(createPostModel(postDatas))
    })()
    return () => {
      setPost(null)
    }
  }, [])

  return (
    <Container>
      {post != null ? (
        <>
          <header>
            <div>
              <button className="bg-grey-300 hover:bg-grey-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => backToDetail(params.id, history)}>戻る</button>
            </div>
            <h1>{post.title} の編集</h1>
          </header>

          <div className="body">
            <Formik
              enableReinitialize
              initialValues={initialValue}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                setIsPosting(true)
                update(params.id, values)

                history.replace(`/daily/detail/${params.id}`)
              }}
          >
            {(formikBag) => (
              <Form>
                <Field name="title">
                  {({field, form, meta}) => (
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">title</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="title" required {...field} />
                      {meta.touched && meta.error && meta.error}
                    </div>
                  )}
                </Field>

                <Field name="body" >
                  {({field, form, meta}) => (
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">body</label>
                      <textarea className="resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="body" required rows="10" {...field} placeholder="" />
                      {meta.touched && meta.error && meta.error}
                    </div>
                  )}
                </Field>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isPosting}>Submit</button>
              </Form>
            )}
            </Formik>
          </div>
        </>
      ) : null}
    </Container>
  )
}
