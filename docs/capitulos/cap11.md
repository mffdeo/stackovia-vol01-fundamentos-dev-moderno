---
title: "Capítulo 11 — Segurança básica desde cedo: segredos, inputs e exposição pública"
status: Preview
volume: 1
capitulo: 11
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 11 — Segurança básica desde cedo: segredos, inputs e exposição pública

## Abertura

O IntraStack estava quase pronto para ir ao ar de verdade. Home semântica, CSS responsivo, interação, dados mockados, formulário com validação honesta. Você abriu o repositório no GitHub para conferir o último capítulo antes da publicação final e pensou: "está bonito, dá pra mostrar".

Você mostrou ao Mestre Py o repositório aberto. Ele não olhou o layout. Foi direto à aba "Files" e fez uma pergunta seca:

"Antes de qualquer coisa: o que, exatamente, vai ficar público aqui? Você já passou os olhos em tudo que está versionado, arquivo por arquivo, imaginando um estranho lendo?"

Você travou. Tinha pensado no que aparece na *página* — não no que aparece no *repositório*. Voltou ao projeto e rodou `git status`. No meio dos arquivos, um que você tinha criado dias antes "só pra testar": um `.env` com uma linha que dizia `API_TOKEN=sk-test-9a8b7c6d5e4f`. Era um token de teste, de um experimento que nem estava no projeto final — mas estava ali, versionado, prestes a ir para um repositório público.

"Esse token", disse o Mestre Py, "mesmo que seja de teste, mesmo que você ache que não vale nada: a partir do momento em que ele entra no Git e vai pro GitHub, você trata como exposto. Não 'vou apagar e fingir que não foi'. Exposto. Segurança não começa com firewall. Começa aqui, com você sabendo o que não pode sair da sua máquina."

Este capítulo é essa revisão — antes de o IntraStack ir ao mundo.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Revisar o que vai ficar público (C11) |
| Tarefa | Revisar segredos, inputs e exposição do IntraStack e criar `docs/risks.md` |
| Definição de pronto | Nenhum segredo real versionado, `.env.example` (se existir) só com placeholders, e `docs/risks.md` lista riscos, mitigação e limites de segurança do V01 |

O tamanho desta sprint é o de um capítulo. Cada leitor avança no próprio ritmo; o que importa é terminar com o hábito de **olhar o projeto com os olhos de quem vai abri-lo público** — e um documento que registra os riscos honestamente, sem prometer segurança que o V01 não tem.

## Problema de negócio

Mesmo um projeto de estudo, ao ser publicado, vira informação pública permanente. Um segredo que vaza no GitHub não é "desfeito" ao apagar o arquivo: o histórico do Git guarda tudo, bots varrem repositórios públicos atrás de chaves em minutos, e uma credencial real exposta pode gerar custo, acesso indevido ou vazamento de dados.

O risco aqui é de **hábito**, não de ferramenta. Quem aprende cedo a perguntar "o que vai ficar público?" carrega isso para projetos reais, onde o erro custa caro. Quem nunca olhou o `git diff` antes de publicar vai, um dia, commitar a chave de produção.

Há também um risco de **honestidade**: um projeto de fundamentos não é "seguro" só porque tem um checklist. O objetivo deste capítulo é criar o hábito de revisão e documentar limites — não declarar o IntraStack à prova de ataque, o que seria falso.

## O que será construído neste capítulo

Diferente dos capítulos anteriores, este é de **revisão**: você não adiciona uma funcionalidade nova, você inspeciona o que já existe com um olhar de segurança. Ao final, o IntraStack terá:

- `.gitignore` conferido para garantir que `.env` (e arquivos de segredo) **nunca** sejam versionados.
- `.env.example` (se o projeto precisar documentar variáveis) com **apenas placeholders**, nunca valores reais.
- `docs/risks.md` — uma tabela de riscos do projeto: o que pode dar errado, como detectar, como mitigar e qual é o limite de segurança no V01.
- Uma seção "Segurança e limitações" no `README.md`, declarando honestamente o que o projeto faz e não faz em termos de segurança.
- O histórico de `git status` / `git diff` revisado, sem segredo real versionado.
- Entrada no diário técnico.
- Commit `docs(security): add risk review and risks.md`.

