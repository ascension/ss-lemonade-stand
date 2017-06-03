import styled, { css } from 'styled-components';

const textCenter = css`
  text-align: center;
`;

export const Container = styled.div.attrs({ className: 'container' })`
  ${props => props.textCenter ? textCenter : ''}
`;

export const Row = styled.div.attrs({ className: 'row' })``;

export const AppContainer = styled.div`
  background: #fff;
`;
