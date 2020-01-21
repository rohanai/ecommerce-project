import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import reducer from './store/reducers/loginReducer'
import rootSaga from './store/sagas'
import { BrowserRouter } from 'react-router-dom'
import App from './App';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
   <App/>
</Provider>, document.getElementById('root'))
