# FastFeet

Projeto realizado para centificação pela Rocketseat.

Todo o Projeto foi divivido em 3 pastas.

Web <br>
Mobile<br>
Backend<br>

## Backend


Foi incluído um json exportado do insomnia com requisição a todas as rotas e mais diversas operações utilizadas durante o desafio.

É necessário criar um arquivo .env com as variáveis referente a maquina de quem estiver usando.(Existe um .env.example com as variáveis necessárias).
Apesar de haver algumas a mais só é necessário as de Auth,Database e Mail as demais não são usadas nesse projeto.

Durante todo o desafio foi utilizado um o banco relacional postgresql no docker, a criação de um banco de dados tem que ser realizada de forma manual, no demais existem migrations e seeds na pasta backend/src/database.

Após a criação do banco e a certificação que o mesmo está com as variáveis corretas no .env é necessário rodar os comandos.
yarn sequelize db:migrate
e
yarn sequelize db:seed:all


Além disso não esquecer de rodar um yarn, uma vez que não subimos a pasta node_modules.

## Web

Necessário atualizar variável que aponta para a API em web/src/services/api.

Além disso não esquecer de rodar um yarn, uma vez que não subimos a pasta node_modules.

## Mobile

Atenção.: O aplicativo foi realizado utilizando em conta apenas o Android.

Necessário atualizar variável que aponta para a API em mobile01/src/services/api.

Além disso não esquecer de rodar um yarn, uma vez que não subimos a pasta node_modules.