O que **não** entra: OWASP completo, CSP/CORS em profundidade, JWT/OAuth, secret manager, WAF/IAM, threat modeling formal. Nada de detalhar ataques. Aqui é o **básico que todo projeto público precisa**: segredo fora do Git, input tratado como não confiável, e honestidade sobre limites. Segurança aprofundada é trilha dos volumes seguintes (V03, V05, V06, V11).

## Cena/tensão de abertura

Antes de criar o checklist, veja o que o `git diff` revelou. Foi este o trecho que apareceu quando você rodou `git status` e abriu o arquivo:

```bash
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .env

$ git diff --cached
+API_TOKEN=sk-test-9a8b7c6d5e4f
+DB_PASSWORD=senha123
```

Dois problemas, e os dois são o tipo de coisa que passa despercebida quando você só olha a página:

1. **O `.env` está sendo versionado** (INC-V01-019). Esse arquivo deveria ser **local** — ele guarda configuração e segredos da sua máquina, e nunca deveria entrar no Git. Como ele foi adicionado (`new file: .env`), o token e a senha vão para o repositório público no próximo push.

2. **Os valores são "reais"** no sentido que importa: `sk-test-9a8b7c6d5e4f` parece uma chave de API, `senha123` parece uma senha. Mesmo de teste, uma vez no GitHub, precisam ser tratados como expostos — invalidados e trocados se forem de algum serviço real.

O reflexo errado é "deixa, é só teste, depois eu apago". Mas apagar não resolve: o Git guarda o histórico. A correção certa é **impedir que entre**: tirar o `.env` do versionamento, garantir que o `.gitignore` o bloqueie, e — se algum valor era real — invalidá-lo no serviço de origem. É o que o capítulo organiza.

## Exemplo antes do conceito

Dois arquivos de configuração, uma comparação. Os dois "documentam" as variáveis que o projeto usa; só um pode ir para um repositório público.

**Trecho A — o exemplo que vaza (INC-V01-020):**

```bash
# .env.example
API_TOKEN=sk-test-9a8b7c6d5e4f
DB_PASSWORD=senha123
```

Parece inofensivo: é um arquivo "de exemplo". Mas o leitor copiou os valores reais do seu `.env` para o `.env.example` "pra ficar mais fácil de testar". Resultado: o arquivo que deveria só **mostrar o formato** agora carrega **segredos reais** — e, ao contrário do `.env`, o `.env.example` normalmente **é** versionado. O exemplo virou o vazamento.

**Trecho B — o exemplo honesto:**

```bash
# .env.example
API_TOKEN=SUA_CHAVE_AQUI
DB_PASSWORD=defina_no_seu_ambiente
```

A diferença é a função de cada arquivo:

- O `.env.example` **ensina o formato**: quais variáveis existem e como se chamam. Ele vai para o Git, é público, e por isso só pode ter **placeholders** — nunca um valor que funcione.
- O `.env` **guarda os valores reais** da sua máquina. Ele **nunca** vai para o Git (fica no `.gitignore`).

A regra do Mestre Py: "Exemplo ensina formato; não carrega segredo." Quem abre o repositório vê quais variáveis configurar (`.env.example`), mas nunca os valores (`.env`, que ficou na sua máquina).

Agora vamos nomear os conceitos.

## Conceitos essenciais

### Conceito-chave 1 — O que é um segredo

Um **segredo** é qualquer valor que dá acesso, identifica ou autentica algo, e que não deveria ser conhecido por terceiros. No mundo real: chaves de API (`sk-...`), senhas, tokens, strings de conexão de banco, certificados privados.

A propriedade que define um segredo é simples: **se vazar, alguém pode usar no seu lugar.** Uma chave de API vazada pode gerar custo na sua conta; uma senha de banco vazada dá acesso aos dados.

No V01 você ainda não tem serviços reais — mas o hábito de reconhecer e proteger segredos precisa nascer agora, com os valores de teste, para estar pronto quando os valores forem de produção.

### Conceito-chave 2 — `.env` vs `.env.example`: a distinção que protege

