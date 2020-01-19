import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import reducer from './store/reducers/loginReducer'
import rootSaga from './store/sagas'

import App from './App';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

class LoginFlow extends Component {
  render () {
    return (
      <Provider store={store}>
        <App></App>
      </Provider>
    )
  }
}

ReactDOM.render(<LoginFlow />, document.getElementById('root'))
