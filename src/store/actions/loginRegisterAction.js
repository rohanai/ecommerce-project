import { CHANGE_FORM,
LOGIN_REQUEST,
LOGOUT_REQUEST,
REGISTER_REQUEST,
SENDING_REQUEST,
SET_AUTH,
REQUEST_ERROR } from '../actionType/loginRegisterActionType';

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

