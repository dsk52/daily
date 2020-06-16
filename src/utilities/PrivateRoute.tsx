import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
// import { Index } from "../pages/Index";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  const { user } = useContext(AuthContext);
  // const Component = user ? RouteComponent : Index;

  // return <Route {...options} component={Component} />

  return (
    <Route
      {...options}
      render={() =>
        user ? (
          <RouteComponent />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default PrivateRoute
