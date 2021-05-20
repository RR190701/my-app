import './App.css';
import { Component } from 'react';
import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Profile from './container/Profile/profile';
import Login from './components/Login/login';
import Register from './components/Register/register';
import PrivateRoute from './components/routes/PrivateRoute';
 
function App() {
  return (
    <React.Fragment>
   
     <Router>
     <PrivateRoute exact path="/profile/:id" component={Profile}/>
       <Route  exact path ='/log-in' exact component ={Login}></Route>
       <Route   exact path ='/register'component ={Register}></Route>
       
     </Router>
   </React.Fragment>
  );
}

export default App;
