/* global gapi */
import React, { Component, useEffect, useState } from 'react';
import './comp.css';
import {useGoogleLogin} from 'react-use-googlelogin';
import {useGoogleAuth} from '../context'
require('cors');

const clientId = '250874539293-jim8v3d7039nocm1lsli7a3udikua8gn.apps.googleusercontent.com';
function Login(props){
    const {signIn} = useGoogleAuth();
    return(
        <button onClick={signIn}>Login</button>
    )
}



export default Login;
