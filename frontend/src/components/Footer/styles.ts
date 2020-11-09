import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    margin-top: 40px;
    background-color: ${props => props.theme.colors.primaryText};
`;