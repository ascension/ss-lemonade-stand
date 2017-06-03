import styled from 'styled-components';

export const NavBar = styled.nav`
  background-color: #28394d;
  color: #fff;
  height: 75px;
  
  & h4 {
    float: left;
    display: inline-block;
    padding-top: 1em;
  }
  
  & ul {
    float: right;
    list-style: none;
    display: inline-block;
  }
  
  & li {
    padding: 30px 15px;
    display: inline-block;  
  }
  
  & a {
    color: #fff;
  }
  
  & a:hover, a:focus {
    background: 0 0;
    color: #6397d1;
    text-decoration: none;
  }
`;
