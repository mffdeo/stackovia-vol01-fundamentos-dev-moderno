---
title: "Projeto Integrador — IntraStack Básico"
---

# Projeto Integrador — IntraStack Básico

O projeto integrador do Volume 01 é o **IntraStack Básico**, um portal interno fictício da Stackovia construído com HTML, CSS, JavaScript e dados mockados.

Ele existe para fechar o volume com uma entrega verificável: o leitor consegue baixar o código, rodar localmente e inspecionar a estrutura sem depender de framework, build, backend ou banco de dados.

## Baixar o projeto

Opção com Git:

```bash
git clone https://github.com/mffdeo/stackovia-vol01-fundamentos-dev-moderno.git
cd stackovia-vol01-fundamentos-dev-moderno/projeto-integrador/stackovia-intrastack-basic
```

Opção sem Git:

1. Baixe o ZIP do repositório em [github.com/mffdeo/stackovia-vol01-fundamentos-dev-moderno/archive/refs/heads/main.zip](https://github.com/mffdeo/stackovia-vol01-fundamentos-dev-moderno/archive/refs/heads/main.zip).
2. Extraia o arquivo.
3. Entre na pasta `projeto-integrador/stackovia-intrastack-basic`.

## Rodar localmente

```bash
cd src
python3 -m http.server 8000
```

Depois abra:

```text
http://localhost:8000
```

O servidor local é necessário porque a página de equipe carrega `data/equipe.json` via `fetch`. Abrir o arquivo direto no navegador pode bloquear a leitura do JSON por regra de segurança do próprio navegador.

## O que testar

- A página inicial abre e mostra o card da sprint.
- O botão de links úteis alterna a área oculta.
- A página `sobre.html` carrega a equipe a partir de `data/equipe.json`.
- A página `contato.html` valida nome, e-mail e mensagem.
- O envio do formulário é explicitamente simulado, sem backend.

## Estrutura principal

```text
stackovia-intrastack-basic/
├── README.md
├── CHANGELOG.md
├── src/
│   ├── index.html
│   ├── sobre.html
│   ├── contato.html
│   ├── styles.css
│   ├── app.js
│   └── data/equipe.json
├── docs/
├── diagrams/
├── assets/
└── scripts/smoke-check.sh
```

## Validação rápida

Na raiz do projeto integrador:

```bash
bash scripts/smoke-check.sh
```

Esse script não substitui uma revisão manual no navegador. Ele apenas confirma que os arquivos e textos essenciais continuam presentes.

## Limites assumidos

- Não há autenticação.
- Não há backend.
- Não há persistência de dados.
- Não há pipeline de deploy próprio.
- A segurança documentada é introdutória e não deve ser tratada como produção.

Esses limites são intencionais para o Volume 01. O Volume 02 passa a evoluir a base com frontend profissional.
