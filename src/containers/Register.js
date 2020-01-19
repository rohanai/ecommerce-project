import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './common/form';
import PropTypes from 'prop-types';
import { registerRequest } from '../store/actions/loginRegisterAction';

class Register extends Component {
    constructor (props) {
        super(props);
        this._register = this._register.bind(this);
    }

    render () {
        const {dispatch} = this.props;
        const {formState} = this.props.data;

        return (
            <div>
                <div>
                    <h2>Register</h2>
                </div>
                <Form data={formState} dispatch={dispatch} history={this.props.history} onSubmit={this._register} btnText={'Register'} />
            </div>
        );
    }

    _register (username, password) {
        this.props.dispatch(registerRequest({username, password}))
    }
}

Register.propTypes = {
    data: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.object,
}

function select (state) {
    return {
        data: state
    }
}

export default connect(select)(Register);
