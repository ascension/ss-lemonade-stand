import styled from 'styled-components';

export const AlertContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const alertColors = { info: 'blue', success: '#dff0d8', error: '#DB0304' };

export const Alert = styled.div`
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
