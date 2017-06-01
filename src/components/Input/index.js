import styled from 'styled-components';

export const Input = styled.input.attrs({ className: 'form-control' })`
  &:focus {
    border-color: #55779f;
    box-shadow: none;
  }
  
  height: 45px;
  border-color: #ddd;
  box-shadow: 0 0 0 transparent;
  -webkit-appearance: none;
`;

export const HelpBlock = styled.p`
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: ${props => props.hasError ? '#a94442' : '#737373' };
  transition: all 200ms ease;
`;
