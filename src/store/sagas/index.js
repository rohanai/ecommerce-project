import {take, call, put, fork, race, select, takeEvery, all} from 'redux-saga/effects'
import auth from '../../auth';
import {createBrowserHistory } from 'history'
import * as actions from '../actions/loginRegisterAction'
import { getCart } from '../reducers/CartProduct'
import { api } from '../../service'

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT_REQUEST,
  CHANGE_FORM,
  GET_ALL_PRODUCTS,
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE
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
    console.log('The response of the request:' + response);
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
 
    const {username, password} = request.registerData

    const wasSuccessful = yield call(authorize, {username, password, isRegistering: true})

    if (wasSuccessful) {
      yield put({type: SET_AUTH, newAuthState: true})
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}})
      forwardTo('/dashboard')
    }
  }
}

function forwardTo (location) {
  createBrowserHistory().push(location)
}

export function* getAllProducts() {
  const products = yield call(api.getProducts)
  yield put(actions.receiveProducts(products))
}

export function* checkout() {
  try {
    const cart = yield select(getCart)
    yield call(api.buyProducts, cart)
    yield put(actions.checkoutSuccess(cart))
  } catch (error) {
    yield put(actions.checkoutFailure(error))
  }
}

export function* watchGetProducts() {
  /*
    takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
    i.e. concurrent GET_ALL_PRODUCTS actions are allowed
  */
  yield takeEvery(GET_ALL_PRODUCTS, getAllProducts)
}

export function* watchCheckout() {
  while (true) {
    yield take(CHECKOUT_REQUEST)
    /*
      ***THIS IS A BLOCKING CALL***
      It means that watchCheckout will ignore any CHECKOUT_REQUEST event until
      the current checkout completes, either by success or by Error.
      i.e. concurrent CHECKOUT_REQUEST are not allowed
      TODO: This needs to be enforced by the UI (disable checkout button)
    */
    yield call(checkout)
  }
}

export default function * root () {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(registerFlow)
  yield fork(getAllProducts)
  yield fork(watchGetProducts)
  yield fork(watchCheckout)
}

