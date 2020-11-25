import styled, { css } from 'styled-components';
import { motion } from 'framer-motion'
import { darken } from 'polished';
import { BsSearch } from 'react-icons/bs'

export const Container = styled(motion.div)`
    display: flex;
    width: 40px;
    justify-content: space-between;
    height: 40px;
    border-radius: 20px;
    background-color: #eee;
    align-self: center;
    justify-self: flex-end;

    & > div {
        display: flex;
        width: 100%;
    }
`;

export const Search = styled.input`
    width: 100%;
    background-color: #eee;
    height: 40px;
    border: none;
    border-radius: 20px;
    color: #333;
    font-size: ${props => props.theme.sizes.label};
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