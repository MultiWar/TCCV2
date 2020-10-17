import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 55px;
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondaryText};
    padding-left: 20px;
    padding-right: 20px;

    @media(max-width: 950px) {
        display: none;
    }
`