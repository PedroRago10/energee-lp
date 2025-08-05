# Energee - Plataforma de Energia Compartilhada

## 📋 Sobre o Projeto

A **Energee** é uma plataforma digital moderna desenvolvida para conectar famílias brasileiras ao futuro da energia renovável através do modelo de energia compartilhada. O projeto visa democratizar o acesso à energia solar, permitindo que usuários participem de fazendas solares e reduzam significativamente suas contas de energia elétrica.

## 🚀 Funcionalidades Principais

### Portal Principal
- **Landing Page Responsiva**: Interface moderna e otimizada para conversão
- **Simulador de Economia**: Cálculo personalizado de economia na conta de energia
- **Sistema de Cadastro**: Formulário completo para participação no programa
- **Seções Informativas**: 
  - Como funciona o modelo de energia compartilhada
  - Benefícios e diferenciais do serviço
  - Planos disponíveis
  - Depoimentos de clientes
  - FAQ completo

### Painel Administrativo
- **Dashboard Analytics**: Métricas de performance e conversão
- **Gerenciamento de Conteúdo**: Editor completo para textos e imagens
- **Gestão de Planos**: CRUD completo para planos de energia
- **Controle de FAQs**: Sistema para gerenciar perguntas frequentes
- **Formulários**: Visualização e gestão de leads capturados
- **Configurações**: Personalização de textos e configurações gerais

### Integrações
- **WhatsApp Business**: Integração direta para atendimento
- **Analytics Avançado**: Tracking de eventos e conversões
- **Banco de Dados**: Supabase para backend completo
- **Autenticação**: Sistema seguro de login administrativo

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática para maior robustez
- **Vite** - Build tool moderna e performática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de interface modernos
- **React Router DOM** - Roteamento SPA
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Biblioteca de ícones

### Backend & Banco de Dados
- **Supabase** - Backend as a Service completo
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security (RLS)** - Segurança avançada de dados
- **Edge Functions** - Funções serverless

### Ferramentas de Desenvolvimento
- **ESLint** - Linting e padronização de código
- **TanStack Query** - Gerenciamento de estado server
- **Zod** - Validação de schemas
- **Date-fns** - Manipulação de datas

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### 1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd energee-platform
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configuração do Ambiente
```bash
# Configure as variáveis de ambiente no Supabase
# O projeto usa integração nativa com Supabase
```

### 4. Execute o projeto
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais
- **form_submissions** - Armazena leads capturados
- **content_management** - Conteúdo editável do site
- **plans** - Planos de energia disponíveis
- **faqs** - Perguntas frequentes
- **settings** - Configurações gerais
- **analytics_events** - Eventos de tracking

### Políticas de Segurança
- RLS habilitado em todas as tabelas
- Acesso administrativo restrito
- Logs de auditoria automáticos

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:
- **Tokens semânticos** definidos em `index.css`
- **Componentes reutilizáveis** com variantes
- **Responsividade** mobile-first
- **Modo escuro/claro** (em desenvolvimento)
- **Animações** sutis com scroll-reveal

## 📊 Analytics e Tracking

### Eventos Monitorados
- Visualizações de página
- Cliques em CTAs
- Submissões de formulários
- Interações com WhatsApp
- Navegação entre seções

### Métricas de Conversão
- Taxa de conversão geral
- Performance por fonte de tráfego
- Funil de conversão detalhado
- Dados demográficos dos leads

## 🔧 Personalização

### Conteúdo Editável
Todo o conteúdo principal pode ser editado através do painel administrativo:
- Textos de seções
- Imagens e logos
- Planos e preços
- FAQs
- Configurações de contato

### Componentes Modulares
- Seções independentes e reutilizáveis
- Hooks customizados para lógica comum
- Utilidades compartilhadas

## 🚀 Deploy e Produção

### Deploy Automático
O projeto está configurado para deploy automático na Vercel com:
- Build otimizado
- Compressão de assets
- CDN global
- HTTPS automático

### Monitoramento
- Error tracking integrado
- Performance monitoring
- Analytics em tempo real

## 👨‍💻 Desenvolvedor

**Pedro Rago**
- Desenvolvedor Full Stack especializado em React e TypeScript
- Experiência em soluções web escaláveis e performáticas
- Foco em UX/UI e conversão digital

## 📄 Licença

Este projeto é propriedade privada. Todos os direitos reservados.

---

### 📞 Suporte

Para dúvidas técnicas ou comerciais, entre em contato através dos canais disponíveis na plataforma.

**Energia Compartilhada - O Futuro é Agora! ⚡**