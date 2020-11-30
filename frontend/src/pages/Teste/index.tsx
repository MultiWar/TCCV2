import { Heading } from '@chakra-ui/core';
import React from 'react';

import { Container, Header, HeaderTitle, Hero, HeroTitle, HeroSubtitle, Main, MainH1, Card, CardImage, CardTitle, CardContent, Summary, ReadMoreLink, Sidebar, SidebarTitle, SidebarText, Footer, FooterText } from './styles';

const Teste: React.FC = () => {
    return (
        <Container>
            <Header>
                <HeaderTitle>CSS Grid - Grid-Template-Areas</HeaderTitle>
            </Header>
            <Hero>
                <HeroTitle>Grid Areas</HeroTitle>
                <HeroSubtitle>Making life easier</HeroSubtitle>
            </Hero>    
            <Main>
                <MainH1>From the blog</MainH1>
                <Card>
                    <CardImage src='//unsplash.it/300/200'/>
                    <CardTitle>Blog post title</CardTitle>
                    <CardContent>
                        <Summary>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie nibh eget luctus fermentum. Suspendisse porta tellus eu enim pretium, a pulvinar purus interdum. Quisque mattis lectus tellus, iaculis accumsan ligula rhoncus gravida. Morbi rhoncus fermentum malesuada. Quisque erat risus, congue sed lobortis vitae, laoreet ullamcorper ante. Phasellus vel rhoncus felis, id rhoncus nulla. Ut id condimentum risus. Sed ut neque ac dolor efficitur ullamcorper vel vitae ex. Proin pellentesque vitae risus sodales congue. Proin vehicula augue non dapibus mollis. Nullam ullamcorper tellus at congue dictum. Pellentesque vitae aliquet mi. Proin cursus felis id iaculis tempus. Vivamus tempor auctor quam eu varius. Donec quis vehicula quam.</Summary>
                        <ReadMoreLink href=''>Read more</ReadMoreLink>
                    </CardContent>
                </Card>
            </Main>
            <Sidebar>
                <SidebarTitle>Sidebar stuff</SidebarTitle>
                <SidebarText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie nibh eget luctus fermentum. Suspendisse porta tellus eu enim pretium, a pulvinar purus interdum. Quisque mattis lectus tellus, iaculis accumsan ligula rhoncus gravida. Morbi rhoncus fermentum malesuada. Quisque erat risus, congue sed lobortis vitae, laoreet ullamcorper ante. Phasellus vel rhoncus felis, id rhoncus nulla. Ut id condimentum risus. Sed ut neque ac dolor efficitur ullamcorper vel vitae ex. Proin pellentesque vitae risus sodales congue. Proin vehicula augue non dapibus mollis. Nullam ullamcorper tellus at congue dictum. Pellentesque vitae aliquet mi. Proin cursus felis id iaculis tempus. Vivamus tempor auctor quam eu varius. Donec quis vehicula quam. Donec nisi eros, porta et lectus id, condimentum dictum lacus. Phasellus tortor ex, pharetra non sodales vitae, euismod eget massa. Maecenas aliquet eget metus porta ultricies. Integer cursus leo justo. Nam eu est aliquam, scelerisque diam nec, scelerisque leo. Vivamus iaculis orci non nibh dapibus blandit. Proin vitae velit venenatis, dictum dolor vel, laoreet lorem. Nam ex ex, suscipit ut rutrum eget, egestas et metus. Ut ut viverra eros, ut vestibulum velit. Integer porttitor lacinia aliquet. Nunc et pharetra justo. Mauris commodo ornare sodales. Nunc nisi enim, sollicitudin sit amet euismod ac, finibus id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta eros quis ullamcorper vestibulum. Aenean vel augue nec est condimentum elementum. Vestibulum magna magna, aliquam a tincidunt ac, efficitur eget sapien. In venenatis velit lacus, sed porttitor turpis malesuada vitae.</SidebarText>
            </Sidebar>
            <Footer>
                <FooterText>the end</FooterText>
            </Footer>
        </Container>
    ); 
}


export default Teste;