Esses dois arquivos têm nomes parecidos e funções opostas. Confundi-los é o INC-V01-020.

| Arquivo | Contém | Vai para o Git? |
|---|---|---|
| `.env` | Valores **reais** (segredos, config local) | **Não** — fica no `.gitignore` |
| `.env.example` | **Placeholders** que mostram o formato | **Sim** — é público |

O `.env.example` existe justamente para que quem clona o projeto saiba **quais** variáveis precisa definir, sem nunca receber **os valores**. O fluxo normal de quem usa o projeto: copiar `.env.example` para `.env` e preencher com os próprios valores.

A regra inviolável: **nenhum valor real em `.env.example`.** Se você se pegou copiando do `.env` para o `.env.example`, parou no lugar errado — troque por placeholder.

### Conceito-chave 3 — `.gitignore`: o que o Git deve ignorar

O `.gitignore` é um arquivo que lista padrões de arquivos que o Git deve **ignorar** — nunca rastrear, nunca versionar. É a primeira barreira contra commitar segredo.

Uma entrada mínima para o V01:

```gitignore
# segredos e config local
.env
.env.local

# sistema
.DS_Store
```

Com `.env` no `.gitignore`, mesmo que você esqueça e rode `git add .`, o Git não inclui o arquivo. Importante: o `.gitignore` só funciona para arquivos **ainda não rastreados**. Se você já commitou o `.env` antes, adicioná-lo ao `.gitignore` não basta — você precisa removê-lo do rastreamento (`git rm --cached .env`) e tratar o valor como exposto.

### Conceito-chave 4 — Revisar antes de publicar: `git status` e `git diff`

O hábito central deste capítulo: **antes de cada push para um repositório público, revise o que está indo.** Três comandos:

```bash
git status            # quais arquivos mudaram / serão commitados
git diff              # o que mudou nos arquivos ainda não staged
git diff --cached     # o que mudou no que já está staged (pronto para commit)
```

`git diff --cached` é o mais importante antes de publicar: ele mostra exatamente o conteúdo que vai entrar no commit. É aqui que um token salta aos olhos — se você olhar.

Uma busca textual rápida ajuda a pegar o óbvio:

```bash
git grep -iE "token|secret|key|password|senha" -- . ':!*.example'
```

Isso procura termos suspeitos nos arquivos versionados (excluindo os `.example`). Não é prova de segurança — é uma rede para os erros mais comuns.

### Conceito-chave 5 — Input é dado não confiável (revisão)

Você já aplicou isso no C08 e no C10: tudo que vem de fora — o que o usuário digita, um parâmetro de URL, dados de um `fetch` — é **não confiável** até prova em contrário. A revisão de segurança fecha esse ponto como princípio, não como detalhe pontual.

Os dois cuidados do V01, recapitulados:

- **Nunca renderize input com `innerHTML`.** Use `textContent`. Isso evita XSS — o navegador tratar texto do usuário como código executável (introduzido no C08, aplicado no C10).
- **Validação no cliente não é segurança** (C10). Ela orienta; a barreira real é o servidor, que vem no V03.

No `docs/risks.md`, esses cuidados viram itens explícitos — para que a revisão não dependa de você lembrar.

### Conceito-chave 6 — Honestidade de segurança: o que você NÃO está prometendo

Esta é a parte ética, e ela é tão importante quanto a técnica. Ter um `docs/risks.md` e um checklist **não** torna o IntraStack "seguro". O que você está fazendo é o básico de higiene: não vazar segredo, tratar input com cuidado, documentar limites.

O que o V01 **não** cobre, e o `risks.md` e o README precisam dizer:

- Não há autenticação nem autorização.
- Não há validação no servidor (não há servidor).
- Não há proteção contra ataques sofisticados (CSRF, injeção, etc.).
- A revisão é um checklist inicial, **não uma auditoria de segurança**.

Declarar isso não é fraqueza — é maturidade. Um portfólio que diz "fiz uma revisão de riscos inicial e documentei os limites" é mais forte e mais confiável do que um que promete "projeto seguro". Prometer segurança que você não testou é o tipo de exagero que o INC-V01-016 (do C09) já alertou, agora no terreno mais sensível.

## Construindo a revisão em etapas

