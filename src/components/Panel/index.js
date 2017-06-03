import React from 'react';
import PropTypes from 'prop-types';
import { PanelWrapper, PanelHeading, PanelBody } from './styled';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.number])
};

const Panel = (props) => {
  const { title, content, children } = props;
  return (
    <PanelWrapper>
      <PanelHeading>{title}</PanelHeading>
      <PanelBody>
        { children ? children : content }
      </PanelBody>
    </PanelWrapper>
  );
};

Panel.propTypes = propTypes;

export default Panel;
