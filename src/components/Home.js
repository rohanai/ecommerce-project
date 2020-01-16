import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render () {
        return (
          <article>
            <div>
              <section>
                <h1>Welcome to Login</h1>
              </section>
            </div>
          </article>
        )
    }
}

function select (state) {
    return {
        data: state
    }
}

export default connect(select)(Home);
