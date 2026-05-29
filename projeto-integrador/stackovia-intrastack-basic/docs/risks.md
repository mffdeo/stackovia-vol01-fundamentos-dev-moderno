# Riscos e limites — IntraStack Básico

| Risco | Como detectar | Mitigação no V01 | Limite declarado |
|---|---|---|---|
| Prometer produção | README/post usa "produção", "SLA" ou "seguro" | Rotular como Estudo / Fundamentos | Não é produto real |
| Dado real no JSON | Nomes, e-mails ou clientes reais aparecem em `equipe.json` | Usar dados fictícios | Não usar dados internos reais |
| Formulário tratado como envio real | Texto diz que mensagem foi enviada | Status diz "envio simulado" | Sem backend |
| Fetch falha localmente | Console mostra erro ao abrir com `file://` | Runbook manda usar servidor local | Sem API real |
| Link quebrado | DevTools mostra 404 | Smoke test e checklist | Publicação estática opcional |

## O que este projeto não cobre

- Autenticação.
- Persistência.
- Proteção contra ataques reais.
- Logs, métricas ou monitoramento.
- Deploy profissional.

