import React from 'react';
import {
    Route,
    Redirect, 
  } from "react-router-dom";
    
interface stateType {
    path: string; 
    authenticated: boolean;
    currentUser: any;
    component: any;
}

const PrivateRoute: React.FC<stateType> = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )  
};
  
export default PrivateRoute;