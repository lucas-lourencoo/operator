# Especificação de Implementação: tRPC v11 + TanStack Query v5

Esta especificação detalha a configuração do **tRPC v11** integrado ao **TanStack Query v5** para o projeto **devroast**, seguindo as melhores práticas para **Next.js 15 (App Router)** e **React 19**, com suporte completo a Server Components e Streaming.

## 🎯 Objetivo
Substituir ou complementar as chamadas diretas ao banco de dados e Server Actions por uma camada de API tipada (tRPC). Isso garantirá segurança de tipos de ponta a ponta (end-to-end type safety) entre o back-end e o front-end, facilitando o consumo de dados tanto em Client Components quanto em Server Components.

## 💡 Contexto e Regras de Negócio
- **Type Safety:** Todas as rotas de API devem ser tipadas via Zod.
- **Server Components:** Utilizaremos o padrão de "Prefetching" em Server Components para hidratar o cache do TanStack Query no cliente.
- **Streaming:** A configuração deve suportar o streaming de promessas do React 19 para uma experiência de carregamento mais fluida.
- **Integração com Drizzle:** O contexto do tRPC deve fornecer acesso às instâncias do banco de dados definidas em `src/lib/db`.

## 🏗️ Decisões Arquiteturais e Stack

### Bibliotecas
Instalaremos os seguintes pacotes:
- `@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query`: Core do tRPC.
- `@tanstack/react-query`: Motor de sincronização de estado.
- `zod`: Validação de esquema.
- `superjson`: Serialização de tipos complexos (Date, Map, Set).
- `client-only`, `server-only`: Segurança de escopo de código.

### Estrutura de Pastas
```text
src/
├── app/
│   └── api/trpc/[trpc]/route.ts  # Handler da rota HTTP do tRPC
├── trpc/
│   ├── init.ts                   # Inicialização do tRPC (Backend)
│   ├── query-client.ts           # Fábrica do QueryClient (Isomórfico)
│   ├── client.tsx                # Provider e hooks (Client-side)
│   ├── server.tsx                # Proxy de opções (Server-side/RSC)
│   └── routers/
│       ├── _app.ts               # Router principal (Root)
│       └── roast.ts              # Router específico para lógica de Roasts
```

### Justificativa
O tRPC v11 com TanStack Query v5 é a recomendação atual para aplicações Next.js que buscam o equilíbrio entre a simplicidade das Server Actions e a robustez de uma API formal. O uso do `createTRPCOptionsProxy` permite que Server Components gerem `queryOptions` compatíveis com o `useQuery` no cliente, eliminando redundância de código.

---

## 📋 TO-DOs de Implementação

### 1. Setup e Dependências
- [ ] Instalar dependências: `npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod superjson client-only server-only`.
- [ ] Configurar `superjson` no `init.ts` para suporte a datas do banco de dados.

### 2. Infraestrutura tRPC (Back-end)
- [ ] Criar `src/trpc/init.ts` com a inicialização do tRPC e definição do contexto (incluindo o `db` do Drizzle).
- [ ] Implementar o Router Raiz em `src/trpc/routers/_app.ts`.
- [ ] Configurar o API Handler em `src/app/api/trpc/[trpc]/route.ts`.

### 3. Integração com React Query (Isomórfico)
- [ ] Criar `src/trpc/query-client.ts` com a lógica de criação do `QueryClient` (configurando `shouldDehydrateQuery` para suportar streaming).
- [ ] Criar `src/trpc/client.tsx` com o `TRPCReactProvider` (Client Component).
- [ ] Envolver o `RootLayout` em `src/app/layout.tsx` com o `TRPCReactProvider`.

### 4. Suporte a Server Components (RSC)
- [ ] Criar `src/trpc/server.tsx` utilizando `createTRPCOptionsProxy` para expor o tRPC aos Server Components.
- [ ] Garantir que o `getQueryClient` use `React.cache` para estabilidade durante a requisição.

### 5. Implementação de Rotas (Exemplo Roast)
- [ ] Criar `src/trpc/routers/roast.ts` com procedimentos para:
    - `getById`: Busca um roast por UUID.
    - `getStats`: Busca estatísticas globais (avg score, count).
    - `getLeaderboard`: Busca os top roasts.
- [ ] Registrar o router de roast no `_app.ts`.

### 6. Refatoração e Testes
- [ ] Refatorar `src/app/leaderboard/page.tsx` para usar prefetching via tRPC.
- [ ] Refatorar `src/app/roast/[id]/page.tsx` para usar prefetching via tRPC.
- [ ] Validar se o streaming de dados está funcionando conforme o esperado.

---

## 💡 Considerações Futuras
- **Middleware:** Implementar middlewares para logging de performance nas rotas tRPC.
- **Error Handling:** Centralizar o tratamento de erros do tRPC para exibir toasts amigáveis no front-end.
