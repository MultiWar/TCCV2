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
`;
