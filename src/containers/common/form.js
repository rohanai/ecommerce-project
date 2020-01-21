import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { changeForm } from '../../store/actions/loginRegisterAction';

class Form extends Component {
    constructor (props) {
        super(props);
        this._onChangePassword = this._onChangePassword.bind(this);
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    render () {
        return (
            <form onSubmit={this._onSubmit}>
            <div className='form-group'>
                <input 
                    className='form-control'
                    type='text'
                    id='userName'
                    value={this.props.data.username}
                    placeholder='Name'
                    onChange={this._onChangeUserName}
                    autoCorrect='off'
                    autoCapitalize='off'
                    spellCheck='false'/>
                <label>Username</label>
                <input 
                    className='form-control'
                    type='password'
                    id='password'
                    value={this.props.data.password}
                    placeholder='********'
                    onChange={this._onChangePassword}/>
                <label>Password</label>
            </div>
            <div>
                <button className='btn btn-default' type='submit'>
                    {this.props.btnText}
                </button>
            </div>
            </form>
        );
    }

    _onChangePassword (event) {
        this._emitChange({...this.props.data, password: event.target.value})
    }

    _onChangeUserName (event) {
        this._emitChange({...this.props.data, username: event.target.value})
    }

    _emitChange (newFormState) {
        this.props.dispatch(changeForm(newFormState))
    }

    _onSubmit (event) {
        event.preventDefault();
        this.props.onSubmit(this.props.data.username, this.props.data.password)
    }
}

Form.propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.object,
    onSubmit: PropTypes.func,
    changeForm: PropTypes.func,
    btnText: PropTypes.string
}

export default Form;
