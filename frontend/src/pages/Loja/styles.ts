import styled, { css } from 'styled-components';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

const iconCss = css`
    margin-left: 5px;
`

export const FlechaBaixo = styled(BsChevronDown)`
    ${iconCss}
`

export const FlechaCima = styled(BsChevronUp)`
    ${iconCss}
`

export const Card = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    background-color: ${props => props.theme.colors.cardOrModalBackground};
    height: 100%;
    min-height: 593px;
    width: 300px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px #333;
    align-items: center;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 40px 20px 0;
    position: relative;

    @media (max-width: 520px) {
        width: 95%;
        min-height: unset;
        min-width: unset;
        padding-bottom: 13px;
        padding-right: 10px;
        padding-left: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }

    & h2 {
        font-family: 'Raleway';
    }

    /* @media(max-width: 460px) {
        align-items: center;
    } */
`;

export const CardContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    height: 100%;

    @media(max-width: 520px) {
        flex: unset;
        justify-content: space-around;
        width: 100%;
        flex-direction: row;
        align-items: unset;
    }

    @media(max-width: 400px) {
        flex-direction: column;
        justify-content: unset;
        align-items: center;
        height: auto;
    }
    
    
`;

export const CardImageContainer = styled.div`
    display: flex;
    height: 300px;
    width: 200px;
    justify-content: center;
    flex-shrink: 1;

    > img {
        height: 100%;
        width: 100%;
        border-radius: 15px;
    }

    @media(max-width: 460px) {
        width: 150px;
        height: 250px;
    }

    @media(max-width: 400px) {
        width: 180px;
        height: 180px;
    }
`;

export const ProductInformationAndButtons = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    
    @media(max-width: 520px) {
        flex: unset;
        width: 170px;
        min-height: 242px;
        align-content: center;
    }

    @media(max-width: 400px) {
        width: 100%
    }
`;

export const ProductInformations = styled.div`
    display: flex;
    flex-direction: column;

    & strong {
        font-family: 'Montserrat'
    }
`;

export const ProductButtons = styled.div`
    display: flex;
    justify-content: space-between;

    @media(max-width: 520px) {
        flex-direction: column
    }
`
