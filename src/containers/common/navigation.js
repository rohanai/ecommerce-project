import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {logout} from '../../store/actions/loginRegisterAction';

const sessionStorage = global.window.sessionStorage;

class Navigation extends Component {
    constructor (props) {
        super(props);
        this._logout = this._logout.bind(this);
    }
    loggedIn = sessionStorage.getItem('loggedIn');

    render () {
        const navButtons = this.loggedIn ? (
            <div>
                <Link to='/dashboard' className='btn btn-default'>Dashboard</Link>
                <a href='#' className='btn btn-primary' onClick={this._logout}>Logout</a>
            </div>
        ) : (
            <div>
                <Link to='/login' className='btn btn-primary'>Login</Link>
                <Link to='/register' className='btn btn-primary'>Register</Link>
            </div>
        )

        return (
            <div className='navbar navbar-inverse'>
                <div className='nav navbar-nav'>
                <Link to='/'>
                    <h1>Login to E-Commerce</h1>
                </Link>
                {navButtons}
                </div>
            </div>
        )
    }

    _logout () {
        this.props.dispatch(logout());
    }
}

Navigation.propTypes = {
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func
}

export default Navigation;