A revisão acontece em quatro etapas. As três primeiras inspecionam o projeto; a quarta registra o resultado.

```text
arquivo local  ->  revisão Git (status/diff)  ->  repo público  ->  risco  ->  mitigação documentada
```

### Etapa 1 — Conferir o `.gitignore` e tirar segredo do Git

Abra (ou crie) o `.gitignore` na raiz do projeto e garanta que ele tem `.env`:

```gitignore
.env
.env.local
.DS_Store
```

Se o `.env` já estava sendo versionado (como na cena de abertura), remova-o do rastreamento sem apagar o arquivo local:

```bash
git rm --cached .env
```

Se algum valor dentro dele era real, trate como exposto: invalide/rotacione no serviço de origem. No V01, com valores de teste, basta remover e seguir o hábito.

### Etapa 2 — Revisar o que está staged

```bash
git status
git diff --cached
```

Leia o diff inteiro, imaginando um estranho lendo. Procure: tokens, senhas, e-mails reais, nomes de pessoas, URLs de sistemas internos, caminhos com seu nome de usuário. Se aparecer algo sensível, pare e remova antes de qualquer commit.

### Etapa 3 — Conferir o `.env.example` (se existir)

Se o projeto tem um `.env.example`, abra e confirme que **cada valor é placeholder**:

```bash
# .env.example — só placeholders
API_TOKEN=SUA_CHAVE_AQUI
DB_PASSWORD=defina_no_seu_ambiente
```

Se algum valor parecer real, troque por placeholder. (No IntraStack do V01, talvez você nem precise de `.env.example` — só crie se houver variáveis a documentar.)

### Etapa 4 — Criar o `docs/risks.md`

Este é o entregável central. Uma tabela com quatro colunas: risco, como detectar, mitigação e limite no V01.

```markdown
# Riscos e limites de segurança — IntraStack básico (V01)

> Revisão inicial de segurança de um projeto de **estudo**. Não é auditoria.

| Risco | Como detectar | Mitigação | Limite no V01 |
|---|---|---|---|
| Segredo versionado (token, senha) | `git diff --cached`, `git grep` por TOKEN/KEY/SECRET | `.env` no `.gitignore`; placeholders no `.env.example`; rotacionar se real | Não há secret manager; revisão é manual |
| Valor real no `.env.example` | Conferir cada valor antes do commit | Só placeholders (`SUA_CHAVE_AQUI`) | — |
| XSS por input renderizado como HTML | Buscar `innerHTML` no código | Usar `textContent` para qualquer input | Sem sanitização avançada nem CSP |
| Confiar na validação do cliente | Revisar onde a validação acontece | Validar no cliente só para orientar; saber que não protege | Sem validação no servidor (não há servidor) |
| Screenshot/README expondo dado real | Revisar imagens e textos antes de publicar | Usar dados fictícios e domínios `.example` | — |
| Dados mockados vendidos como reais | Procurar "produção"/"real" no README/post | Declarar que são mockados | — |

## O que esta revisão NÃO cobre

- Autenticação e autorização (V03+).
- Validação no servidor (V03+).
- Proteção contra CSRF, injeção e ataques sofisticados.
- Auditoria de segurança formal ou threat modeling.

Esta é uma revisão inicial de fundamentos, não uma garantia de segurança.
```

A coluna "Limite no V01" é a parte mais honesta da tabela: ela diz, para cada risco, até onde a mitigação do V01 vai — e admite o que falta.

## O que pode dar errado?

### 1. Segredo versionado (INC-V01-019)

O `.env` (ou qualquer arquivo com token/senha) entra no Git e vai para o repositório público. Apagar depois não resolve: o histórico guarda.

**Como evitar:** `.env` no `.gitignore` desde o início; `git diff --cached` antes de cada push; se vazou, tratar como exposto e rotacionar.

### 2. Valor real no `.env.example` (INC-V01-020)

Copiar os valores do `.env` para o `.env.example` "pra facilitar" transforma o arquivo de exemplo num vazamento — e ele é versionado.

**Como evitar:** `.env.example` só com placeholders. Exemplo ensina formato, não carrega segredo.

### 3. Screenshot expondo dado sensível

