# Conteúdos do Readme / Table of Contents
## Português
* [Apresentação do Projeto](https://github.com/MultiWar/TCCV2/new/main?readme=1#português)
  * [Conceito do projeto e funcionalidades](https://github.com/MultiWar/TCCV2/new/main?readme=1#conceito-do-projeto-e-funcionalidades)
  * [Agradecimentos](https://github.com/MultiWar/TCCV2/new/main?readme=1#agradecimentos)
* [Rodando o projeto no seu PC](https://github.com/MultiWar/TCCV2/new/main?readme=1#rodando-o-projeto-no-seu-pc)
  * [Requisitos](https://github.com/MultiWar/TCCV2/new/main?readme=1#requisitos)
  * [Instalando dependências](https://github.com/MultiWar/TCCV2/new/main?readme=1#instalando-dependências)
  * [Preparando o banco de dados](https://github.com/MultiWar/TCCV2/new/main?readme=1#preparando-o-banco-de-dados)
  * [Iniciando a aplicação](https://github.com/MultiWar/TCCV2/new/main?readme=1#iniciando-a-aplicação)

## English
* [Project Introduction](https://github.com/MultiWar/TCCV2/new/main?readme=1#project-introduction)
  * [Project's concepts and features](https://github.com/MultiWar/TCCV2/new/main?readme=1#projects-concepts-and-features)
  * [Thanking some people](https://github.com/MultiWar/TCCV2/new/main?readme=1#thanking-some-people)
* [Running the application](https://github.com/MultiWar/TCCV2/new/main?readme=1#running-the-application)
  * [Requirements](https://github.com/MultiWar/TCCV2/new/main?readme=1#requirements)
  * [Installing dependencies](https://github.com/MultiWar/TCCV2/new/main?readme=1#installing-dependencies)
  * [Readying the database](https://github.com/MultiWar/TCCV2/new/main?readme=1#readying-the-database)
  * [Starting the app](https://github.com/MultiWar/TCCV2/new/main?readme=1#starting-the-app)


# Apresentação do Projeto
  Este é o site do TCC do grupo A. Essa é a versão definitiva, e já pronta. A aplicação consiste em um backend feito em Node e um frontend feito em React, ambos em TypeScript.
  
 No backend, as principais tecnologias utilizadas foram: Node, GraphQL, TypeGraphql, Express, Apollo Server e TypeORM. 
 
 No frontend, as principais tecnologias utilizadas foram: React, Styled Components, Apollo Client, Formik, Recoil e ChakraUI.
 
 Para a autenticação, foram utilizados os JWTs e um cookie para fazer o refresh do token a cada 15 minutos, para manter o usuário logado mas sempre renovando o token.
 
 O banco de dados utilizado foi o Microsoft SQL Server (MSSQL).
 

## Conceito do projeto e funcionalidades
  Nosso projeto de TCC é o de uma farmácia, que tem como principal objetivo a facilitação da vida de pessoas idosas. Este objetivo é refletido no site através de um design focado na UX, com a maioria das coisas escritas de maneira explícita, e não implícita, além de um visual simples. Além disso, o site é altamente responsivo, e possui Skeletons na maioria das páginas, o que faz com que o usuário já esteja acostumado com o layout da página quando esta carregar as informações. Outro ponto é que foi utilizado um botão de carregar mais produtos, pois estudos indicaram que esta é a abordagem mais eficiente, ao invés de scroll infinito ou páginas de conteúdo.
  
  O site é a parte da loja da farmácia, principalmente. Nele, é possível visualizar os produtos e comprá-los, além de possuir funcionalidades de cadastro e login e alteração das informações da conta do usuário. Também existe a possibilidade de recuperar a senha caso o usuário esqueça da senha que criaram anteriormente. Para isso, o usuário informa o e-mail cadastrado (o que é checado contra o banco de dados, e, se não houver cadastros com esse e-mail, um erro é retornado) e recebe, neste e-mail, um link com um token único para a redefinição da senha. 
  
  Falando em senha, nós não salvamos a senha em plain-text no banco. A senha recebe um salt e depois passa por um processo de hash, e só aí é guardada no banco, para evitar que, caso o banco seja comprometido, as senhas continuarão escondidas na medida do possível.
  
  
## Agradecimentos
  Aqui, eu quero agradecer principalmente a duas pessoas: ao meu professor e coordenador de curso, Luiz Ricardo, que deu apoio à toda a minha sala e me permitiu usar tecnologias, e ao meu amigo de curso, [@savioacp](https://github.com/savioacp), que me ensinou muitas coisas úteis para o meu projeto.
  
 
# Rodando o projeto no seu PC
## Requisitos
 Para rodar o projeto, é necessário ter o NodeJS instalado, preferencialmente na última versão estável. Para instalá-lo, basta acessar o [site oficial do Node](https://nodejs.org/en/download/) e seguir os passos de instalação de acordo com o seu sistema. Além disso, é necessário ter o MSSQL instalado no PC também.
 

## Instalando dependências
  Para instalar as dependências do projeto, basta abrir o diretório do backend no PowerShell ou algum outro terminal de sua escolha e rodar o comando ```npm install```. Aguarde e ele instalará tudo do backend. Faça o mesmo no frontend.
  
  
## Preparando o banco de dados
Primeiramente, é necessário criar o banco de dados com o nome "MedicareDev" no MSSQL. Além disso, é preciso [abrir a conexão TCP/IP](https://docs.microsoft.com/pt-br/sql/database-engine/configure-windows/configure-a-server-to-listen-on-a-specific-tcp-port?view=sql-server-ver15) deste, na porta padrão (1433). Depois, entre [neste link](https://mockaroo.com/c350e0f0), clique em "Download data", copie todo o conteúdo do arquivo e insira na tabela MedicareDev.


## Iniciando a aplicação
Abra o diretório do backend no PowerShell ou no terminal de sua escolha. Então, use o comando ``npm run dev``. Aguarde aparecer "server started in localhost:3333". Depois, abra o diretório do frontend em outra janela do terminal e rode o comando ``npm run start``. Depois de um tempo, uma janela do navegador deve abrir com o projeto aberto.

# Obrigado por ter lido até aqui!


---


# Project Introduction
This is the website of the term project of group A. This is the final version. The application consists in a backend made in Node and a frontend made in React, both using TypeScript. 

On the backend, the main technologies used were Node, GraphQL, TypeGraphQL, Express, Apollo Server and TypeORM.

On the frontend, the main technologies used were React, Styled Components, Apollo Client, Recoil, Formik and ChakraUI.

For authentication, I used JWTs and a cookie for refreshing the token every 15 minutes, to keep the user logged in but always with a fresh token.

The database used for the project was Micrososft SQL Server (MSSQL).


## Project's concepts and features
Me and my group's term project is like a drug store, and it's main objective is to facilitate our users' lives, specially the elderly, as they usually face many difficulties with techonology. This objective can be seen clearly when you look at how the site was designed. Most things are not implicit, but rather explicit, in order to not confuse our users. There are also Skeletons in almost all pages, so that the user is already familiar with the UI when the page content loads. Also, the way to load more products in the main page is clicking a "load more" button, because it caused the best overall effects for the system I was building.

The main feature of the site is the store. A user can buy stuf and see how it's orders are going. Also, the user can sing up, login and create a new password in case they forgot the old one or just want to change it. For this, the user will need to provide the email address used to sign the user up. If the email address doesn't belong to any signed up user, the site will tell it to the person so they can create their account. If it does belong to someone, an email is sent to the address provided with a link that contains a unique token. The user can then click the link and update their password.

Also, the api doesn't save the user's password in plain text, it actuaylly prepends a salt to the password and then hash it all. This way, we can be sure that the passwords are as safe as possible, even in the case that the database is exposed.


## Thanking some people
I want to use this space to thank my professor and course coordinator Luiz Ricardo, that always helped me and my colleagues and let me use all these technologies we didn't learn in the course. I also want to thank my friend [@savioacp](https://github.com/savioacp), who helped and taught me a lot during this whole process.


# Running the application
## Requirements
The only requirements are to have MSSQL and NodeJS installed (in the latest version, please). To install Node, just enter [the official NodeJS website](https://nodejs.org/en/download/) and follow the instructions for your system.


## Installing dependencies
Just open the backend folder in the terminal of your choice, then run ``npm instlal``. Do the same thin in the frontend folder.


## Readying the database
The first thing you need to do is to create a database called "MedicareDev" in MSSQL. Then, you need to open a port for TCP/IP connections on MSSQL (if you don't know how, follow [this guide](https://docs.microsoft.com/pt-br/sql/database-engine/configure-windows/configure-a-server-to-listen-on-a-specific-tcp-port?view=sql-server-ver15)) and keep the default port (1433). Then, populate the database by entering [this link](https://mockaroo.com/c350e0f0) and clicking on "download data". Just copy all the file's content and insert everything on the database.


## Starting the app
Enter the backend folder in the terminal of your choice and run ``npm run dev``. Wait until it appears "... in localhost:3333", and then go to the frontend folder in another terminal window. Then, run ``npm run start`` and wait until a browser window opens. The project should be running.


# Thanks for reading!
