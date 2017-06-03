import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ClearIcon from 'react-icons/lib/md/clear';
import { deleteAlert } from 'store/alerts';

const AlertBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const alertColors = { info: 'blue', success: '#dff0d8', error: '#DB0304' };

const Alert = styled.div`
  font-size: 14px;
  width: 100%;
  color: #fff;
  background-color: #dff0d8;
  border-color: #d0e9c6;
  color: #3c763d;
  background: ${props => alertColors[props.type]};
  height: 75px;
  display: block;
  text-align: center;
  z-index: 1000;
  line-height: 75px;
  transition: all 500ms ease;
`;

const Alerts = props => {
  const { alerts, deleteAlert } = props;

  return (
    <AlertBox>
      {Object.values(alerts).slice(-5).map(alert => (
        <Alert key={alert.id} type={alert.alertType}>
          {alert.message}
          <ClearIcon
            onClick={() => deleteAlert(alert.id)}
            style={{ height: '100%', fontSize: '28px', float: 'right', margin: 'auto 1em' }}
          />
        </Alert>
      ))}
    </AlertBox>
  );
};

const mapDispatchToProps = {
  deleteAlert
};

const mapStateToProps = state => {
  return {
    alerts: state.alerts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
