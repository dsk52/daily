import * as React from 'react'
import { useHistory, Link } from 'react-router-dom';
import { db, postCollection } from 'firebase/app';
import { firebase } from '../../firebase/app';

const post = async (history) => {
  try {
    await db.collection(postCollection).add({
      'author_id': 1,
      'title': '',
      'body': '',
      'created_at': firebase.firestore.FieldValue.serverTimestamp(),
      'updated_at': firebase.firestore.FieldValue.serverTimestamp(),
    })

    history.replace('/daily/list')
  } catch (error) {
    console.error(error);
  }
}

const Add: React.FC = () => {
  const history = useHistory()

  return (
    <div>
      <h2>Add</h2>
      <Link to='/daily/list'>トップへ</Link>
      <button type='button' onClick={() => post(history)}>書く</button>
    </div>
  )
}

export { Add }
