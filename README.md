Bem-vindo ao back-end do NevoHUB! Esta é uma API RESTful construída com Node.js, Express e SQLite, responsável por toda a lógica de negócio, gerenciamento de dados e autenticação de usuários da aplicação.

🚀 Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript no servidor.

Express.js: Framework para criação do servidor e das rotas da API.

SQLite3: Banco de dados SQL leve e baseado em arquivo.

jsonwebtoken (JWT): Para gerar tokens de autenticação seguros.

bcryptjs: Para criptografar senhas de forma segura.

CORS: Para permitir a comunicação entre este back-end e o front-end React.

Nodemon: Para reiniciar o servidor automaticamente durante o desenvolvimento.

📋 Pré-requisitos
Antes de começar, garanta que você tenha instalado:

Node.js (versão 20.x ou superior)

npm (geralmente vem com o Node.js)

Uma ferramenta de teste de API como Insomnia, Postman ou a extensão Thunder Client do VS Code.

⚙️ Guia de Instalação e Configuração
Siga estes passos para ter o ambiente de desenvolvimento rodando na sua máquina:

1. Clone o Repositório:

Bash

git clone <URL_DO_SEU_REPOSITORIO_GITHUB>
2. Navegue até a Pasta do Backend:

Bash

cd NevoHUB-System/back-end
3. Instale as Dependências:

Bash

npm install
4. Crie o Arquivo de Variáveis de Ambiente:
Crie um arquivo chamado .env na raiz da pasta back-end e adicione a seguinte linha. Este segredo é usado para assinar os tokens de autenticação.

JWT_SECRET=QUALQUER_FRASE_LONGA_E_SECRETA_AQUI
Importante: O arquivo .env nunca deve ser enviado para o GitHub!

5. Inicialize o Banco de Dados:
Este comando cria o arquivo do SQLite e a tabela de usuários. Execute apenas uma vez.

Bash

node src/database/init-db.js
▶️ Rodando o Servidor
Para iniciar o servidor em modo de desenvolvimento (com reinicialização automática), use:

Bash

npm run dev
Você verá a mensagem: Servidor da API rodando na porta 3333.

📂 Estrutura do Projeto
src/: Contém todo o código fonte da aplicação.

controllers/: A lógica de negócio (o que fazer quando uma rota é acessada).

routes/: A definição dos endpoints da API (ex: /users, /login).

database/: Configuração e inicialização do banco de dados SQLite.

app.js: Configurações do Express (middlewares, rotas, etc.).

server.js: O ponto de entrada que inicia o servidor.

Endpoints Já Criados
Atualmente, temos dois endpoints funcionais para autenticação:

1. Criar Usuário
Rota: POST /api/users

Descrição: Cria um novo usuário no banco de dados.

Corpo (Body) da Requisição (JSON):

JSON

{
    "username": "nome_de_usuario",
    "password": "uma_senha_forte",
    "role": "ADMINISTRADOR" // ou "FUNCIONARIO"
}
2. Fazer Login
Rota: POST /api/login

Descrição: Autentica um usuário e retorna um token JWT.

Corpo (Body) da Requisição (JSON):

JSON

{
    "username": "nome_de_usuario",
    "password": "uma_senha_forte"
}
Resposta de Sucesso: Retorna um token que deverá ser usado para acessar rotas protegidas.

🤝 Como Ajudar (Próximos Passos)
O foco agora é expandir a API para gerenciar os dados do dashboard. Algumas tarefas que precisamos fazer:

Criar o CRUD de Produtos:

POST /api/products (Criar produto)

GET /api/products (Listar todos os produtos)

GET /api/products/:id (Buscar um produto)

PUT /api/products/:id (Atualizar um produto)

DELETE /api/products/:id (Deletar um produto)

Criar as Rotas de Pedidos:

Precisamos de rotas para gerenciar os status dos pedidos que definimos no front-end (Aberto, Em produção, Finalizado, etc.).

Criar um Middleware de Autenticação:

Precisamos criar uma função que verifique o token JWT em cada requisição para as novas rotas (produtos, pedidos, etc.), garantindo que apenas usuários logados possam acessá-las.

Qualquer dúvida, é só perguntar!
