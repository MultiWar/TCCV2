import styled from 'styled-components';

export const Container = styled.div`
    margin: 30px auto;
    display: flex;
    width: 35%;
    flex-direction: column;

    @media(max-width: 800px) {
        width: 80%
    }
`;

export const Title = styled.h1`
    font-size: ${props => props.theme.sizes.title}
`