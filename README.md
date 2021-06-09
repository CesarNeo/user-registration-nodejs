# userregistration - Cadastro de usuários

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable), [Docker](https://docs.docker.com/engine/install/). 

Instalar o PostgreSQL
```bash
$ docker run --name nomedaimagem -e POSTGRES_PASSWORD=suasenha -d postgres
```
Criar no bando do PostgreSQL uma database com o nome de "user_registration_db", para conseguir fazer isso, é nescessário ter alguma ferramenta para acessar o banco de dados. Ex: [DBeaver](https://dbeaver.io/) ou [Postbird](https://www.electronjs.org/apps/postbird).

Clonar o projeto e editar o arquivo com o nome "ormconfig.json" na pasta local do projeto mudando apenas a senha do banco para a sua senha.

Executar o comando "yarn" para instalar todas as dependências do projeto.

Executar o comando:
```bash
 yarn typeorm migration:run
```
para criar as tabelas no banco de dados.

### Rodando a aplicação
Para inciar a aplicação basta executar esse comando:
```bash
 yarn dev:server
```
