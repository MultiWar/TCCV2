import styled from 'styled-components';
import { lighten } from 'polished';

export const Card = styled.div`
    margin: 50px auto;
    display: flex;
    width: 30%;
    min-width: 420px;
    flex-direction: column;
    background-color: ${props => lighten(0.05, props.theme.colors.secondaryText)};
    padding: 15px 30px 30px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px #333;

    @media(max-width: 520px) {
        width: 80%;
        min-width: unset;
    }

    @media(max-width: 410px) {
        padding: 15px
    }
`;
