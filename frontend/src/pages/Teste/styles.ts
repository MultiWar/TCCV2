import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
`;

export const DivInput = styled.div`
    width: 300px;
    border-bottom: 2px solid #88c1f6;

    &:focus-within {
        border-bottom: 2px solid ${props => props.theme.colors.primary};
        transition: 0.5s;
    }
`

export const InputTeste = styled.input`
    width: 100%;
    height: 35px;
    background: transparent;
    border-radius: 8px;
    outline: none;
`;