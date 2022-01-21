/* global gapi */
//This is the landing page inclusive of Navbar and main page section
//The rest will be in form off components including the footer

// import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Redirect, Switch} from 'react-router-dom';
import Home from './components/home';
import Search from './components/search';
import Account from './components/account';
import About from './components/about';
import View from './components/view-in-detail';
import Contact from './components/contact';
import Advertise from './components/advertise';
import Login from './components/login';
import { useGoogleAuth } from './context';
import PrivateRoute from './components/privaterouter';
require('cors');


class App extends Component{
  constructor(props){
    super(props);
  };
  render() {
    return (
      <Router>
        <div class="d-inline-flex navbar">
          <div class="p-2 logo">Logo</div>
          <div class="p-2">
            <Link to='/' style={{color: 'white', textDecoration: 'none'}}>HOME</Link>
          </div>
          <div class="p-2">
            <Link to='/search' style={{color: 'white', textDecoration: 'none'}}>SEARCH</Link>
          </div>
          <div class="p-2">
            <Link to='/account' style={{color: 'white', textDecoration: 'none'}}>ACCOUNT</Link>
          </div>
          <div class="p-2">
            <Link to='/about' style={{color: 'white', textDecoration: 'none'}}>ABOUT</Link>
          </div>
          <div class="p-2">
            <Link to='/contact' style={{color: 'white', textDecoration: 'none'}}>CONTACT US</Link>
          </div>
        </div>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/about' component={About}></Route>
          <Route exact path='/search' component={Search}></Route>
          <Route exact path='/contact' component={Contact}></Route>
          <Route exact path='/view' component={View}></Route>
          <Route exact path='/list-property' component={<Advertise/>}></Route>
          <Route exact path='/login' component={Login}></Route>
          <PrivateRoute exact path="/account" component={Account}/>
        </Switch>
      </Router>
    )
  }
}

export default App;