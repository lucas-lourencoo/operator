# Especificação de Implementação: Drizzle ORM

Esta especificação detalha a estrutura do banco de dados e os passos necessários para a implementação do Drizzle ORM no projeto **devroast**, utilizando PostgreSQL via Docker Compose.

## 🗄️ Modelo de Dados (Schema)

### Enums
- **finding_type**: `critical`, `warning`, `good`, `neutral`

### Tabelas

#### 1. `roasts` (Submissões de código)
Tabela principal que armazena os envios e o feedback brutal inicial.
- `id`: uuid (Primary Key, default: `gen_random_uuid()`)
- `code`: text (O código original enviado)
- `language`: text (Linguagem detectada ou informada)
- `score`: integer (Pontuação de 0 a 100)
- `summary`: text (O texto do "esculacho" principal que aparece no Score Hero)
- `created_at`: timestamp (default: `now()`)
- `updated_at`: timestamp (default: `now()`)

#### 2. `roast_findings` (Cards de Análise)
Cada roast possui múltiplos findings que alimentam o "Analysis Section".
- `id`: uuid (Primary Key)
- `roast_id`: uuid (Foreign Key -> `roasts.id`, on delete: `cascade`)
- `type`: finding_type (Enum para variante do card)
- `title`: text (Título do erro/cheiro arquitetural)
- `description`: text (Explicação detalhada/sarcástica)
- `created_at`: timestamp

#### 3. `suggested_improvements` (Diffs e Melhorias)
Alimenta o "Diff Section" com sugestões de código.
- `id`: uuid (Primary Key)
- `roast_id`: uuid (Foreign Key -> `roasts.id`, on delete: `cascade`)
- `original_code`: text (Trecho de código problemático)
- `improved_code`: text (Sugestão de melhoria)
- `explanation`: text (Por que isso é melhor, provavelmente com mais sarcasmo)
- `created_at`: timestamp

---

## 🐳 Infraestrutura (Docker Compose)

Criar um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
services:
  db:
    image: postgres:17-alpine
    container_name: devroast-db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - devroast-pgdata:/var/lib/postgresql/data

volumes:
  devroast-pgdata:
```

---

## 🛠️ To-dos de Implementação

1.  **Setup do Banco:**
    - [ ] Criar `docker-compose.yml` e subir o container (`docker compose up -d`).
    - [ ] Adicionar `DATABASE_URL` ao arquivo `.env`.

2.  **Dependências:**
    - [ ] Instalar pacotes: `npm install drizzle-orm pg`
    - [ ] Instalar dependências de dev: `npm install -D drizzle-kit @types/pg`

3.  **Configuração Drizzle:**
    - [ ] Criar `drizzle.config.ts` na raiz.
    - [ ] Criar diretório `src/lib/db`.
    - [ ] Implementar conexão em `src/lib/db/index.ts`.
    - [ ] Definir schemas em `src/lib/db/schema.ts`.

4.  **Migrações:**
    - [ ] Gerar migração inicial: `npx drizzle-kit generate`.
    - [ ] Aplicar migração: `npx drizzle-kit migrate`.

5.  **Integração:**
    - [ ] Criar Server Action para salvar o roast e os findings após a análise da IA.
    - [ ] Implementar query para buscar os Top 10 roasts com menor score para o "Shame Leaderboard".
    - [ ] Criar rota dinâmica `src/app/roast/[id]` para visualizar roasts salvos.

---

## 💡 Considerações Futuras
- **Autenticação:** Se decidirmos por logins, adicionar tabela `users` e relacionar com `roasts`.
- **Compartilhamento:** O `roast_id` deve ser um UUID não sequencial para dificultar a varredura de roasts de terceiros se não houver autenticação.
