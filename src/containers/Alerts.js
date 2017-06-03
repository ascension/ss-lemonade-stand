import React from 'react';
import { connect } from 'react-redux';
import { deleteAlert } from 'store/middleware/alerts';
import { AlertBox } from 'components/AlertBox';

const mapDispatchToProps = {
  deleteAlert
};

const mapStateToProps = state => {
  return {
    alerts: state.alerts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);
