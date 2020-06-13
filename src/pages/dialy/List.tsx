import * as React from 'react'
import { AuthContext } from 'providers/AuthProvider';
import { useHistory, Link } from 'react-router-dom';
import { postCollection, db } from 'firebase/app';

const fetchPosts = async () => {
  try {
    const postSnapshot = await db.collection(postCollection)
      .orderBy('created_at', 'desc')
      .limit(30)
      .get()

    const posts = []
    if (postSnapshot.empty) { return posts }
    postSnapshot.docs.map(doc => {
      posts.push(doc.data())
    })

    return posts
  } catch (error) {
    console.error(error);
  }
}

export const List: React.FC = () => {
  const [posts, setPosts] = React.useState([])
  const { signOut } = React.useContext(AuthContext);
  const history = useHistory()

  React.useEffect(() => {
    (async () => {
      const postDatas = await fetchPosts()
      setPosts(postDatas)
    })()
    return () => {
      console.log('unmount');
    }
  }, [])

  return (
    <div>
      <h2>list</h2>
      <Link to='/daily/add'>書く</Link>
      <button onClick={() => signOut(history)}>Sign out</button>

      <h2>一覧</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <div>
              <div className="title">{post.title}</div>
              <div className="body">{post.body}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
