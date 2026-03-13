# Especificação: Editor de Código com Syntax Highlighting e Auto-Detecção

## Objetivo
Criar um editor de código na homepage onde o usuário pode colar trechos de código. O editor deve:
1. Detectar automaticamente a linguagem do código colado.
2. Aplicar *syntax highlighting* com base na linguagem detectada (com fidelidade visual similar ao Ray.so).
3. Permitir que o usuário selecione manualmente a linguagem caso a detecção falhe ou deseje alterar.

## Decisões Arquiteturais e Stack Proposta

Com base nas definições de projeto, a arquitetura focará em alta fidelidade visual estilo Ray.so, mantendo o editor simples e otimizando o carregamento de linguagens para as mais comuns.

### 1. O Editor Core: `react-simple-code-editor`
Manteremos a interface simples focada em visualização e pequenos ajustes. O `react-simple-code-editor` renderiza um `<textarea>` invisível sobreposto a um `<pre>` estilizado, oferecendo uma experiência de digitação nativa leve sem o peso de um editor completo como o Monaco.

### 2. Syntax Highlighter: `shiki`
Para garantir fidelidade visual perfeita (utilizando os mesmos temas do VS Code via gramáticas TextMate), utilizaremos o **Shiki**. Como o carregamento via WASM pode impactar o tempo de inicialização, implementaremos *lazy loading* no carregamento inicial.

### 3. Auto-Detecção de Linguagem: `flourite`
Como o Shiki não possui auto-detecção embutida, utilizaremos o **`flourite`**. É um detector de linguagem focado em performance, baseado no GitHub Linguist, escrito em TypeScript e altamente eficiente para o client-side.

### 4. Otimização de Linguagens (Top 20/30)
Para evitar o download de megabytes de gramáticas do Shiki, vamos pré-configurar o suporte apenas para um **Top 20/30 linguagens mais comuns** (como JavaScript, TypeScript, Python, Go, Rust, Java, C++, HTML, CSS, JSON, SQL, etc.).

### Stack Resumida
*   **Editor:** `react-simple-code-editor`
*   **Highlighter:** `shiki`
*   **Language Detection:** `flourite`
*   **UI:** Tailwind CSS + Radix UI (Select de troca manual)

---

## 📋 TO-DOs da Implementação

- [ ] Instalar as dependências: `npm install react-simple-code-editor shiki flourite` (e tipagens correspondentes se houver).
- [ ] Criar um array/constante listando apenas o Top 20/30 linguagens suportadas para otimizar o `shiki`.
- [ ] Criar um hook `useLanguageDetection` que recebe o código e usa o `flourite` (com debounce) para sugerir a linguagem, mapeando o resultado para a nossa lista de Top linguagens.
- [ ] Criar o helper para inicialização assíncrona do `shiki` (carregando apenas os temas desejados e a lista de linguagens restrita).
- [ ] Implementar o componente de Editor (`components/ui/code-editor.tsx`) envolvendo o `react-simple-code-editor` e utilizando a instância instanciada do `shiki` no método `highlight`.
- [ ] Criar a interface de seleção manual de linguagem (Dropdown/Select na UI), que permite sobrescrever a linguagem detectada automaticamente.
- [ ] Tratar *fallbacks* visuais (loading states) enquanto o Shiki carrega o motor WASM e, caso a detecção falhe completamente, usar `'text'` ou `'plaintext'`.