Um print para o README que mostra, no canto, uma aba do navegador com e-mail pessoal, um token na tela ou um sistema interno real.

**Como evitar:** revise screenshots antes de subir; use dados fictícios; recorte ou borre o que for sensível.

### 4. Input refletido sem cuidado

Ecoar na página algo que o usuário digitou usando `innerHTML` — porta para XSS (revisão do C08/C10).

**Como evitar:** `textContent` para qualquer conteúdo vindo de fora. Sem exceção.

### 5. Prometer segurança não testada

Escrever no README ou num post "projeto seguro" ou "protegido contra ataques". É falso e mina a credibilidade — ninguém testou isso, e o V01 não tem as defesas que a frase sugere.

**Como evitar:** declare o que foi feito (revisão de riscos inicial) e o que não foi (auditoria, autenticação, servidor). Honestidade.

## Debugging guiado

Aqui "debugging" é caçar exposição, não corrigir um bug de execução.

### Passo 1 — Listar tudo que está versionado

```bash
git ls-files
```

Leia a lista inteira. Algum arquivo não deveria estar aí? (`.env`, dumps, backups, arquivos com dado real?) Se sim, é candidato a `git rm --cached` + `.gitignore`.

### Passo 2 — Buscar termos sensíveis

```bash
git grep -iE "token|secret|key|password|senha|api[_-]?key" -- . ':!*.example'
```

Cada resultado merece um olhar: é placeholder, nome de variável, ou um valor real? Valor real sai.

### Passo 3 — Revisar o diff que vai ser publicado

```bash
git diff --cached
```

Leia como se fosse um estranho. Procure valores, e-mails, nomes, caminhos pessoais. O que não deveria ser público, remova antes do commit.

### Passo 4 — Revisar screenshots e README

Abra cada imagem que vai para o repositório e o README renderizado. Procure dado real visível: e-mail, token, nome de empresa, sistema interno. Recorte ou substitua por fictício.

### Passo 5 — Simular o olhar externo

Abra o repositório no GitHub (ou imagine a aba "Files") e percorra arquivo por arquivo com uma única pergunta: **"se um estranho ler isto, algo aqui me prejudica?"** É o teste do Mestre Py — e o mais valioso, porque pega o que os comandos não pegam.

## Code Review do Mestre Py

O Mestre Py revisaria o repositório e o `docs/risks.md` com firmeza:

**Aprovaria sem comentário:**
- `.env` no `.gitignore` e fora do versionamento.
- `.env.example` (se existir) só com placeholders.
- `docs/risks.md` com a coluna de limites honesta.
- README com seção "Segurança e limitações" declarando o que não é coberto.
- Input tratado com `textContent` em todo o código.
- Dados e screenshots fictícios.

**Pediria ajuste:**
- `risks.md` sem a coluna de limites: "Lista o risco e a mitigação, mas até onde ela vai no V01? Sem o limite, parece que você resolveu tudo. Não resolveu."
- README dizendo "seguro": "Tira o 'seguro'. Você fez uma revisão inicial. Diz isso."

**Reprovaria (sem negociação):**
- Qualquer valor real em `.env.example`: "Isso é um segredo num arquivo público. Placeholder. Agora." (INC-V01-020)
- `.env` versionado: "Tira do Git. Se o valor era real, rotaciona. Segredo que entrou no Git é tratado como exposto." (INC-V01-019)
- Screenshot com dado pessoal ou token visível.
- Post/README prometendo proteção contra ataque.

**Resumo do Code Review:** "Segurança no V01 não é firewall nem criptografia — é higiene e honestidade. Olha o que vai ficar público, arquivo por arquivo, com os olhos de um estranho. Segredo fora do Git; exemplo com placeholder; input é hostil; e diz a verdade sobre o que você não protege. Segredo que entrou no Git já é exposto — não existe 'só apaguei'. Esse hábito, criado agora com valores de teste, é o que vai te salvar quando o valor for a chave de produção."

## Mãos à Obra

Execute as tarefas na ordem.

---

**Tarefa 1 — Conferir/criar o `.gitignore`**

Garanta que o `.gitignore` da raiz tem pelo menos:

