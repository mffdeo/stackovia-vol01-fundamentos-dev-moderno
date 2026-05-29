# ADR-0001 — Escopo do IntraStack Básico

## Status

Aceita.

## Contexto

O Volume 1 ensina fundamentos antes de frameworks. O projeto integrador precisa consolidar HTML, CSS, JavaScript, Git, documentação, dados mockados e publicação estática sem antecipar V02/V03.

## Decisão

Implementar o IntraStack Básico como site estático sem dependências externas:

- HTML semântico.
- CSS próprio.
- JavaScript no navegador.
- JSON mockado local.
- Formulário com envio simulado.

## Consequências

- O projeto é simples de baixar e rodar.
- O leitor vê claramente o limite entre estudo estático e produto real.
- React, Next.js, TypeScript, backend e banco ficam para volumes seguintes.

