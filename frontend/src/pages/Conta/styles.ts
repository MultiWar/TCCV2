import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { FaUserEdit } from 'react-icons/fa'

export const Container = styled.div`
    margin: 50px auto;
    display: flex;
    width: 30%;
    min-width: 420px;
    flex-direction: column;
    background-color: ${props => lighten(0.05, props.theme.colors.secondaryText)};
    padding: 30px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px #333;

    @media(max-width: 520px) {
        width: 80%;
    }
`;

const IconCss = css`
    height: 25px;
    width: 25px;
    fill: ${props => props.theme.colors.secondaryText};
    margin-left: 8px
`;

export const EditIcon = styled(FaUserEdit)`
    ${IconCss}
`;
