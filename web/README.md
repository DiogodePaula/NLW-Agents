# NLW Agents - Frontend

Frontend do projeto NLW Agents desenvolvido durante o evento da Rocketseat.

## 🚀 Tecnologias Utilizadas

-   **React** - Biblioteca para construção de interfaces de usuário
-   **TypeScript** - Superset do JavaScript com tipagem estática
-   **Vite** - Build tool e bundler moderno
-   **Tailwind CSS** - Framework CSS utilitário para estilização
-   **React Router DOM** - Roteamento no lado do cliente
-   **React Query** - Gerenciamento de estado servidor e cache
-   **Radix UI** - Componentes acessíveis e sem estilo
-   **Lucide React** - Biblioteca de ícones
-   **Class Variance Authority** - Utilitário para variantes de componentes
-   **Tailwind Merge** - Utilitário para merge de classes Tailwind

## 📁 Estrutura do Projeto

```
web/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   │   └── ui/        # Componentes de interface
│   ├── pages/         # Páginas da aplicação
│   ├── lib/           # Utilitários e configurações
│   ├── app.tsx        # Componente principal da aplicação
│   └── main.tsx       # Ponto de entrada
├── public/            # Arquivos estáticos
└── index.html         # Template HTML
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

-   Node.js 18+
-   npm ou yarn

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o backend

Certifique-se de que o backend está rodando em `http://localhost:3333`

## 🚀 Executando o Projeto

### Modo de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build de produção

```bash
npm run build
```

### Prévia do build

```bash
npm run preview
```

## 📋 Scripts Disponíveis

-   `npm run dev` - Inicia o servidor de desenvolvimento
-   `npm run build` - Gera build otimizado para produção
-   `npm run lint` - Executa o linter para verificar problemas no código
-   `npm run preview` - Serve o build de produção localmente

## 🎨 Componentes

### Componentes de UI

-   **Button** - Botão customizável com variantes
-   Outros componentes baseados em Radix UI

### Páginas

-   **Create Room** - Página para criar salas
-   **Room** - Página da sala individual

## 🛠️ Configurações

### Tailwind CSS

Configurado com:

-   Variáveis CSS personalizadas
-   Classes utilitárias customizadas
-   Tema responsivo

### TypeScript

-   Configuração strict habilitada
-   Paths absolutos configurados
-   Tipagem completa da aplicação

### Vite

-   Hot Module Replacement (HMR)
-   Otimizações de build
-   Configuração de plugins React
