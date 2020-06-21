import * as React from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import { useHistory, Link } from 'react-router-dom';
import { postCollection, db } from '../../firebase/apps';
import { Post } from '../../models/Post';
import { Container } from '../../components/container';

const fetchPosts = async () => {
  try {
    const postSnapshot = await db.collection(postCollection)
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
    console.log('list');

    (async () => {
      const postDatas = await fetchPosts()
      setPosts(postDatas)
    })()
    return () => {
      setPosts([]);
    }
  }, [])

  return (
    <Container>
      <header>
        <h1>一覧</h1>
        <Link to='/daily/add'>書く</Link>
      </header>
      <div className="body">
        <button onClick={() => signOut(history)}>Sign out</button>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
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
