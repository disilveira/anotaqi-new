# AnotaQi App

![](https://anotaqi.herokuapp.com/img/logo.png)

Sistema: [https://anotaqi.herokuapp.com](https://anotaqi.herokuapp.com)

# Node

```
node start

```

# Docker

```

docker build -t nodejs-anotaqi .
docker run -p 80:3000 -d nodejs-anotaqi

```

Este aplicativo foi desenvolvido pelos alunos do curso de Desenvolvimento Web Full Stack da universidade PUC Minas. Desenvolvido em node, o aplicativo tem os seguintes recursos:

- Banco de dados MongoDB.
- Todas as senha são criptografadas pelo Bcryptjs.
- Autenticação utilizando o módulo Passport.
- Cadastro, edição e remoção de notas do usuário.
- Cadastro, edição e remoção de tarefas das notas cadastradas.

# Equipe do projeto

- Diego
- Demian
- Denis