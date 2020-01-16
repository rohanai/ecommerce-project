import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './common/navigation';
import PropTypes from 'prop-types';

class App extends Component {
    render () {
        return (
            <div className='well'>
                <Navigation loggedIn={this.props.loggedIn}
                    history={this.props.history}
                    dispatch={this.props.dispatch}
                    location={this.props.location} />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.object,
  dispatch: PropTypes.func
}

function select (state) {
  return {
    data: state
  }
}

export default connect(select)(App);