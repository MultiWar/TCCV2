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

export const Title = styled.div``;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 100%;
    min-height: 500px;
    justify-content: column;
    background-color: lightgreen;
    padding-bottom: 15px;
`

export const CardContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #ddd;
`

export const ImageReplacer = styled.div`
    background-color: #555;
    width: 250px;
    height: 250px;
    margin-bottom: 30px;
`

export const TextoEBotoes = styled.div`
    display: flex;
    flex: 1;
    background-color: red;
    flex-direction: column;
    justify-content: space-between;
`

export const Texto = styled.div`
    display: flex;
`

export const Botoes = styled.div`
    display: flex;
    justify-content: space-around;
`