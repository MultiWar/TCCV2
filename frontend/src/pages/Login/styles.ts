import styled, {css} from 'styled-components';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {Link} from 'react-router-dom'

export const Container = styled.div`
    margin: 30px auto;
    display: flex;
    width: 30%;
    flex-direction: column;

    @media(max-width: 800px) {
        width: 80%
    }
`;

export const Title = styled.h1`
    font-size: ${props => props.theme.sizes.title}
`;

const IconCss = css`
    height: 25px;
    width: 25px
`;

export const EyeIcon = styled(AiOutlineEye)`
    ${IconCss}
`;

export const SlashedEyeIcon = styled(AiOutlineEyeInvisible)`
    ${IconCss}
`;

export const Button = styled.button`
    background: transparent;
    border: none;
    outline: none;
    margin-top: 40px;
`;

export const LinkEstilizado = styled(Link)`
    >svg {
        fill: ${props => props.theme.colors.primary}
    }
`