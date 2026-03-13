# Diretrizes para Criação de Especificações (@specs)

Este documento define o padrão que nós (agentes de IA) devemos seguir ao criar novas especificações técnicas na pasta `specs/`. O objetivo é garantir que toda nova funcionalidade tenha uma base técnica sólida, decisões documentadas e um plano de ação claro antes da implementação.

## 🏗️ Estrutura Obrigatória

Toda especificação deve seguir esta estrutura de tópicos:

### 1. Título e Objetivo
Um título claro e um parágrafo resumindo o que será construído e qual problema resolve.

### 2. Contexto ou Regras de Negócio
Detalhes sobre como a funcionalidade deve se comportar do ponto de vista do usuário ou do sistema.

### 3. Decisões Arquiteturais e Stack
- **Bibliotecas:** Quais pacotes serão instalados (verificar se já existem no projeto primeiro).
- **Arquitetura:** Mudanças em pastas, novos hooks, componentes ou serviços.
- **Justificativa:** Por que estamos escolhendo esse caminho.

### 4. Modelo de Dados (Se houver)
Definição de tabelas, enums e relações (padrão Drizzle ORM).
- Exemplo: Nomes de tabelas, colunas, tipos e constraints.

### 5. 📋 TO-DOs de Implementação (Checklist)
Esta é a parte **mais importante** para o acompanhamento do progresso. Deve ser uma lista de tarefas granulares com checkboxes `[ ]`.
- Divida por etapas: Setup, UI/Components, Lógica/Hooks, Integração/Backend, Testes.

---

## 🛠️ Processo de Trabalho

1. **Pesquisa:** Antes de escrever a spec, explore o código atual para garantir que a proposta é compatível com os padrões existentes.
2. **Criação:** Escreva o arquivo `.md` na pasta `specs/` seguindo o formato acima.
3. **Aprovação:** Apresente a spec para o usuário. **Não comece a implementar até que o plano seja aprovado.**
4. **Execução:** Ao implementar, use a checklist da spec para guiar seus passos e manter o contexto.
5. **Atualização:** Se durante a implementação descobrirmos que algo precisa mudar, atualize a spec para refletir a nova realidade.

## 💡 Dicas de Estilo
- Use emojis para facilitar a leitura visual.
- Seja técnico e direto.
- Inclua exemplos de código (snippets) para interfaces ou configurações complexas.
- Mantenha a consistência com as specs já existentes (`drizzle-implementation.md`, `editor-syntax-highlighting.md`).
