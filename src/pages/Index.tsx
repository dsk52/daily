import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from 'react-router-dom';
import { Container } from "../components/container";

export const Index: React.FC = () => {
  const {loginWithTwitter} = useContext(AuthContext);
  const history = useHistory()

  return (
    <Container>
      <h2>Index</h2>
      <button className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => loginWithTwitter(history)}>Twitter Login</button>
    </Container>
  )
}

