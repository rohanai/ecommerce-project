import {take, call, put, fork, race} from 'redux-saga/effects'
import auth from '../../auth';
import {createBrowserHistory } from 'history'

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT_REQUEST,
  CHANGE_FORM,
} from '../actionType/loginRegisterActionType';

export function * authorize ({username, password, isRegistering}) {
  yield put({type: SENDING_REQUEST, sending: true})

  try {
    let response
    if (isRegistering) {
      response = yield call(auth.register, username)
    } else {
      response = yield call(auth.login, username)
    }

    return response
  } catch (error) {
    console.log('hi'+error)
    return false
  } finally {
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

export function * logout () {
  yield put({type: SENDING_REQUEST, sending: true})

  try {
    const response = yield call(auth.logout)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
  }
}

export function * loginFlow () {
  while (true) {
    const request = yield take(LOGIN_REQUEST)
    const {username, password} = request.loginData

    const winner = yield race({
      auth: call(authorize, {username, password, isRegistering: false}),
      logout: take(LOGOUT_REQUEST)
    })

    if (winner.auth) {
      yield put({type: SET_AUTH, newAuthState: true})
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}})
      forwardTo('/dashboard')
    }
  }
}

export function * logoutFlow () {
  while (true) {
    yield take(LOGOUT_REQUEST)
    yield put({type: SET_AUTH, newAuthState: false})

    yield call(logout)
    forwardTo('/')
  }
}

export function * registerFlow () {
  while (true) {
    const request = yield take(REGISTER_REQUEST)
    console.log('The register request:' + request);
    const {username, password} = request.registerData

    const wasSuccessful = yield call(authorize, {username, password, isRegistering: true})

    if (wasSuccessful) {
      yield put({type: SET_AUTH, newAuthState: true})
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}})
      forwardTo('/dashboard')
    }
  }
}

export default function * root () {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(registerFlow)
}

function forwardTo (location) {
  createBrowserHistory().push(location)
}
