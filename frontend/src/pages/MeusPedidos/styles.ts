import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 50px auto;

    @media(max-width: 510px) {
        width: 100%;
        padding: 30px;
        align-items: center;
        flex-direction: column;
    }
`

export const Card = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    max-width: 250px;
    min-height: 330px;
    flex-direction: column;
    background-color: ${props => lighten(0.05, props.theme.colors.secondaryText)};
    padding: 10px 25px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px #333;

    @media(max-width: 520px) { 
        margin-top: 25px;
        width: 90%;
    }
`;

export const Status = styled.h2`
    font-family: 'Raleway', 'sans-serif';
    font-size: 26px;
    font-weight: 600;
`

export const Produtos = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    > h3 {
        font-size: 22px;
        font-family: 'Raleway', 'sans-serif';
        font-weight: 500;
        margin-bottom: 10px;
    }

    > p {
        font-size: 17px;
        font-family: 'Raleway', 'sans-serif';
        font-weight: 400;
    }
`

export const Data = styled.h3`
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight: 600;
`

export const Preco = styled.h2`
    font-size: 26px;
    font-family: 'Montserrat';
    font-weight: 600;
    margin-top: 10px;
`