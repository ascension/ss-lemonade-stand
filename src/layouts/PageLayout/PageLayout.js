import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import './PageLayout.scss';
import { NavBar } from '../../components/Nav';
import { AppContainer, Container } from '../../components/Layout';
import Alerts from '../../containers/Alerts';

export const PageLayout = ({ children }) => (
  <AppContainer>
    <Alerts/>
    <NavBar>
      <Container>
        <h4 style={{ paddingTop: '1em' }}>Lemonade Stand</h4>
        <ul>
          <li><Link to='dashboard'>Dashboard</Link></li>
          {/*<li><Link to='transaction'>View Transactions</Link></li>*/}
        </ul>
      </Container>
    </NavBar>
    <div className="container text-center">
      <div className="page-layout__viewport">
        {children}
      </div>
    </div>
  </AppContainer>
);
PageLayout.propTypes = {
  children: PropTypes.node
};

export default PageLayout;
