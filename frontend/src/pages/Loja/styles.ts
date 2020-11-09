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

    @media (max-width: 520px) {
        width: 421px;
        min-height: unset;
        padding-bottom: 13px;
        padding-right: 10px;
        padding-left: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
`;

export const CardContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    @media(max-width: 520px) {
        flex: unset;
        justify-content: space-around;
        width: 100%;
        flex-direction: row
    }
`;

export const CardImageContainer = styled.div`
    display: flex;
    height: 300px;
    justify-content: center;

    @media(max-width: 520px) {
        height: 242px;

        > img {
            width: 242px;
            height: 242px;
        }
    }

    @media(max-width: 800px) {
        height: 300px;
        
        > img {
            width: 100px
        }
    }

    > img {
        height: 100%;
        width: 200px;
        border-radius: 15px;
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
`;

export const ProductInformations = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProductButtons = styled.div`
    display: flex;
    justify-content: space-between;

    @media(max-width: 520px) {
        flex-direction: column
    }
`
