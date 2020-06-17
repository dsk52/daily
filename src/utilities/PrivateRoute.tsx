import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../providers/AuthProvider";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  const { user, isChecking } = useContext(AuthContext);

  return (
    <Route
      {...options}
      render={(props) => {
        if (user) {
          return <RouteComponent />
        } else {

          if (isChecking) {
            return <div>loading...</div>
          }

          return <Redirect to="/" />
        }
      }}
    />
  )
}

export default PrivateRoute
