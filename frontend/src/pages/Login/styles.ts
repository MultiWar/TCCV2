import styled, {css} from 'styled-components';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import { shade, lighten } from 'polished'

export const Container = styled.div`
    margin: 30px auto;
    display: flex;
    width: 30%;
    min-width: 500px;
    flex-direction: column;
    background-color: ${props => lighten(0.05, props.theme.colors.secondaryText)};
    padding: 30px;
    margin-top: 50px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #333;
`;

export const Title = styled.h1`
    font-size: ${props => props.theme.sizes.title}
`;

const IconCss = css`
    height: 25px;
    width: 25px;
    fill: ${props => props.theme.colors.secondaryText};
    margin-right: 5px

    /* &:hover {
        opacity: 0.5
        fill: ${props => shade(0.3, props.theme.colors.secondaryText)}
    } */
    
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