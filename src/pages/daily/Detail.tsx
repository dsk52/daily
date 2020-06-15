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

const deletePost = async(id: string) => {
  try {
    const postSnapshot = await db.collection(postCollection)
      .doc(id)
      .get()

    if (!postSnapshot.exists) { return }

    // TODO 自分の投稿か確認を追加

    await db.collection(postCollection)
      .doc(id)
      .delete()

  } catch (error) {
    console.error(error);
  }
}

const backToList = (history: H.History) => {
  history.push('/daily/list')
}

const update = (id: string, history: H.History) => {
  history.push(`/daily/update/${id}`)
}

const del = (id: string, history: H.History) => {
  (async () => {
    await deletePost(id)
    backToList(history)
  })()
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
            <button type="button" onClick={() => update(params.id, history)}>編集</button>
            <button type="button" onClick={() => del(params.id, history)}>削除</button>
          </div>
          <header>
            <h1>{post.title}</h1>
          </header>
          <div className="body">
            {post.body}
          </div>
        </>
      ) : null}
    </div>
  )
}
