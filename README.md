# API REST do NevoHUB System

Esta é a API central para o sistema NevoHUB. Abaixo estão os endpoints disponíveis e as próximas tarefas de desenvolvimento.

## 🚀 Endpoints Atuais

### Autenticação e Usuários

* **Criar Usuário**
    * **Método:** `POST`
    * **URL:** `/api/users`
    * **Corpo (JSON):**
        ```json
        {
            "username": "nome_usuario",
            "password": "sua_senha",
            "role": "ADMINISTRADOR" 
        }
        ```

* **Fazer Login**
    * **Método:** `POST`
    * **URL:** `/api/login`
    * **Corpo (JSON):**
        ```json
        {
            "username": "nome_usuario",
            "password": "sua_senha"
        }
        ```

### Clientes

* **Criar Cliente:** `POST /api/clients`
* **Listar Todos os Clientes:** `GET /api/clients`
* **Buscar um Cliente por ID:** `GET /api/clients/:id`
* **Atualizar um Cliente:** `PUT /api/clients/:id`
* **Excluir um Cliente:** `DELETE /api/clients/:id`

### Endereços

* **Criar Endereço para um Cliente:** `POST /api/addresses`
* **Listar Endereços de um Cliente:** `GET /api/clients/:clientId/addresses`
* **Atualizar um Endereço:** `PUT /api/addresses/:id`
* **Excluir um Endereço:** `DELETE /api/addresses/:id`

---

## 📝 Próximos Passos / Tarefas (Backend)

O foco agora é construir os módulos de **Financeiro** e **Preços**.

### 1. Módulo Financeiro

O objetivo é criar um sistema para registrar todas as transações financeiras (ganhos e despesas).

#### **Banco de Dados (Tabela `transactions`)**
Adicionar a seguinte tabela ao `src/database/init-db.js`:
```sql
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount INTEGER NOT NULL, -- Valor em centavos para evitar problemas com ponto flutuante
    type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')), -- 'INCOME' para ganhos, 'EXPENSE' para despesas
    transaction_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
> **Nota:** É uma boa prática armazenar valores monetários como inteiros (centavos) para garantir a precisão dos cálculos. Por exemplo, R$ 19,99 seria armazenado como `1999`.

#### **API Endpoints a Serem Criados**
* `POST /api/transactions`: Cria uma nova transação (ganho ou despesa).
* `GET /api/transactions`: Lista todas as transações. Pode incluir filtros por mês e ano (ex: `/api/transactions?month=10&year=2025`).
* `PUT /api/transactions/:id`: Atualiza uma transação.
* `DELETE /api/transactions/:id`: Exclui uma transação.

---

### 2. Módulo de Preços de Produtos

O objetivo é criar uma tabela simples para associar um SKU de produto a um preço.

#### **Banco de Dados (Tabela `prices`)**
Adicionar a seguinte tabela ao `src/database/init-db.js`:
```sql
CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT UNIQUE NOT NULL,
    price REAL NOT NULL -- Usando REAL para valores com casas decimais
);
```

#### **API Endpoints a Serem Criados**
* `POST /api/prices`: Adiciona um novo preço para um SKU.
* `GET /api/prices`: Lista todos os preços e SKUs.
* `GET /api/prices/:sku`: Busca o preço de um SKU específico.
* `PUT /api/prices/:sku`: Atualiza o preço de um SKU.
* `DELETE /api/prices/:sku`: Remove o preço de um SKU.

### Como Contribuir

1.  Atualize o arquivo `src/database/init-db.js` com a(s) nova(s) tabela(s).
2.  Rode `node src/database/init-db.js` para criar a tabela no banco.
3.  Crie o novo Controller em `src/controllers/` (ex: `FinancialController.js`).
4.  Crie o novo arquivo de Rotas em `src/routes/` (ex: `financialRoutes.js`).
5.  Importe e use as novas rotas no arquivo `src/app.js`.
6.  Teste os novos endpoints com uma ferramenta de API (Insomnia, Postman, etc.).
