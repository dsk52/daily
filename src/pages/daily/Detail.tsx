import * as React from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import { postCollection, db } from '../../firebase/apps';
import { Post, createPostModel } from '../../models/Post';
import * as H from 'history'
import { Container } from '../../components/container';
import { AuthContext } from '../../providers/AuthProvider';

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
  const { user } = React.useContext(AuthContext);
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
    <Container>
      {post != null ? (
        <>
          <header>
            <div className="flex flex-wrap justify-between">
              <div className="w-2/5">
                <button className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => backToList(history)}>一覧へ</button>
              </div>
              <div className="w-2/5 text-right">
                {post.author_id == user.uid ? (
                <>
                  <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => update(params.id, history)}>編集</button>
                  <button className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => del(params.id, history)}>削除</button>
                </>
                ) : null}
              </div>
            </div>
            <h1>{post.title}</h1>
          </header>
          <div className="body">
            <div className="whitespace-pre-wrap">
              {post.body}
            </div>
          </div>
        </>
      ) : null}
    </Container>
  )
}
