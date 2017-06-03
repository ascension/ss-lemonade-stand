import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertContainer } from './styled';
import ClearIcon from 'react-icons/lib/md/clear';

const propTypes = {
  alerts: PropTypes.object,
  deleteAlert: PropTypes.func.isRequired
};

const AlertBox = props => {
  const { alerts, deleteAlert } = props;

  return (
    <AlertContainer>
      {Object.values(alerts).slice(-5).map(alert => (
        <Alert key={alert.id} type={alert.alertType}>
          {alert.message}
          <ClearIcon
            onClick={() => deleteAlert(alert.id)}
            style={{ height: '100%', fontSize: '28px', float: 'right', margin: 'auto 1em' }}
          />
        </Alert>
      ))}
    </AlertContainer>
  );
};

AlertBox.propTypes = propTypes;

export default AlertBox;
