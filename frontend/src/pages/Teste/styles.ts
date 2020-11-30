import styled, {css} from 'styled-components'

export const Container = styled.div`
    display: grid;
    min-height: 100vh;
    line-height: 1.6;
    grid-template-rows: 10em 50vh auto 10em;
    grid-template-columns: 1fr 5fr 2fr 1fr;
    grid-template-areas: 
        'header header header header'
        'hero hero hero hero'
        '.... main sidebar ....'
        'footer footer footer footer';
    grid-column-gap: 1.5em;
` 

export const Header = styled.div`
    grid-area: header;
    background: #333;
    color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const HeaderTitle = styled.h1`
    font-size: 30px;
`

export const Hero = styled.div`
    grid-area: hero;
    background: url(https:\/\/s3-us-west-2.amazonaws.com/s.cdpn.io/308367/gridarea-hero-bg.jpg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const HeroTitle = styled.h1`
    font-size: 60px;
    margin: 0;
`

export const HeroSubtitle = styled.p`
    color: white;
    font-size: 30px;
    margin: 0;
`

export const Main = styled.div`
    grid-area: main;
`

export const MainH1 = styled.h1`

`

export const Card = styled.div`
    display: grid;
    /* grid-template-columns: 1fr 3fr;
    grid-template-rows: min-content auto;
    grid-template-areas: 
        'img title'
        'img content'; 

    all of this is the same as:

    */
    grid-template: 
        'img title' min-content
        'img content' auto / 1fr 3fr
`

export const CardImage = styled.img`
    grid-area: img;
`

export const CardTitle = styled.h2`
    grid-area: title;
`

export const CardContent = styled.div`
    grid-area: content;
`

export const Summary = styled.p`

`

export const ReadMoreLink = styled.a`

`

export const Sidebar = styled.div`
    grid-area: sidebar;
    background: #aaa;
    padding: 2em;
`

export const SidebarTitle = styled.h1`

`

export const SidebarText = styled.p`

`

export const Footer = styled.div`
    grid-area: footer;
    background: #333;
    color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FooterText = styled.h1`
    font-size: 30px;
`

