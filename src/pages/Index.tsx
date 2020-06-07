import React, { useContext } from "react";
import { AuthContext } from "providers/AuthProvider";
import { useHistory } from 'react-router-dom';

const Index: React.FC = () => {
  const { user, loginWithTwitter } = useContext(AuthContext);
  const history = useHistory()

  return (
    <div>
      <h2>Index</h2>
      <button onClick={() => loginWithTwitter(history)}>Twitter Login</button>
    </div>
  )
}

export { Index }