```gitignore
.env
.env.local
.DS_Store
```

---

**Tarefa 2 — Tirar segredo do versionamento (se houver)**

Rode `git status`. Se um `.env` (ou similar) aparecer rastreado:

```bash
git rm --cached .env
```

O arquivo continua na sua máquina; só sai do Git. Se algum valor era real, rotacione no serviço de origem.

---

**Tarefa 3 — Revisar o que está staged**

```bash
git status
git diff --cached
git grep -iE "token|secret|key|password|senha" -- . ':!*.example'
```

Remova qualquer valor sensível antes de seguir.

---

**Tarefa 4 — Conferir o `.env.example` (se existir)**

Cada valor deve ser placeholder (`SUA_CHAVE_AQUI`). Se não houver variáveis a documentar no V01, você pode não ter esse arquivo — tudo bem.

---

**Tarefa 5 — Criar o `docs/risks.md`**

Crie o arquivo com a tabela de riscos da Etapa 4 (risco → detectar → mitigar → limite) e a seção "O que esta revisão NÃO cobre". Adapte os riscos ao seu projeto real.

---

**Tarefa 6 — Adicionar "Segurança e limitações" ao README**

```markdown
## Segurança e limitações

Este é um projeto de **estudo**. Antes de publicar, foi feita uma revisão inicial de
riscos (ver `docs/risks.md`):

- Segredos (`.env`) ficam fora do Git; o `.env.example`, se existir, só tem placeholders.
- Entradas do usuário são tratadas como não confiáveis (`textContent`, nunca `innerHTML`).
- Validação no cliente é orientação, **não** segurança.

**O que NÃO está coberto:** autenticação, validação no servidor, proteção contra ataques
(CSRF, injeção etc.) e auditoria de segurança formal. Isso é uma revisão inicial de
fundamentos, **não** uma garantia de segurança. Segurança aprofundada vem nos volumes seguintes.
```

---

**Tarefa 7 — Atualizar o diário técnico**

