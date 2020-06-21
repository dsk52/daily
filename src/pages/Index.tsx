import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useHistory } from 'react-router-dom';
import { Container } from "../components/container";

export const Index = () => {
  const {loginWithTwitter} = useContext(AuthContext);
  const history = useHistory()

  return (
    <Container>
      <h2>Index</h2>
      <button onClick={() => loginWithTwitter(history)}>Twitter Login</button>
    </Container>
  )
}

