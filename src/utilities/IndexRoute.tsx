import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const IndexRoute = ({ component: RouteComponent, ...options }) => {
  const { user, isChecking } = useContext(AuthContext);

  return (
    <Route
      {...options}
      render={(props) => {
        if (user) {
          return <Redirect to="/daily/list" />
        } else {
          if (isChecking) {
            return <div>loading...</div>
          }

          return <RouteComponent />
        }
      }}
    />
  )
}

export default IndexRoute
