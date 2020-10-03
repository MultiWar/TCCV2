import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondaryText}
`