```markdown
## [DATA] — C11: revisão de segurança

Antes de publicar, revisei o que vai ficar público. Achei um .env com um token de
teste sendo versionado — tirei do Git (git rm --cached) e confirmei o .gitignore.
Aprendi a diferença entre .env (valores reais, fora do Git) e .env.example (só
placeholders, público). Criei docs/risks.md com riscos, mitigação e — o mais
importante — os limites do V01. A lição: segredo que entrou no Git é tratado como
exposto, e prometer "seguro" sem auditoria é desonesto.
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 8 — Commitar**

```bash
git add .gitignore docs/risks.md README.md docs/diario-tecnico.md
# se você criou ou ajustou um .env.example (só com placeholders), inclua-o também:
git add .env.example
git commit -m "docs(security): add risk review and risks.md"
```

(Note que o `.env` **não** entra no commit — ele está no `.gitignore`. Já o `.env.example`, quando existe, **deve** ser versionado: é ele que ensina o formato, sempre com placeholders.)

## Critérios de aceitação

- [ ] `.gitignore` inclui `.env` (e variantes locais).
- [ ] Nenhum segredo real está versionado (`git diff --cached` e `git grep` limpos).
- [ ] `.env.example`, se existir, usa apenas placeholders.
- [ ] `docs/risks.md` existe, com tabela risco → detectar → mitigar → **limite** e seção do que não é coberto.
- [ ] O README tem seção "Segurança e limitações" declarando o que não é coberto.
- [ ] Inputs são tratados como não confiáveis (`textContent`) em todo o código.
- [ ] Nenhuma promessa de "projeto seguro" no README ou no post.
- [ ] Commit `docs(security): add risk review and risks.md` realizado.

## Checklist de segurança

- [ ] Nenhum segredo real (token, senha, chave) versionado ou exposto.
- [ ] Nenhuma PII (e-mail, nome, telefone reais) no código, dados ou screenshots.
- [ ] O capítulo e o projeto **não** detalham como explorar nenhum ataque.
- [ ] Nenhuma afirmação de segurança completa; limites declarados explicitamente.

## Entrega de portfólio

### Entregas obrigatórias do C11

1. `.gitignore` conferido (com `.env`).
2. `docs/risks.md` com a tabela de riscos e a seção de limites.
3. Seção "Segurança e limitações" no `README.md`.
4. `.env.example` com placeholders (somente se o projeto precisar).
5. Entrada no `docs/diario-tecnico.md`.
6. Commit `docs(security): add risk review and risks.md`.

### Screenshots ou diagramas esperados

A tabela de riscos do `docs/risks.md` é a evidência principal. **Não** inclua screenshots com dados sensíveis — o ponto do capítulo é o oposto.

### Evidências esperadas

Checklist de revisão pré-publicação (os comandos do debugging guiado) registrado no diário ou no PR, mostrando que a revisão foi feita.

### Limitações que devem aparecer

- Esta é uma revisão inicial de fundamentos, **não** uma auditoria de segurança.
- Sem autenticação, sem validação no servidor, sem proteção contra ataques sofisticados.
- O hábito de revisão importa mais, no V01, do que a completude da cobertura.

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Este esboco é para uso futuro, quando você quiser compartilhar o aprendizado. Não publique agora — o projeto ainda está em construção.*

---

**Gancho:** "Antes de publicar meu projeto, parei e revisei o que NÃO deveria ir para o GitHub. Achei um token de teste versionado."

**Contexto:** Estou construindo o IntraStack Básico, um portal de onboarding fictício, para aprender desenvolvimento web do zero.

**Problema:** Na revisão pré-publicação, o `git diff` mostrou um `.env` com um token sendo versionado. Mesmo de teste: a partir do Git público, é tratado como exposto.

**O que aprendi:** A diferença entre `.env` (valores reais, fora do Git) e `.env.example` (só placeholders, público). A revisar com `git status`/`git diff --cached` antes de cada push. E a documentar riscos com honestidade num `docs/risks.md` — incluindo o que o projeto **não** protege. Segurança no começo não é firewall: é higiene (segredo fora do Git, input não confiável) e honestidade (não prometer o que não testei).

**Limitação honesta:** Revisão inicial de fundamentos, não auditoria. Sem autenticação, sem servidor, sem proteção contra ataques sofisticados. Projeto de estudo.

**Próximo passo:** C12 — publicar de forma simples, conferindo link, assets e evidências.

**Link:** [quando pronto: link do commit ou do docs/risks.md]

---

## Perguntas de revisão

1. Por que apagar um `.env` que já foi commitado **não** resolve o problema de exposição? O que você precisa fazer além de apagar?

2. Qual é a diferença de função entre `.env` e `.env.example`? Qual dos dois vai para o Git, e por quê?

3. Um colega diz: "coloquei os valores reais no `.env.example` pra facilitar o teste de quem clona". Qual é o problema, e como você corrigiria?

4. Quais comandos você roda antes de um push para revisar o que vai ficar público? Qual deles mostra exatamente o conteúdo que entrará no commit?

5. Por que o `docs/risks.md` deste capítulo inclui uma coluna de "limite no V01"? O que essa coluna comunica que uma simples lista de mitigações não comunica?

6. O capítulo insiste em não escrever "projeto seguro" no README. Por quê? Como você descreveria, de forma honesta, o trabalho de segurança feito no V01?

7. "Input é dado não confiável" foi tratado no C08 e no C10. Como esse princípio aparece na revisão de segurança deste capítulo, e qual é a defesa concreta no V01?

## Próximo passo

O IntraStack passou pela revisão que faltava. Nenhum segredo vai para o repositório, o `.env.example` (se houver) só ensina o formato, os inputs são tratados como não confiáveis, e o `docs/risks.md` registra os riscos **e** os limites — com honestidade, sem prometer o que o V01 não entrega. Mais do que os arquivos, você levou um hábito: olhar o projeto com os olhos de quem vai abri-lo, antes que ele fique público.

O **Capítulo 12** finalmente leva o IntraStack ao ar de forma consciente: publicação estática, conferindo se os links funcionam, se os assets carregam no ambiente publicado (não só na sua máquina) e se as evidências de portfólio estão no lugar. Depois de revisar o que **não** pode sair, você publica o que **deve** — com cuidado.

O projeto sai da sua máquina para o mundo.
