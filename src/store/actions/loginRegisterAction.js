import {
  SET_AUTH,
  CHANGE_FORM,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
  REQUEST_ERROR,
  GET_ALL_PRODUCTS,
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE } from '../actionType/loginRegisterActionType';

export function setAuthState (newAuthState) {
    return {type: SET_AUTH, newAuthState}
}

export function changeForm (newFormState) {
    return {type: CHANGE_FORM, newFormState}
}

export function sendingRequest (req) {
    return {type: SENDING_REQUEST, req}
}

export function loginRequest (loginData) {
    return {type: LOGIN_REQUEST, loginData}
}

export function registerRequest (registerData) {
    return {type: REGISTER_REQUEST, registerData}
}

export function logout () {
    return {type: LOGOUT_REQUEST}
}

export function requestError (error) {
    return {type: REQUEST_ERROR, error}
}

export function getAllProducts() {
    return {
      type: GET_ALL_PRODUCTS,
    }
  }
  
  export function receiveProducts(products) {
    return {
      type: RECEIVE_PRODUCTS,
      products: products,
    }
  }
  
  export function addToCart(productId) {
    return {
      type: ADD_TO_CART,
      productId,
    }
  }
  
  export function removeFromCart(productId) {
    return {
      type: REMOVE_FROM_CART,
      productId,
    }
  }
  
  export function checkout() {
    return {
      type: CHECKOUT_REQUEST,
    }
  }
  
  export function checkoutSuccess(cart) {
    return {
      type: CHECKOUT_SUCCESS,
      cart,
    }
  }
  
  export function checkoutFailure(error) {
    return {
      type: CHECKOUT_FAILURE,
      error,
    }
  }

