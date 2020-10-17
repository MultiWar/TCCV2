import styled from 'styled-components';

export const Container = styled.div`
  @media(min-width: 950px) {
      display: none;
  }
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: ${props => props.theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 3;
`;
