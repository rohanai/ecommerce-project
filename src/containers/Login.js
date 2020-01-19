import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './common/form';
import PropTypes from 'prop-types';

import {loginRequest} from '../store/actions/loginRegisterAction';

class Login extends Component {
  constructor (props) {
    super(props)

    this._login = this._login.bind(this)
  }

  render () {
    const {dispatch} = this.props
    const {formState} = this.props.data

    return (
      <div>
        <div>
          <div>
            <h2>Login</h2>
          </div>
          <Form data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._login} btnText={'Login'} />
        </div>
      </div>
    )
  }

  _login (username, password) {
    this.props.dispatch(loginRequest({username, password}))
  }
}

Login.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(Login)
