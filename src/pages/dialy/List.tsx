import * as React from 'react'
import { AuthContext } from 'providers/AuthProvider';
import { useHistory, Link } from 'react-router-dom';

export const List: React.FC = () => {
  const { signOut } = React.useContext(AuthContext);
  const history = useHistory()
  console.log('list');

  return (
    <div>
      <h2>list</h2>
      <button onClick={() => signOut(history)}>Sign out</button>
    </div>
  )
}
