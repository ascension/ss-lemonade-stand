import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { NavBar } from 'components/Nav';
import { AppContainer, Container } from 'components/Layout';
import Alerts from 'containers/Alerts';
import styled from 'styled-components';

const Viewport = styled.div`
  padding-top: 4rem;
`;

export const PageLayout = ({ children }) => (
  <AppContainer>
    <Alerts/>
    <NavBar>
      <Container>
        <h4>Lemonade Stand</h4>
        <ul>
          <li><Link to='dashboard'>Dashboard</Link></li>
          <li><Link to='transaction'>View Transactions</Link></li>
        </ul>
      </Container>
    </NavBar>
    <Container textCenter>
      <Viewport>
        {children}
      </Viewport>
    </Container>
  </AppContainer>
);
PageLayout.propTypes = {
  children: PropTypes.node
};

export default PageLayout;
