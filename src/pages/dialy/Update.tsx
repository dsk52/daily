import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as H from 'history'
import { db, postCollection } from 'firebase/app'
import { Post, createPostModel } from 'models/Post'
import { Formik, Form, Field } from 'formik'

type Params = {
  id: string
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

const backToList = (history: H.History) => {
  history.push('/daily/list')
}

export const Update: React.FC = () => {
  const [post, setPost] = React.useState<Post>(null)
  const [isPosting, setIsPosting] = React.useState(false)
  const history = useHistory()
  const params = useParams<Params>()

  const initialValue = {title: '', body: ''}

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
      // setInitialValue(createPostModel(postDatas))
    })()
    return () => {
      setPost(null)
    }
  }, [])

  return (
    <div>
      {post != null ? (
        <>
          <div>
            <button type="button" onClick={() => backToList(history)}>一覧に戻る</button>
          </div>
          <header>
            <h1>{post.title} の編集</h1>
          </header>
          <div className="body">
          <Formik
            initialValues={initialValue}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              setIsPosting(true)
              // post(values)

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
        </>
      ) : null}
    </div>
  )
}
