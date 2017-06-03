import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'components/Panel';
import styled from 'styled-components';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.number])
};

const Stats = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const defaultProps = {};

const StatPanel = ({ title, content, children }) => {
  return (
    <Panel title={title}>
      <Stats>
        { children ? children : content }
      </Stats>
    </Panel>
  );
};

StatPanel.propTypes = propTypes;

export default StatPanel;
