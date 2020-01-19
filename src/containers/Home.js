import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from './common/navigation';

class Home extends Component {
    render () {
        return (
        <div>
          <article>
            <div>
              <section>
                <h1>Welcome to Login</h1>
              </section>
            </div>
          </article>
          <div className='well'>
            <Navigation loggedIn={this.props.loggedIn}
              history={this.props.history}
              dispatch={this.props.dispatch}
              location={this.props.location} />
            {this.props.children}
          </div>
        </div>
        )
    }
}

Home.propTypes = {
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

export default connect(select)(Home);
