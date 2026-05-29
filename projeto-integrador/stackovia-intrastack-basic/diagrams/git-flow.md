# Diagrama — fluxo Git sugerido

```text
main
  |
  +-- docs/readme-final
        |
        +-- atualiza README, riscos e changelog
        |
        +-- pull request com checklist
        |
        v
      merge em main
        |
        +-- tag v0.1.0-intrastack-basic
```

Regra do V01: commit pequeno, mensagem clara e release só depois do checklist final.

