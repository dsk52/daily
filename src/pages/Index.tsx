import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from 'react-router-dom';

export const Index = () => {
  const {loginWithTwitter} = useContext(AuthContext);
  const history = useHistory()

  return (
    <div>
      <h2>Index</h2>
      <button onClick={() => loginWithTwitter(history)}>Twitter Login</button>
    </div>
  )
}

