import React, { Component } from 'react';
import { Router, Route} from 'react-router-dom'
import {createBrowserHistory } from 'history'
import { connect } from 'react-redux';
import Store from './index';

import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Dashboard from './components/Dashboard'
// import NotFound from './components/NotFound'
let sessionStorage = global.window.sessionStorage

function checkAuth (nextState, replace) {
    const {loggedIn} = sessionStorage.getItem('loggedIn');
  
    if (nextState.location.pathname !== '/dashboard') {
      if (loggedIn) {
        if (nextState.location.state && nextState.location.pathname) {
          replace(nextState.location.pathname)
        } else {
          replace('/')
        }
      }
    } else {
      if (!loggedIn) {
        if (nextState.location.state && nextState.location.pathname) {
          replace(nextState.location.pathname)
        } else {
          replace('/')
        }
      }
    }
  }

class App extends Component {
    render () {
        return (
        <Router history={createBrowserHistory()}>
              <Route path='/' component={Home} />
              <Route onEnter={checkAuth}>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/dashboard' component={Dashboard} />
              </Route>
              {/* <Route path='*' component={NotFound} /> */}
          </Router> 
        );
    }
}

function select (state) {
  return {
      data: state
  }
}

export default connect(select)(App);