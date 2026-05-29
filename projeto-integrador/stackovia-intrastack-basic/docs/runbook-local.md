# Runbook local — IntraStack Básico

## Objetivo

Rodar a demo estática localmente de forma reproduzível.

## Pré-requisitos

- Navegador moderno.
- Python 3 disponível no terminal.

## Passos

```bash
cd stackovia-intrastack-basic/src
python3 -m http.server 8000
```

Abra:

```text
http://localhost:8000
```

## Verificação

- Home abre com estilo.
- `sobre.html` carrega dados de `data/equipe.json`.
- `contato.html` mostra erros para campos inválidos.
- Formulário válido mostra sucesso simulado.
- DevTools -> Network sem 404 para `styles.css`, `app.js` e `data/equipe.json`.

## Problemas comuns

| Sintoma | Causa provável | Correção |
|---|---|---|
| Lista de equipe não carrega | Página aberta via `file://` | Servir `src/` com `python3 -m http.server` |
| CSS não aparece | Arquivo servido de pasta errada | Entrar em `src/` antes de iniciar o servidor |
| Formulário não mostra mensagens | JS não carregou | Conferir `app.js` no Network |

