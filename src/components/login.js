/* global gapi */
import React, { Component, useEffect, useState } from 'react';
import './comp.css';
import {useGoogleLogin} from 'react-use-googlelogin';
import {useGoogleAuth} from '../context'
require('cors');

const clientId = '';
function Login(props){
    const {signIn} = useGoogleAuth();
    return(
        <button onClick={signIn}>Login</button>
    )
}



export default Login;
