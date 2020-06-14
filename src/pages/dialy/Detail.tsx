import * as React from 'react'
import { postCollection, db } from 'firebase/app';
import { Post, createPostModel } from 'models/Post';
import { useHistory, useParams } from 'react-router-dom';
import * as H from 'history'

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

export const Detail: React.FC = () => {
  const [post, setPost] = React.useState<Post>(null)
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
            <h1>{post.title}</h1>
          </header>
          <div className="body">
            {post.title}
          </div>
        </>
      ) : null}
    </div>
  )
}
