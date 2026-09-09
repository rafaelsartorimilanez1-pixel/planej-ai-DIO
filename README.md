# PlanejAI

Aplicação web desenvolvida para ajudar pessoas a planejar metas financeiras de forma prática, visual e inteligente. O projeto foi pensado para transformar uma necessidade real — controlar orçamento, entender a saúde financeira e alcançar objetivos — em uma interface simples e útil, com foco em experiência do usuário e decisões financeiras mais conscientes.

## Objetivo do projeto

O PlanejAI foi criado para auxiliar usuários a:

- calcular o valor necessário para alcançar uma meta financeira;
- entender melhor a relação entre renda, gastos e dívidas;
- visualizar em poucos minutos qual é o esforço mensal necessário para atingir um objetivo;
- receber recomendações personalizadas por inteligência artificial com base no perfil financeiro informado.

Além disso, o projeto tem um forte valor de portfólio: demonstra habilidades em desenvolvimento frontend, lógica financeira, integração com APIs, design de interfaces e experiência de usuário.

## Funcionalidades

- Formulário guiado para cadastro de meta financeira e dados do perfil do usuário
- Cálculo automático da economia mensal necessária para atingir a meta
- Visualização de indicadores como renda, gastos fixos, dívidas e prazo
- Histórico de simulações salvas no navegador
- Detalhamento do resultado com análise financeira estruturada
- Insights inteligentes gerados pela API do Google Gemini
- Sugestões de renda extra, investimentos e estratégias de melhorias financeiras
- Tema claro/escuro
- Layout responsivo para uso em desktop e mobile

## Stack tecnológica

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Google Gemini API
- Local Storage

## Como funciona

1. O usuário informa a meta financeira desejada, o valor total, o prazo e dados da sua situação atual.
2. A aplicação calcula a economia mensal necessária para cumprir o objetivo.
3. O sistema organiza esses dados em um resumo claro e objetivo.
4. A partir das informações informadas, a IA gera recomendações personalizadas com foco em viabilidade, diagnóstico financeiro e próximos passos.
5. A simulação pode ser consultada novamente no histórico do projeto.

## Demonstração da proposta

Este projeto mostra uma aplicação funcional de planejamento financeiro, com foco em:

- usabilidade;
- clareza na apresentação dos dados;
- automação de decisões via IA;
- organização visual e experiência do usuário.

É uma solução ideal para demonstrar competências em frontend moderno, integração com serviços externos e desenvolvimento de produtos com foco em solução real.

## Estrutura do projeto

```text
src/
├── components/     # Componentes visuais e reutilizáveis
├── data/           # Formulários, prompts e modelos de dados
├── hooks/          # Lógica de estado e persistência local
├── pages/          # Páginas da aplicação
├── services/       # Integrações externas, incluindo Gemini
├── styles/         # Estilos globais e tema
├── utils/          # Funções de cálculo e utilitários
├── App.tsx         # Componente principal
├── router.tsx      # Configuração de rotas
└── main.tsx        # Inicialização da aplicação
```

## Rotas principais

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial com a simulação financeira |
| `/resultado/:id` | Resultado detalhado da simulação |
| `/historico` | Histórico de simulações salvas |

## Pré-requisitos

- Node.js 20+
- npm
- Chave da API do Google Gemini para ativar os insights de IA

## Instalação

Clone o repositório:

```bash
git clone https://github.com/rafaelsartorimilanez1-pixel/planej-ai-DIO.git
cd planej-ai-DIO
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_do_google_gemini
```

> Importante: a chave da API deve ser mantida em segurança e nunca compartilhada publicamente.

## Execução local

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

## Build de produção

```bash
npm run build
```

## Validação

```bash
npm run lint
```

## Diferenciais do projeto para portfólio

- aplicação funcional com foco em problema real;
- integração com IA para gerar valor adicional;
- uso de boas práticas em frontend moderno;
- lógica financeira aplicada ao desenvolvimento;
- visual limpo e voltado para experiência de usuário;
- projeto demonstrável em entrevistas e apresentações.

## Contribuição

Contribuições são bem-vindas. Para sugerir melhorias:

1. faça um fork do projeto;
2. crie uma branch para sua feature;
3. implemente a alteração;
4. abra um pull request com detalhamento da mudança.

## Licença

Este projeto foi desenvolvido com foco educacional e para apresentação profissional. Consulte o repositório para verificar o status da licença antes de reutilizar o código.
