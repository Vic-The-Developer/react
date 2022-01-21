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



// class Login extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isSignedIn : false,
//         }
//     };
//     componentDidMount(){
//         console.log("Loading");
//         window.gapi.load('auth2', () => {
//             this.auth2 = gapi.auth2.init({
//                 client_id: '250874539293-jim8v3d7039nocm1lsli7a3udikua8gn.apps.googleusercontent.com',
//             });
//             this.auth2.then(() => {
//                 this.setState({
//                     isSignedIn: this.auth2.isSignedIn.get(),
//                 });
//                 var googleUser = this.auth2.currentUser.get()
//                 console.log('users info ', googleUser)
//             });
//             console.log('initiated')
//         });
//         window.gapi.load('signin2', function() {
//             // render a sign in button
//             // using this method will show Signed In if the user is already signed in
//             var opts = {
//                 width: 300,
//                 height: 50
//             }
//             gapi.signin2.render('loginButton', opts)
//         })
//         // this.callBackendAPI()
//         // .then(res => this.setState({ data: res.express }))
//         // .catch(err => console.log(err));
//     };
//     getContent() {
//         if (this.state.isSignedIn) {
//           return (
//             <div>
//                 <p>Hello user, you're signed in </p>
//                 <button onClick={this.Logout}>Logout</button>
//             </div>
//           )
//         } else {
//           return (
//             <div className='logBtn'>
//               <p>You are not signed in. Click here to sign in.</p><br/>
//               <div id="loginButton"></div>
//             </div>
//           )
//         }
      
//     }
//     Logout(){
//         window.gapi.auth2.getAuthInstance().signOut().then(function() {
//             console.log('user signed out');
//             window.location.assign('http://localhost:3000/login'); 
//         })
//     };
//     // callBackendAPI = async () => {
//     //     const response = await fetch('http://127.0.0.1:5000/api/keja-connect-backend');
//     //     const body = await response.json();
    
//     //     if (response.status !== 200) {
//     //       throw Error(body.message) 
//     //     }
//     //     return body;
//     // };
//     render(){
//         return(
//             <div>
//                 <div className='logCont'>
//                     <div className='loginSec1'>
//                         <div className='log1'>
//                             <div className='para1'>KEJA<br/>CONNECT.</div>
//                             <div className='para2'>
//                                 Login fast to be able to save your searched houses for later viewing. For the relators you will be able to list your properties there after.
//                             </div>
//                             <div className='para3'>Fast Login with your Google account</div>
//                             <img src={require('../imgs/login3.png')}/>
//                         </div>
//                     </div>
//                     <div className='loginSec2'>
//                         <div className='logHead'>Login</div>
//                         <div className='logPara'>
//                             Too many passwords? No worry, login fast through your Google Account. One step process, as simple as it is.
//                         </div>
//                         <div className='logPara2'>
//                             {this.getContent()}
//                         </div>
//                     </div>
//                 </div>
//                 {/* <p>
//                     This is the message from my server: <br/>
//                     <span>{this.state.data}</span>
//                 </p> */}
//             </div>
//         )
//     }
// }

export default Login;