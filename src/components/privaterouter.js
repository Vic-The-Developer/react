import React, { Component } from "react";
import { Route, Redirect  } from "react-router-dom";
import { useGoogleAuth } from "../context";

const PrivateRoute = ({component: component, ...rest}) => {
    const isSignedIn = useGoogleAuth();
    return(
        <div>
            <Route {...rest} render={props =>(isSignedIn ? <Component {...props}/> : 
            <Redirect to="/login"/>)}></Route>
        </div>
    )
}

export default PrivateRoute;