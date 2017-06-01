import React, { Component } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};

class App extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    );
  }
}

App.propTypes = propTypes;

export default App;
