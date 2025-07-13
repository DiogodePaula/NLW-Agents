# Configuração de Formatação - ESLint e Prettier

## Instalar Dependências

Para instalar as dependências necessárias, execute:

```bash
# Instalar dependências do ESLint
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Instalar dependências do Prettier
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

## Scripts Disponíveis

```bash
# Verificar problemas de linting
npm run lint

# Corrigir problemas de linting automaticamente
npm run lint:fix

# Formatar código com Prettier
npm run format

# Verificar se o código está formatado corretamente
npm run format:check
```

## Configuração do VS Code

Para melhor integração com o VS Code, instale as extensões:

- ESLint
- Prettier - Code formatter

E configure no `settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
