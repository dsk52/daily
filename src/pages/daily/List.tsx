import * as React from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import { useHistory, Link } from 'react-router-dom';
import { postCollection, db } from '../../firebase/apps';
import { Post } from '../../models/Post';
import { Container } from '../../components/container';

const fetchPosts = async (user) => {
  try {
    const postSnapshot = await db.collection(postCollection)
      .where('author_id', "==", user.uid)
      .orderBy('created_at', 'desc')
      .limit(30)
      .get()

    const posts = []
    if (postSnapshot.empty) { return posts }
    postSnapshot.docs.map(doc => {
      if (!doc.exists) { return }

      const data = doc.data()
      data.id = doc.id

      posts.push(data)
    })

    return posts
  } catch (error) {
    console.error(error);
  }
}

export const List: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([])
  const { user, signOut } = React.useContext(AuthContext);
  const history = useHistory()

  React.useEffect(() => {
    (async () => {
      const postDatas = await fetchPosts(user)
      setPosts(postDatas)
    })()
    return () => {
      setPosts([]);
    }
  }, [])

  return (
    <Container>
      <header>
        <div className="flex flex-wrap justify-between">
          <div className="w-2/5">
            <h1>一覧</h1>
          </div>

          <div className="w-2/5 text-right">
            <Link className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" to='/daily/add'>書く</Link>
            <button className="bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => signOut(history)}>ログアウト</button>
          </div>
        </div>
      </header>
      <div className="body">
        <ul className="post-list space-y-3">
          {posts.map((post: Post) => (
            <li className="shadow px-5 py-4" key={post.id}>
              <div>
                <div className="title">
                  <Link to={`/daily/detail/${post.id}`}>
                    {post.title}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
