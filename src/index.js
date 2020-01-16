import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route} from 'react-router-dom'
import {createBrowserHistory } from 'history'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import reducer from './store/reducers/loginReducer'
import rootSaga from './store/sagas'

import App from './components/App'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

function checkAuth (nextState, replace) {
  const {loggedIn} = store.getState()

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

class LoginFlow extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <Route component={App}>
            <Route path='/' component={Home} />
            <Route onEnter={checkAuth}>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/dashboard' component={Dashboard} />
            </Route>
            {/* <Route path='*' component={NotFound} /> */}
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<LoginFlow />, document.getElementById('root'))
