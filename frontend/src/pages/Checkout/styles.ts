import styled from 'styled-components';

export const Card = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    background-color: ${props => props.theme.colors.cardOrModalBackground};
    height: 100%;
    min-height: 587px;
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
        padding-bottom: 10px;
        padding-right: 10px;
        padding-left: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
`;
