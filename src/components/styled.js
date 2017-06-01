import styled from 'styled-components';

const HomeWrapper = styled.div`
  display: block;
`;

const NavBar = styled.nav`
  background-color: #28394d;
  color: #fff;
  height: 100%;
  line-height: 75px;
  
  & ul {
    list-style: none;
  }
`;

export {
  HomeWrapper,
  NavBar
};
