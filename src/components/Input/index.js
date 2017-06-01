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
