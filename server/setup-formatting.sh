#!/bin/bash

echo "🚀 Configurando formatação de código..."

# Instalar dependências do ESLint
echo "📦 Instalando dependências do ESLint..."
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Instalar dependências do Prettier
echo "✨ Instalando dependências do Prettier..."
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

# Executar formatação inicial
echo "🔧 Aplicando formatação inicial..."
npm run format

echo "✅ Configuração concluída!"
echo ""
echo "📋 Scripts disponíveis:"
echo "  npm run lint        - Verificar problemas de linting"
echo "  npm run lint:fix    - Corrigir problemas automaticamente"
echo "  npm run format      - Formatar código"
echo "  npm run format:check - Verificar formatação"
echo ""
echo "🎯 Instale as extensões do VSCode recomendadas para melhor experiência!"
