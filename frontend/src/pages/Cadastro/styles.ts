import { lighten } from 'polished';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styled, { css } from 'styled-components';

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

const IconCss = css`
    height: 25px;
    width: 25px;
    fill: ${props => props.theme.colors.secondaryText};
    margin-right: 5px   
`;

export const EyeIcon = styled(AiOutlineEye)`
    ${IconCss}
`;

export const SlashedEyeIcon = styled(AiOutlineEyeInvisible)`
    ${IconCss}
`;

export const Title = styled.h1`
    font-size: ${props => props.theme.sizes.title}
`