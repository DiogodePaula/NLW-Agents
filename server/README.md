# NLW Agents

Projeto desenvolvido durante o evento NLW (Next Level Week) da Rocketseat.

## 🚀 Tecnologias Utilizadas

### Backend (server/)

-   **Node.js** - Runtime JavaScript
-   **Fastify** - Framework web rápido e eficiente
-   **TypeScript** - Superset do JavaScript com tipagem estática
-   **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
-   **PostgreSQL** - Banco de dados relacional
-   **PgVector** - Extensão do PostgreSQL para vetores
-   **Zod** - Validação de esquemas TypeScript
-   **Docker** - Containerização do banco de dados

### Frontend (web/)

-   **React** - Biblioteca para interfaces de usuário
-   **TypeScript** - Superset do JavaScript com tipagem estática
-   **Vite** - Build tool e bundler
-   **Tailwind CSS** - Framework CSS utilitário
-   **React Router** - Roteamento no React
-   **React Query** - Gerenciamento de estado servidor
-   **Radix UI** - Componentes acessíveis
-   **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
NLW-Agents/
├── server/          # API Backend
│   ├── src/
│   │   ├── db/      # Configuração do banco e schemas
│   │   ├── http/    # Rotas da API
│   │   └── env.ts   # Variáveis de ambiente
│   └── docker-compose.yml
└── web/             # Frontend React
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── lib/
    └── public/
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

-   Node.js 18+
-   Docker e Docker Compose
-   Git

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd NLW-Agents
```

### 2. Configuração do Backend

```bash
cd server
npm install
```

### 3. Configuração do Banco de Dados

```bash
# Subir o banco PostgreSQL com Docker
docker compose up -d

# Executar migrações
npx drizzle-kit migrate

# Popular o banco com dados iniciais (opcional)
npm run db:seed
```

### 4. Configuração das Variáveis de Ambiente

Crie um arquivo `.env` no diretório `server/` com:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:7788/agents
```

### 5. Configuração do Frontend

```bash
cd ../web
npm install
```

## 🚀 Executando o Projeto

### Backend

```bash
cd server
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

### Frontend

```bash
cd web
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📋 Scripts Disponíveis

### Backend

-   `npm run dev` - Executa o servidor em modo de desenvolvimento
-   `npm run build` - Compila o TypeScript
-   `npm run db:seed` - Popular o banco com dados iniciais
-   `npm run lint` - Verifica problemas de código
-   `npm run format` - Formata o código

### Frontend

-   `npm run dev` - Executa o frontend em modo de desenvolvimento
-   `npm run build` - Gera build de produção
-   `npm run preview` - Prévia do build de produção

## 🎯 Padrões de Projeto

-   **Arquitetura em Camadas** - Separação clara entre rotas, serviços e acesso a dados
-   **Type Safety** - Uso extensivo do TypeScript para garantir tipagem
-   **Validação de Dados** - Schemas Zod para validação de entrada
-   **Componentização** - Componentes reutilizáveis no frontend
-   **Configuração Centralizada** - Variáveis de ambiente e configurações centralizadas
