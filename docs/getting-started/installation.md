# 🚀 Instalação

Este guia irá ajudá-lo a configurar o Dashboard Executivo de Progresso em seu ambiente de
desenvolvimento.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18.17 ou superior
- **pnpm** 8.0 ou superior (recomendado) ou **npm** 9.0+
- **Git** para clonar o repositório

### Verificando as versões

\`\`\`bash
node --version
# v18.17.0 ou superior

pnpm --version
# 8.0.0 ou superior

git --version
# 2.30.0 ou superior
\`\`\`

## 🔧 Instalação

### 1. Clonar o repositório

\`\`\`bash
git clone https://github.com/seu-usuario/dashboard-executivo-de-progresso.git
cd dashboard-executivo-de-progresso
\`\`\`

### 2. Instalar dependências

\`\`\`bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install
\`\`\`

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edite o arquivo `.env.local` com suas configurações:

\`\`\`env
# Configurações do Next.js
NEXT_PUBLIC_APP_NAME="Dashboard Executivo de Progresso"
NEXT_PUBLIC_APP_VERSION="0.1.0"

# Configurações de API (se necessário)
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Configurações de analytics (opcional)
NEXT_PUBLIC_GA_ID=""
\`\`\`

### 4. Executar o projeto

\`\`\`bash
# Modo desenvolvimento
pnpm dev

# Ou usando npm
npm run dev
\`\`\`

O projeto estará disponível em <http://localhost:3000>.

## 🧪 Verificação da instalação

### Executar testes

\`\`\`bash
# Verificar qualidade do código
pnpm quality:check

# Executar linter
pnpm lint

# Verificar formatação
pnpm format:check
\`\`\`

### Build de produção

\`\`\`bash
# Construir para produção
pnpm build

# Iniciar servidor de produção
pnpm start
\`\`\`

## 🔍 Solução de problemas

### Erro de dependências

Se encontrar problemas com dependências:

\`\`\`bash
# Limpar cache
pnpm store prune

# Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
\`\`\`

### Erro de build

Se o build falhar:

\`\`\`bash
# Verificar versão do Node.js
node --version

# Limpar cache do Next.js
rm -rf .next

# Tentar build novamente
pnpm build
\`\`\`

### Problemas de permissão (Linux/macOS)

\`\`\`bash
# Corrigir permissões
sudo chown -R $USER:$USER .

# Ou usando pnpm
pnpm install --unsafe-perm
\`\`\`

## 📱 Próximos passos

Após a instalação bem-sucedida:

1. **[Primeiros Passos](quick-start.md)** - Aprenda a usar o dashboard
2. **[Arquitetura](architecture.md)** - Entenda a estrutura do projeto
3. **[Componentes](../components/)** - Explore os componentes disponíveis
4. **[Deploy](../deployment/)** - Aprenda a fazer deploy

## 🆘 Precisa de ajuda?

Se encontrar problemas durante a instalação:

- Verifique os [Issues](https://github.com/seu-usuario/dashboard-executivo-de-progresso/issues)
  existentes
- Abra um novo [Issue](https://github.com/seu-usuario/dashboard-executivo-de-progresso/issues/new)
- Entre em contato: suporte@gb-locacoes.com

---

**Próximo**: [Primeiros Passos](quick-start.md) →
