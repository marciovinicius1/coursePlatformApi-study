# **✨Rest API com MySQL**

Uma REST API Node.js que possui as funcões CRUD, autenticação e autorização de usuário e estruturas desacopladas prontas para aplicação de testes unitários.

Essa projeto foi pensado para possuir funções CRUD semelhantes a uma plataforma de ensino. Onde são criados 2 tipos de usuários Professores(admins) e Alunos (users). O principal foco desse projeto é a utlização devida do banco de dados sequencial MySQL utilizando Sequlize ORM, tambem a criação de estruturas desacopladas para um futura aplicação de testes unitários.

A API Possui os models de Usuário (Professor e Aluno) e Cursos, onde é possível um usário que possui as Funções Admin atribuida em seu cadrastro através do serviço de autorização (ACL), Realizar cadastro de novos Cursos e relacionar Usuarios e Cursos. Ao Usuário comum só é permitido acessar rotas Controladas pela sua role, por padrão a role atribuida a um novo usuário é admin, porem é possível criar um usuário limitado (Aluno) passando `role: user` no corpo da requisição durante a criação do mesmo.

## **🛠️ Tecnologias:**

### _As seguintes ferramentas foram usadas na construção do projeto:_

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Json Web Token: JWT](https://jwt.io/)
- [Express ACL](https://www.npmjs.com/package/express-acl)

---

## **🚀 Features**

- [ ✅ ] Cadastro de usuário
- [ ✅ ] Authenticação JWT
- [ ✅ ] Sistema de autorização de usuário por Cargo (ACL)
- [ ✅ ] Funções CRUD
- [ ✅ ] Associação de tabelas (usuário - curso)
- [ 🔧 ] Testes unitários [ EM BREVE ]

---

## 📌**Notas**

### _🔹Algumas observações sobre práticas aplicadas ao projeto_

- **Adicionado graceful shutdown para finalizar a operação do servidor da melhor forma.**
  - utiliza-se sinais de comunicação entre processos do sistema operacional, para finalizar a aplicação sem que ela esteja no meio de uma requisição ou utilizando algum outro serviço como banco de dados.

* **Abstração das rotas públicas onde não é necessário o serviço Authenticação e Autorização (como recuperação de senha e criação de usuário).**

* **Controllers totalmente desacoplados, para tornar o código mais modular e consequentemente mais testável.**

* **Validações aplicadas nos models.**

### _🔹Sobre o serviços do sistema_

- **Serviço ACL: Access Control List**
  - Adicionado o atributo Admin para o model de usuário o qual cede autorização para adição de curso para demais usuários.
  - A role default é Admin, mas caso seja passado o atributo role:"user" durante a criação o usuário ficará com o acesso limitado a aluns recursos da API.

* **Criado Serviço e Controlador de Associação e recuperação de senha**
  - Serviço: verifica os dados e Associa um curso ao usuário. - Controlador: uma classe que recebe os models e o serviço que contém os métodos da rota de associação.
  - recuperação de senha: caso o email exista é gerado um link contendo um Token jwt, quando o token descriptografado contem o id do usuário, logo depois é efetuada uma busca para alteração da senha. (futuramente o link seria enviado para o email através de outro serviço)

---

---

## Como instalar o projeto

### Backend (API)

- Para download do projeto siga as instruções a baixo:

```
1. git clone https://github.com/Marciovinicius1/coursePlatformApi-study
2. cd api
```

- Instale as dependencias e inicie o servidor:

```
3. yarn install
4. yarn dev
```

ou

```
3. npm install
4. npm dev
```

Renomei o arquivo `.env.example` para `.env`, crie suas variáveis de ambiente e subistitua no arquivo. Isso é muito importante para inicializar o projeto.

Também, faça download do arquivo [Insominia](https://insomnia.rest/download) contendo as rotas para chamadas na api, Faça o download [aqui](https://github.com/Marciovinicius1/insomnia-palataforma-de-cursos).

### 🚨 **Documentação completa em breve...**
