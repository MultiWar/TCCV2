import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        list-style-type: none;
        box-sizing: border-box
    }

    body {
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.primaryText};
        font-size: 18px;
        font-family: Arial, sans-serif;
    }

    #root {
        padding-bottom: 100px; 
        min-height: 100vh;
        position: relative
    }
`;