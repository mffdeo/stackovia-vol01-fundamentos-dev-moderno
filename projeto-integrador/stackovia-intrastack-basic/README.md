# IntraStack Básico

Projeto integrador de referência do **Volume 1 — Fundamentos do Desenvolvedor Moderno** da Stackovia Learning Series.

**Status:** Estudo / Fundamentos  
**Versão sugerida:** `v0.1.0-intrastack-basic`

O IntraStack Básico é um portal estático fictício para onboarding interno da Stackovia. Ele consolida os 13 capítulos do V01: terminal, Git, GitHub, HTML semântico, CSS responsivo, JavaScript no navegador, dados mockados, formulário com validação, revisão de segurança, publicação estática e fechamento honesto de portfólio.

## O que este projeto entrega

- Página inicial responsiva com links de onboarding.
- Página de equipe com dados carregados de `src/data/equipe.json`.
- Página de contato com validação client-side e envio simulado.
- JavaScript sem framework para interação, `fetch` e mensagens de estado.
- README, changelog, diagramas, checklist de riscos e runbook local.
- Smoke test simples para conferir arquivos e conteúdo esperado.

## O que este projeto não é

- Não é produto em produção.
- Não tem backend, banco de dados ou autenticação.
- Não envia formulário de verdade.
- Não usa Docker, CI/CD, AWS ou monitoramento.
- Não promete escala, disponibilidade ou segurança completa.

## Como baixar

Opção recomendada:

```bash
git clone https://github.com/mffdeo/stackovia-vol01-fundamentos-dev-moderno.git
cd stackovia-vol01-fundamentos-dev-moderno/projeto-integrador/stackovia-intrastack-basic
```

Alternativa: no GitHub, use **Code -> Download ZIP**, extraia o arquivo e entre na pasta:

```text
projeto-integrador/stackovia-intrastack-basic/
```

## Como rodar localmente

Use um servidor estático simples para que o `fetch` consiga carregar o JSON mockado:

```bash
cd src
python3 -m http.server 8000
```

Abra no navegador:

```text
http://localhost:8000
```

Páginas disponíveis:

- `http://localhost:8000/`
- `http://localhost:8000/sobre.html`
- `http://localhost:8000/contato.html`

## Como testar manualmente

1. Abra a home e confira se o CSS carregou.
2. Clique em "Mostrar links úteis" e confirme que a seção aparece/desaparece.
3. Abra `sobre.html` e veja se a lista de equipe foi carregada.
4. Abra `contato.html`.
5. Envie o formulário vazio: devem aparecer mensagens específicas.
6. Preencha nome, e-mail válido e mensagem: deve aparecer sucesso simulado.
7. Abra o DevTools -> Network e confirme que não há 404 para `styles.css`, `app.js` ou `data/equipe.json`.

## Smoke test

Na raiz do projeto:

```bash
bash scripts/smoke-check.sh
```

O script confere a presença dos arquivos principais e alguns textos esperados. Ele não substitui teste manual no navegador.

## Estrutura

```text
stackovia-intrastack-basic/
  README.md
  CHANGELOG.md
  docs/
    decisions/
    publication-checklist.md
    risks.md
    runbook-local.md
  diagrams/
    request-response.md
    git-flow.md
  assets/
    screenshots/
    linkedin/
  scripts/
    smoke-check.sh
  src/
    index.html
    sobre.html
    contato.html
    styles.css
    app.js
    data/
      equipe.json
```

## Segurança e privacidade

- Não há segredos no projeto.
- Não há `.env`.
- Dados em `equipe.json` são fictícios.
- O formulário usa `textContent` para mensagens e não envia dados para servidor.
- Validação client-side é orientação de UX, não segurança.

## Próximo passo

O Volume 2 transforma esta base estática em uma aplicação frontend profissional com React, Next.js e TypeScript.

