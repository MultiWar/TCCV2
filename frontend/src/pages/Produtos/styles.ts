import { Button } from '@chakra-ui/core';
import styled from 'styled-components';

export const Card = styled.div`
    display: grid;
    /* grid-template-columns:  */
    grid-template: 
        '.... ....             tarja  ....    .... '40px
        '.... categoriaRemedio imagem comprar ....' 20px
        '.... nomeRemedio      imagem comprar ....' min-content
        '.... concentracao     imagem comprar ....' min-content
        '.... massa            imagem comprar ....' min-content
        '.... ....             imagem ....    ....' 40px
        '.... descricao descricao descricao   ....' auto
        'similares similares similares similares similares' min-content / 1.5em 3fr 4fr 2fr 1.5em;
    /* grid-template:
        '.... ....             .... tarja   ....' 40px
        '.... categoriaRemedio .... imagem  ....' 20px
        '.... nomeRemedio      .... imagem  ....' min-content
        '.... concentracao     .... imagem  ....' min-content
        '.... massa            .... imagem  ....' min-content
        '.... ....             .... imagem  ....' min-content
        '.... ....             .... comprar ....' min-content
        '.... ....             .... comprar ....' min-content
        '.... ....             .... comprar ....' min-content
        '.... descricao descricao descricao ....' 100px
        'similares similares similares similares' 100px / 1.5em 4fr 2fr 4fr 1.5em; */
    background-color: ${props => props.theme.colors.cardOrModalBackground};
    height: 100%;
    width: auto;
    max-width: 1000px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px #333;
    grid-column-gap: 1.5em;
    /* grid-row-gap: 0.5em; */
    margin: 30px auto;
    padding: 20px;

    @media(max-width: 870px) {
        width: 80%;
        grid-template: 
            '.....       nomeRemedio       nomeRemedio      nomeRemedio      .....' min-content
            '......      .....             tarja            .....            .....' min-content
            '......      ......            imagem           ......           .....' 300px
            '......      categoriaRemedio  categoriaRemedio categoriaRemedio ......' min-content
            '......      concentracao      concentracao     concentracao     ......' min-content
            '......      massa             massa            massa            ......' min-content
            '......      .......           comprar          .......          ......' min-content
            '......      descricao         descricao        descricao        ......' min-content
            'similares   similares         similares        similares        similares' min-content / 1.5em 2fr 3fr 2fr 1.5em;
    }

    @media(max-width: 560px) {
        grid-template:
            '.....     nomeRemedio        nomeRemedio       nomeRemedio      .....' min-content
            'tarja     tarja              tarja             tarja            tarja' min-content
            'imagem    imagem             imagem            imagem           imagem' 300px
            '.....     categoriaRemedio   categoriaRemedio  categoriaRemedio .....' min-content
            '.....     concentracao       concentracao      concentracao     .....' min-content
            '.....     massa              massa             massa            .....' min-content
            '.....     comprar            comprar           comprar          .....' min-content
            '.....     descricao          descricao         descricao        .....' min-content
            'similares similares          similares         similares        similares' min-content /1em 2fr 3fr 2fr 1em;
    }

    @media(max-width: 465px) {
        grid-template:
            'nomeRemedio   nomeRemedio        nomeRemedio       nomeRemedio       nomeRemedio' min-content
            'tarja         tarja              tarja             tarja             tarja' min-content
            'imagem        imagem             imagem            imagem            imagem' 300px
            '......        categoriaRemedio   categoriaRemedio  categoriaRemedio  ......' min-content
            'concentracao  concentracao       concentracao      concentracao      concentracao' min-content
            'massa         massa              massa             massa             massa' min-content
            'comprar       comprar            comprar           comprar           comprar' min-content
            'descricao     descricao          descricao         descricao         descricao' min-content
            'similares     similares          similares         similares         similares' min-content / 1em 2fr 3fr 2fr 1em;
    }

`;

export const Categoria = styled.div`
    grid-area: categoriaRemedio;
    display: flex;
    justify-content: center;
    align-items: center;
    > h4 {
        font-family: 'Raleway';
        font-size: 18px;
        margin-top: 5px;
        margin-bottom: 7px;
    }
`

export const Tarja = styled.div<{cor: {background: string, text: string}}>`
    grid-area: tarja;
    display: flex;
    background: ${props => props.cor.background};
    justify-content: center;
    align-items: center;
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-right: 2px solid black;
    > h2 {
        font-family: 'Raleway';
        color: ${props => props.cor.text};
        font-size: 28px;
    }
`

export const DivImagem = styled.div`
    grid-area: imagem;
    background: url('https://picsum.photos/200/300');
    background-size: cover;
    border: 2px solid black;
`

export const CardComprar = styled.div`
    grid-area: comprar;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ddd;
    border-radius: 4px;
    margin: 40px 0;
    padding: 20px 10px;
    > h1 {
        font-family: 'Montserrat';
        font-weight: 600;
        font-size: 35px;
    }
`

export const Quantidades = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f2f2;
    border: 1px solid black;
    border-radius: 3px;
`

export const BotaoTrocarQuantidade = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 3px;
    width: 40px;
    height: 40px;
    font-size: 25px;
    transition: all ease-in-out 350ms;
`

export const NomeRemedio = styled.div`
    grid-area: nomeRemedio;
    display: flex;
    height: auto;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1.1;
    
    > h1 {
        font-family: 'Raleway';
        font-weight: 600;
        font-size: 40px;
    }
`

export const DivConcentracao = styled.div`
    grid-area: concentracao;
    text-align: center;
    margin-top: -15px;

    > h3 {
        font-size: 23px;
    }
`

export const DivMassa = styled.div`
    grid-area: massa;
    text-align: center;
    line-height: 1;

    > h3 {
        font-size: 23px;
    }
`

export const Descricao = styled.div`
    grid-area: descricao;
    margin-top: 15px;
    border: 1px solid black;
    border-radius: 2px;
    padding: 6px;
    
    > p {
        font-family: 'Raleway';
        font-size: 18px;
    }
`

export const Similares = styled.div`
    grid-area: similares;
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    > h3 {
        font-size: 23px;
        text-align: center;
    }

    > h4 {
        text-align: center;
        margin-top: -3px;
    }
`

export const ProdutosSim = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 15px;
`

export const ProdutoSimilar = styled.div`
    display: flex;
    flex-direction: column;
    width: 155px;
    border: 1px solid black;
    margin-top: 3px;

    > h4 {
        font-size: 18px;
        text-align: center;
    }

    > div {
        display: flex;
        align-items: flex-end;
        width: 100%;
        height: 200px;
        background: url('https://picsum.photos/200/300');
        border-top: 1px solid black;
    }
`

export const BotoesProdutosSimilares = styled.div`
    display: flex;
    flex-direction: column;
    transform: translateY(10px);
    width: 100%;
    padding: 10px;
    opacity: 0;
    transition: ease-in-out 250ms;
`