import { motion } from 'framer-motion';
import { darken } from 'polished';
import { BsSearch } from 'react-icons/bs';
import styled, { css } from 'styled-components';

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

export const ButtonContainer = styled(motion.div)`
    display: flex;
    width: 100%;
    background: transparent;

`

export const Search = styled.input`
    width: 100%;
    background-color: #eee;
    color: #333;
    padding-left: 10px;
    height: 40px;
    border: none;
    border-radius: 20px;
    &:focus {
        outline: ${props => darken(0.1, props.theme.colors.primary)}
    }
`;

const IconCss = css`
    width: 25px;
    height: 25px;
`;

export const SearchIcon = styled(BsSearch)`
    ${IconCss}
`