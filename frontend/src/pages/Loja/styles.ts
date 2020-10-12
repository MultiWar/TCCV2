import styled from 'styled-components';

export const Card = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    background-color: ${props => props.theme.colors.cardOrModalBackground};
    height: 100%;
    width: 300px;
    border-radius: 8px;
    box-shadow: 2px 2px 3px #333;
    align-items: center;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 40px 20px 0;

    @media (max-width: 800px) {
        width: 180px;
        padding-bottom: 5px;
    }

    @media (max-width: 520px) {
        width: 421px;
        padding-bottom: 10px;
        padding-right: 10px;
        padding-left: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media(max-width: 520px) {
        flex-direction: row
    }
`;

export const CardImageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 300px;
    margin-right: 8px;
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
    flex-direction: column;
    justify-content: space-between;
    
    @media(max-width: 520px) {
        min-height: 242px;
        align-content: center;
        justify-content: center;
    }
`;

export const ProductInformations = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProductButtons = styled.div`
    flex-direction: row;
    justify-content: space-between;

    @media(max-width: 800px) {
        flex-direction: column
    }

    @media(max-width: 520px) {
        align-self: flex-end;
        justify-content: unset;
        align-content: center;
    }
`
