---
title: "Capítulo 5 — Do projeto local para o GitHub: README, branch e Pull Request"
status: Preview
volume: 1
capitulo: 5
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.

# Capítulo 05 — Do projeto local para o GitHub: README, branch e Pull Request

## Abertura

A mensagem apareceu numa sexta-feira à tarde.

"Consegui um slot para revisar seu projeto esta semana. Manda o link."

O Mestre Py.

Você travou. Abriu o explorador de arquivos. Navegou até `stackovia-intrastack-basic-rascunho/`. A pasta estava lá, com o histórico Git que você tinha construído no capítulo anterior — commits reais, log limpo, `git log` impecável. Mas era uma pasta. No seu computador.

Não tinha link.

Você pensou em zipar tudo e mandar por e-mail. Depois descartou a ideia. Pensou em compartilhar pelo Google Drive. Também não parecia certo. O que faz sentido é um repositório no GitHub — mas você nunca tinha criado um antes.

Respondeu com honestidade: "Ainda não subi para o GitHub. Posso fazer isso agora?"

O Mestre Py levou alguns minutos para responder. "Pode. Mas quando subir, garante que eu consiga entender o que é o projeto, como abrir e qual mudança você quer que eu revise. Sem isso, a revisão não começa."

Essa instrução parece simples. Mas ela esconde três problemas que a maioria dos repositórios de estudo tem: README que não diz nada útil, branch com nome que não explica a intenção e PR que o revisor não sabe o que fazer.

Este capítulo resolve esses três problemas.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Tirar o projeto da máquina e torná-lo revisável (C05) |
| Tarefa | Publicar o repositório, iniciar README profissional e abrir PR de estudo |
| Definição de pronto | Repositório remoto com README, branch e PR descrito |

O tamanho desta sprint é o de um capítulo, não o de uma semana. Cada leitor avança no seu próprio ritmo — o que importa é terminar o capítulo com o repositório no ar e revisável.

## Problema de negócio

O IntraStack básico existe só na sua máquina.

Isso significa que ninguém pode revisar, aprender com o seu trabalho, dar feedback ou confirmar que o projeto funciona além do seu ambiente local. Para efeito de aprendizado e portfólio, um projeto que só existe localmente não existe profissionalmente.

O GitHub resolve a portabilidade. Mas não resolve sozinho: um repositório com arquivos e sem explicação é só um depósito remoto. O que transforma um depósito em evidência técnica é o README, a branch com nome claro e o PR com contexto suficiente para que outra pessoa entenda a intenção sem precisar adivinhar.

## O que será construído neste capítulo

Ao final deste capítulo, o projeto IntraStack básico terá:

- Repositório remoto no GitHub (`stackovia-intrastack-basic`), público ou visível para quem você escolher.
- Primeiro push da branch `main` com o histórico do C04.
- Branch `docs/vol01-readme-inicial` com nome que declara intenção.
- `README.md` inicial com problema, stack, como abrir, limitações e próximos passos.
- `diagrams/git-flow.md` com o fluxo Git do capítulo documentado em texto.
- `docs/pr-checklist.md` com o checklist que você vai usar nos próximos PRs.
- Pull Request de estudo aberto no GitHub, com contexto, o que mudou, como verificar, limitações e checklist.

O repositório público (`stackovia-intrastack-basic`) é diferente da pasta local (`stackovia-intrastack-basic-rascunho`). O sufixo `-rascunho` existe localmente para lembrar que o projeto ainda não era revisável. A partir deste capítulo, o GitHub recebe o nome limpo e o projeto começa a existir como artefato público.

## Cena/tensão de abertura

Você criou o repositório no GitHub. Copiou os arquivos, adicionou tudo com `git add .`, fez um commit com a mensagem `"primeiro commit"` e deu push.

Depois abriu uma branch chamada `atualizacoes`, adicionou o README e o fluxo, fez commit e abriu um Pull Request com o título `"alterações iniciais"`.

Mandou o link para o Mestre Py.

Dez minutos depois, a resposta chegou:

"Abri o repositório. Não entendi o que é o projeto. Não entendi o que a mudança no PR tenta fazer. E tem um campo no README com 'insira aqui o nome da stack' que você esqueceu de preencher. Revisão suspensa."

Não era crítica. Era diagnóstico.

O projeto estava no GitHub. Mas o repositório não comunicava nada: o commit de setup tinha mensagem genérica (`"primeiro commit"`, sem semântica), o README estava incompleto, a branch não explicava o que mudava e o PR não tinha contexto. Para o revisor, era como receber um documento em branco com o assunto "informações".

O Mestre Py mandou uma segunda mensagem:

"Se eu precisar abrir todos os arquivos para descobrir o que é o projeto e o que você quer que eu revise, o repositório ainda não está pronto. README e PR não são burocracia. São a primeira linha de comunicação técnica."

Esse é o problema que este capítulo resolve: não basta subir os arquivos para o GitHub. O repositório precisa comunicar intenção.

## Exemplo concreto antes do conceito

Antes de explicar o que é um README profissional ou como descrever um PR, veja o que o revisor encontra em cada caso.

### README vazio versus README que funciona

**README A — o que não funciona:**

```markdown
# stackovia-intrastack-basic

Projeto do curso.

## Tecnologias

- HTML
- CSS
- JavaScript

## Como usar

Abra o arquivo.
```

O revisor lê e ainda não sabe:

- Qual problema o projeto resolve?
- Qual arquivo abrir?
- Funciona só offline? Precisa de servidor local?
- Qual é o estado atual — está pronto, em andamento, é rascunho de estudo?
- Quais são as limitações?

**README B — o que funciona:**

```markdown
# stackovia-intrastack-basic

Portal interno da Stackovia, construído como projeto de estudo do Volume 1.

## Problema

A equipe da Stackovia precisava de um ponto central de informações. Este projeto
simula a primeira versão do portal, com foco em estrutura, versionamento e organização.

## Stack

HTML, CSS e JavaScript básico (sem framework). Sem servidor, sem banco de dados.

## Como abrir

1. Clone: `git clone https://github.com/exemplo/stackovia-intrastack-basic.git`
2. Entre na pasta: `cd stackovia-intrastack-basic`
3. Abra `src/index.html` no navegador (duplo clique ou arraste).
4. Abre via `file://` — não precisa de servidor.

## Limitações

Projeto de estudo do V01. Sem backend, sem autenticação, sem deploy real.
O layout evolui nos próximos capítulos (C06, C07, C08).
```

A diferença não está no tamanho. Está em responder as perguntas que qualquer revisor vai ter antes de abrir o primeiro arquivo.

---

### Branch com nome confuso versus branch com intenção

**Branch A — sem intenção (INC-V01-003):**

```
teste-final-agora-vai
```

O revisor abre o PR e essa é a primeira coisa que vê. Surgem imediatamente as perguntas: é feature? é correção? é documentação? Qual é o escopo?

**Branch B — com intenção:**

```
docs/vol01-readme-inicial
```

Antes de abrir um único arquivo, o revisor já sabe: é documentação (`docs`), pertence ao volume 1 (`vol01`) e o objetivo é o README inicial (`readme-inicial`). Contexto sem precisar perguntar.

---

### PR sem contexto versus PR como comunicação

**PR A — sem contexto:**

> **Título:** alterações iniciais
>
> **Descrição:** (vazia)

O revisor precisa abrir cada arquivo para descobrir o que mudou e por quê. Isso não é revisão; é investigação.

**PR B — com contexto:**

> **Título:** docs: adiciona README inicial e documentação do fluxo Git
>
> **Contexto:** Primeiro PR de estudo do IntraStack básico. Adiciona documentação inicial do repositório após o setup Git do C04.
>
> **O que mudou:**
> - `README.md` — problema, stack, como abrir, limitações, próximos passos
> - `diagrams/git-flow.md` — fluxo `commit → push → branch → PR` em texto
> - `docs/pr-checklist.md` — checklist para PRs futuros deste repositório
>
> **Como verificar:**
> 1. Leia o README: consegue entender o projeto sem abrir outros arquivos?
> 2. Siga as instruções de como abrir: funcionam?
>
> **Limitações:** PR de estudo — autor e revisor são a mesma pessoa. Projeto em fundamentos (V01).
>
> **Checklist:**
> - [x] Branch com nome claro
> - [x] Commit semântico
> - [x] Sem segredo ou dado sensível
> - [x] PR declarado como de estudo

Esse PR pode ser revisado por qualquer pessoa, mesmo sem nunca ter visto o projeto.

## Conceitos essenciais

### 1. Repositório remoto: o que muda

No C04, você aprendeu que o repositório Git é o histórico local do projeto — commits, árvore de arquivos, metadados de cada mudança.

O repositório remoto é a cópia desse histórico em um servidor acessível. No caso do GitHub, esse servidor é `github.com`. O remoto não substitui o local; os dois coexistem. Você trabalha localmente e empurra (`push`) as mudanças para o remoto quando elas estão prontas para ser vistas ou preservadas fora da sua máquina.

O comando que cria a ligação entre os dois é:

```bash
git remote add origin <url-do-repositorio>
```

`origin` é apenas o nome convencional para o remoto principal. Você poderia dar outro nome, mas `origin` é o padrão que qualquer ferramenta Git espera.

### 2. git push: subindo o histórico

Com o remoto configurado, você envia o histórico local para o GitHub:

```bash
# Na primeira vez, use -u para associar a branch local à remota
git push -u origin main
```

O `-u` (ou `--set-upstream`) cria a associação permanente. Da próxima vez, basta `git push` dentro dessa branch — sem precisar repetir `origin main`.

Se a sua versão do Git usa `master` como padrão e você quer usar `main` (padrão moderno), renomeie antes do push:

```bash
git branch -M main
git push -u origin main
```

### 3. Branch como comunicação de intenção

Você já sabe que branch é uma linha paralela de desenvolvimento. Mas branch tem um segundo papel que só fica claro quando outra pessoa abre o PR: ela é a primeira informação que o revisor recebe sobre o que vai mudar.

Uma branch bem nomeada segue o padrão:

```
tipo/descricao-curta
```

Exemplos que funcionam:

| Branch | O que comunica |
|---|---|
| `docs/vol01-readme-inicial` | documentação, volume 1, readme inicial |
| `feat/vol01-home-html` | nova feature, volume 1, home em HTML |
| `fix/vol01-imagem-quebrada` | correção, volume 1, imagem quebrada |
| `chore/vol01-gitignore` | manutenção, volume 1, gitignore |

Exemplos que não funcionam:

| Branch | Por que não funciona |
|---|---|
| `teste-final-agora-vai` | não diz tipo, nem escopo, nem objetivo |
| `minhas-alteracoes` | poderia ser qualquer coisa |
| `branch1` | numeração sem semântica |
| `wip` | work in progress de quê? |

O padrão `tipo/descricao` segue o mesmo raciocínio dos commits semânticos do C04. O objetivo é o mesmo: tornar a intenção legível sem precisar abrir o arquivo.

### 4. README profissional: as seções mínimas

O README é o primeiro arquivo que qualquer pessoa abre em um repositório. Ele precisa responder, no mínimo:

1. **O que é este projeto?** — uma frase sem jargão, sem depender de contexto externo.
2. **Qual problema resolve?** — contexto concreto, não pitch de marketing.
3. **Qual é a stack?** — tecnologias principais, sem lista enciclopédica.
4. **Como abrir ou rodar?** — instruções literais, testáveis do zero.
5. **Quais são as limitações?** — especialmente em projetos de estudo: o que *não* está pronto.
6. **Quais são os próximos passos?** — para situar o leitor na trajetória.

Para o V01, o README ainda não precisa de badges de CI, cobertura de testes ou documentação de API. Essas coisas entram nos volumes certos. Badges sem pipeline real são decoração que induzem o avaliador em erro — isso entra no checklist de segurança.

### 5. Pull Request como artefato de comunicação técnica

Um Pull Request não é uma formalidade burocrática. É o artefato que descreve uma mudança proposta — problema, solução, evidência, limitações e critério de aceite — de forma que o revisor possa entender, verificar e decidir sem precisar adivinhar.

Para este capítulo, o PR será de estudo: você é o autor e o revisor ao mesmo tempo. Isso é uma prática legítima para aprender o fluxo antes de participar de colaboração real. O que importa é que o PR seja honesto sobre esse contexto.

As seções mínimas de um PR eficaz no V01:

- **Contexto:** para onde este PR se encaixa na trajetória do projeto.
- **O que mudou:** lista explícita de arquivos e intenção de cada mudança.
- **Como verificar:** passos que o revisor pode seguir para confirmar que funciona.
- **Limitações:** o que não foi feito, o que ainda é rascunho, o que vem depois.
- **Checklist:** confirmações binárias (sim/não) sobre critérios do PR.

## Fluxo: do commit local ao PR no GitHub

```text
Histórico local (commits do C04)
  ↓
git remote add origin <url>
git branch -M main
git push -u origin main              ← sobe o histórico da main
  ↓
git checkout -b docs/vol01-readme-inicial  ← abre branch de trabalho
  ↓
Escreve README.md, diagrams/git-flow.md, docs/pr-checklist.md
  ↓
git add README.md diagrams/git-flow.md docs/pr-checklist.md
git commit -m "docs: adiciona README inicial e documentação do fluxo Git"
  ↓
git push -u origin docs/vol01-readme-inicial  ← sobe a branch
  ↓
Abre PR no GitHub          ← contexto + o que mudou + como verificar + checklist
  ↓
Revisão (você mesmo, neste capítulo)
  ↓
Merge (opcional — o PR pode ficar aberto como evidência)
```

Dois pontos importantes sobre esse fluxo:

**Por que não fazer push direto na main?** Em projetos reais, `main` é a branch que reflete o estado que seria publicado. Empurrar direto na `main` sem revisão gera problemas em times. No V01, você trabalha sozinho — mas o hábito de abrir uma branch para cada mudança significativa forma a base do workflow colaborativo que vem nos volumes seguintes.

**O merge é obrigatório agora?** Não. O PR pode ficar aberto como evidência de que você domina o fluxo. O merge acontece naturalmente no C06, quando a branch de documentação estiver revisada e o próximo capítulo adicionar código real.

## O que pode dar errado?

### 1. Token ou credencial no repositório

O erro mais grave: commitar um token de API, senha, chave ou credencial dentro de um arquivo e dar push. Isso vale para arquivos `.env`, arquivos de configuração, arquivos de teste com dados reais e até comentários no código com valores de exemplo.

O GitHub tem detecção de segredos que notifica quando padrões conhecidos de tokens aparecem em commits públicos. Mas a notificação vem depois do push — e uma vez no histórico público, o segredo precisa ser revogado imediatamente, mesmo que você remova o arquivo depois. O histórico Git guarda cada versão: deletar o arquivo não apaga o commit anterior.

O `.gitignore` do projeto (criado no C04) já protege `.env`. Mas se você criar um arquivo de configuração com nome diferente, verifique antes de adicionar ao commit.

### 2. Dado sensível no README

O README é público. Isso inclui: nome real de empresa, e-mail corporativo, URL interna, screenshot com informação confidencial, nome de sistema interno, IP de servidor real. Para o IntraStack básico tudo é fictício (Stackovia, `.example`). Mas se você adaptar o projeto para algo real, revise o README antes do push.

### 3. E-mail exposto no histórico de commits

O Git associa cada commit ao e-mail configurado em `git config user.email`. Se esse e-mail é pessoal ou corporativo e você não quer que apareça publicamente, configure um endereço noreply do GitHub antes do push:

```bash
# Verifica o e-mail atual
git config user.email

# Troca para o noreply do GitHub (substitua pelo seu username)
git config user.email "seu-usuario@users.noreply.github.com"
```

O endereço noreply é gerado nas configurações da sua conta no GitHub (Settings → Emails → Keep my email address private).

### 4. Branch com nome genérico ou que não será limpa

Uma branch chamada `main-backup` ou `old-version` não comunica nada e pode confundir quem olha o repositório depois. Branches devem ter nome e duração controlados: nascem com intenção clara, são merged ou deletadas.

### 5. README que não é testável (INC-V01-005)

Se o README diz "abra o arquivo" sem dizer qual arquivo, ou diz "instale as dependências" sem listar quais, o documento falhou como guia. O repositório parece pronto — tem arquivos, tem commits — mas quem avalia precisa adivinhar a entrada. Antes de considerar o README pronto, siga as próprias instruções do zero, em outra pasta, ou peça para alguém que não conhece o projeto tentar abrir.

## Debugging guiado: como saber se o repositório está revisável

Antes de abrir o PR, faça o teste do visitante externo:

**Passo 1 — Leia o README como se você nunca tivesse visto o projeto.**
Você consegue responder: o que é? qual problema resolve? como abre? quais são as limitações?

**Passo 2 — Siga as instruções do README do zero.**
Clone o repositório em uma pasta diferente, ou peça para alguém clonar. As instruções levam até o projeto funcionando? Se não, o README está incompleto.

**Passo 3 — Verifique a branch.**
O nome explica a intenção? Alguém que nunca viu o projeto entende o escopo só pelo nome?

**Passo 4 — Leia o PR como revisor.**
Você consegue entender o que mudou, por que mudou e como verificar, sem abrir um único arquivo? Se sim, o PR está pronto para revisão.

**Passo 5 — Verifique o histórico de arquivos adicionados.**
Nenhum `.env`, nenhum arquivo de configuração com dados reais, nenhum arquivo de sistema (`.DS_Store`, `Thumbs.db`, arquivos de IDE não listados no `.gitignore`).

## Code Review do Mestre Py

*Aplicando INC-V01-004: PR sem descrição clara.*

---

O Mestre Py abre o PR. O título está lá: **"alterações iniciais"**. A descrição está vazia.

Ele abre a aba de arquivos. Vê `README.md` adicionado, `diagrams/git-flow.md` adicionado, `docs/pr-checklist.md` adicionado. Fecha a aba. Volta para a descrição. Ainda vazia.

**Aprovaria?**
Não. Não há contexto suficiente para revisão.

**Pediria ajuste?**
Sim — e enviaria uma lista:
- Qual é o objetivo desta mudança? "Alterações iniciais" não diz nada.
- O que exatamente mudou e por quê?
- Como verifico que funciona? Tem alguma instrução de teste?
- Quais são as limitações?
- Isso é um PR de estudo? Se é, declara isso explicitamente.

**Reprovaria?**
Em um projeto colaborativo real, sim. PR sem contexto bloqueia o time porque transfere o trabalho de contextualização para o revisor.

**Resumo do Mestre Py:**
"PR não é formalidade. É a primeira coisa que o revisor lê antes de olhar o código. Se o título é genérico e a descrição está vazia, você transferiu o trabalho de contextualização para quem revisará. Isso cobra juros — no review, e no próximo sprint, porque o mesmo revisor vai lembrar que revisar seu PR dá trabalho desnecessário."

---

Um bom PR no V01 não precisa ser longo. Precisa ser suficiente:

- Uma frase de contexto.
- Uma lista do que mudou.
- Um passo de verificação.
- Uma frase de limitação.
- Um checklist de no mínimo três itens.

Isso é tudo. Mas precisa estar lá.

## Mãos à Obra

As tarefas abaixo constroem o repositório e o PR passo a passo. Execute na ordem.

### Tarefa 1 — Criar o repositório no GitHub

Acesse github.com e crie um novo repositório com o nome exato `stackovia-intrastack-basic`.

Configurações recomendadas:

- **Visibilidade:** público (para servir como portfólio). Se preferir privado por enquanto, você pode tornar público depois.
- **Inicializar com README:** não. Você vai criar o README localmente e empurrar.
- **Adicionar .gitignore:** não. Já existe no projeto local.
- **Licença:** não por enquanto.

Anote a URL do repositório. O formato será:

```
# HTTPS
https://github.com/seu-usuario/stackovia-intrastack-basic.git

# SSH (recomendado se você configurou chave SSH)
git@github.com:seu-usuario/stackovia-intrastack-basic.git
```

### Tarefa 2 — Conectar o repositório local ao GitHub

No terminal, dentro da pasta `stackovia-intrastack-basic-rascunho/`:

**Se você configurou chave SSH** (recomendado — sem pedir senha a cada push):

```bash
# Adiciona o remoto com o nome "origin" via SSH
git remote add origin git@github.com:seu-usuario/stackovia-intrastack-basic.git

# Confirma que o remoto foi adicionado
git remote -v
```

A saída de `git remote -v` deve mostrar:

```
origin  git@github.com:seu-usuario/stackovia-intrastack-basic.git (fetch)
origin  git@github.com:seu-usuario/stackovia-intrastack-basic.git (push)
```

**Se você ainda não configurou SSH**, use HTTPS (pede usuário/token na primeira vez):

```bash
git remote add origin https://github.com/seu-usuario/stackovia-intrastack-basic.git
git remote -v
```

A saída será semelhante, com `https://` no lugar de `git@github.com:`. O restante dos comandos `git push`, `git pull` e `git fetch` funciona igual nos dois casos.

### Tarefa 3 — Subir o histórico da main

```bash
# Se necessário, renomeia a branch atual para "main"
git branch -M main

# Primeiro push: -u associa a branch local à remota
git push -u origin main
```

Abra o repositório no GitHub e confirme que o histórico de commits do C04 aparece na aba **Commits**. Os commits que você fez no capítulo anterior agora estão no servidor.

**Windows PowerShell / CMD:** os comandos `git remote`, `git branch` e `git push` funcionam identicamente. Se você usa Gitbash, WSL ou terminal integrado do VS Code, o comportamento é o mesmo.

### Tarefa 4 — Criar a branch de trabalho

```bash
git checkout -b docs/vol01-readme-inicial
```

Confirme:

```bash
git branch
```

A saída deve mostrar `* docs/vol01-readme-inicial` marcada com asterisco (branch atual).

### Tarefa 5 — Escrever o README.md

Crie (ou substitua qualquer README vazio que exista) o arquivo `README.md` na raiz do projeto com as seções mínimas. Substitua `seu-usuario` pelo seu username real do GitHub:

```markdown
# stackovia-intrastack-basic

Portal interno da Stackovia — projeto de estudo do Volume 1.

## Problema

A equipe da Stackovia precisava de um ponto central de informações. Este projeto
simula a primeira versão do portal, com foco em estrutura, versionamento e organização
de arquivos. Construído como projeto integrador do Volume 1 da série Stackovia Learning.

## Stack

- HTML (introduzido no C06)
- CSS (introduzido no C07)
- JavaScript básico (introduzido no C08)

> Nenhum framework, nenhum servidor, nenhum banco de dados. Apenas fundamentos.

## Como abrir

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/stackovia-intrastack-basic.git
   ```
2. Acesse a pasta:
   ```bash
   cd stackovia-intrastack-basic
   ```
3. Abra `src/index.html` no navegador (duplo clique ou arraste para a janela).
4. Abre via `file://` — não precisa de servidor local.

> A pasta `src/` e o arquivo `index.html` serão criados no C06.
> Neste capítulo (C05), o repositório contém documentação e estrutura inicial.

## Estrutura do projeto

```
stackovia-intrastack-basic/
├── docs/
│   ├── escopo-v01.md
│   ├── diario-tecnico.md
│   ├── http-basico.md
│   ├── checklist-diagnostico.md
│   ├── runbook-local.md
│   └── pr-checklist.md       ← adicionado neste capítulo
├── diagrams/
│   ├── request-response.md
│   └── git-flow.md           ← adicionado neste capítulo
├── assets/
│   └── screenshots/
└── README.md                 ← este arquivo
```

## Limitações

- Projeto de estudo. Rótulo de maturidade: **Estudo / Fundamentos**.
- Sem backend, sem autenticação, sem deploy real.
- O `src/index.html` e o CSS real entram nos próximos capítulos.
- Este repositório reflete o Volume 1 — os volumes seguintes adicionam React,
  FastAPI, banco de dados, Docker e mais.

## Próximos passos

| Capítulo | O que adiciona |
|---|---|
| C06 | HTML semântico — primeira página do portal |
| C07 | CSS moderno e responsivo |
| C08 | JavaScript básico aplicado |
| C09 | Fetch e dados mockados |
| V02+ | React, TypeScript, Next.js |
| V03+ | FastAPI, banco de dados |

## Sobre a série

Parte da [Stackovia Learning Series](https://github.com/mffdeo/stackovia-learning).
```

### Tarefa 6 — Criar diagrams/git-flow.md

Crie o arquivo `diagrams/git-flow.md` com o fluxo Git deste capítulo:

````markdown
# Fluxo Git — Capítulo 05

## Fluxo completo: do commit local ao PR

```text
Histórico local (commits do C04)
  ↓
git remote add origin <url>          ← conecta ao GitHub
git branch -M main
git push -u origin main              ← sobe o histórico
  ↓
git checkout -b docs/vol01-readme-inicial  ← branch de trabalho
  ↓
Escreve README.md, diagrams/git-flow.md, docs/pr-checklist.md
  ↓
git add <arquivos>
git commit -m "docs: adiciona README inicial e documentação do fluxo Git"
  ↓
git push -u origin docs/vol01-readme-inicial  ← sobe a branch
  ↓
Pull Request no GitHub
  ↓
Review → Merge (opcional neste capítulo)
```

## Convenção de nomes de branch usada neste volume

```
tipo/descricao-curta
```

| Branch | Tipo | O que comunica |
|---|---|---|
| `docs/vol01-readme-inicial` | documentação | V01, README inicial |
| `feat/vol01-home-html` | feature | V01, home HTML |
| `fix/vol01-imagem-quebrada` | correção | V01, imagem |
````

### Tarefa 7 — Criar docs/pr-checklist.md

Crie o arquivo `docs/pr-checklist.md`:

```markdown
# Checklist de Pull Request — IntraStack básico

Use este checklist antes de abrir qualquer PR neste repositório.

## Antes de abrir o PR

- [ ] A branch tem nome claro no padrão `tipo/descricao`?
- [ ] O commit message descreve a intenção (commit semântico)?
- [ ] Revisei os arquivos que estou incluindo? Nada que não deveria estar?
- [ ] Sem segredo, token, e-mail desnecessário ou dado interno nos arquivos?

## Na descrição do PR

- [ ] Tem contexto (para onde este PR se encaixa no projeto)?
- [ ] Tem lista do que mudou e por quê?
- [ ] Tem instrução de como verificar?
- [ ] Tem limitações declaradas?
- [ ] Se é PR de estudo, está declarado como tal?

## Checklist de segurança

- [ ] Nenhum arquivo `.env` ou configuração com dados reais incluído.
- [ ] Nenhum caminho absoluto de máquina no README ou docs.
- [ ] Nenhum dado de empresa, cliente ou usuário real nos arquivos.
- [ ] Badge ou status só se refletir realidade (sem pipeline de CI inventado).
```

### Tarefa 8 — Commitar e subir a branch

```bash
# Adiciona os três arquivos criados ou modificados — um por um, não git add .
git add README.md diagrams/git-flow.md docs/pr-checklist.md

# Confirma o que vai no commit
git status

# Commit semântico
git commit -m "docs: adiciona README inicial, fluxo Git e checklist de PR"

# Sobe a branch para o GitHub
git push -u origin docs/vol01-readme-inicial
```

**Por que `git add` por arquivo, não `git add .`?** A cena de abertura deste capítulo mostrou um leitor que usou `git add .` e empurrou o projeto com README incompleto e mensagem genérica. `git add .` adiciona *tudo* que está modificado ou novo na pasta — incluindo arquivos de sistema, rascunhos esquecidos ou configurações que não deveriam ir para o servidor. Adicionar por arquivo é a forma de ter consciência do que entra em cada commit. O item 1 de "O que pode dar errado?" trata exatamente desse risco.

Confirme no terminal que o push foi bem-sucedido. O GitHub vai mostrar um aviso sugerindo que você abra um Pull Request — isso é o próximo passo.

**Windows:** mesmos comandos. `git status`, `git add`, `git commit` e `git push` funcionam identicamente no PowerShell, CMD, Gitbash e WSL.

### Tarefa 9 — Abrir o PR no GitHub

Acesse o repositório no GitHub. Clique em **"Compare & pull request"** (ou vá em Pull Requests → New pull request).

Configure:

- **Base:** `main`
- **Compare:** `docs/vol01-readme-inicial`

Use o título e a descrição a seguir como modelo — adapte para refletir o que você realmente fez:

**Título:**
```
docs: adiciona README inicial, fluxo Git e checklist de PR
```

**Descrição:**
```markdown
## Contexto

Primeiro PR de estudo do IntraStack básico. Adiciona documentação inicial
do repositório após o setup Git do C04 (histórico local subido para a main).

## O que mudou

- `README.md` — problema, stack, como abrir, estrutura, limitações, próximos passos
- `diagrams/git-flow.md` — fluxo `commit local → GitHub → branch → PR` em texto
- `docs/pr-checklist.md` — checklist para PRs futuros deste repositório

## Como verificar

1. Leia o README: consegue entender o projeto sem abrir outros arquivos?
2. Siga as instruções de como abrir: as instruções levam ao resultado descrito?
3. Verifique `diagrams/git-flow.md`: o fluxo reflete o que foi feito no C05?

## Limitações

PR de estudo — autor e revisor são a mesma pessoa. Projeto em fundamentos (V01).
`src/index.html` ainda não existe (entra no C06).

## Checklist

- [x] Branch com nome claro (`docs/vol01-readme-inicial`)
- [x] Commit semântico
- [x] README tem problema, stack, como abrir e limitações
- [x] Sem token, segredo ou dado sensível
- [x] PR declarado como de estudo
```

Clique em **"Create pull request"**.

Você criou o seu primeiro PR documentado. Mesmo sendo de estudo e sem revisor externo, o PR comunica intenção — e isso é o que importa aprender neste capítulo.

### Tarefa 10 — Atualizar o diário técnico

Abra `docs/diario-tecnico.md` e adicione uma entrada:

```markdown
## C05 — GitHub, README e Pull Request

- Repositório `stackovia-intrastack-basic` criado no GitHub.
- Histórico do C04 subido para a branch `main`.
- Branch `docs/vol01-readme-inicial` criada e enviada.
- README inicial escrito com seções mínimas.
- PR de estudo aberto com contexto, mudanças, verificação e checklist.
- Aprendizado: PR não é formalidade. É comunicação técnica.
```

## Critérios de aceitação

- [ ] Repositório `stackovia-intrastack-basic` existe no GitHub.
- [ ] `git remote -v` mostra `origin` apontando para o repositório criado.
- [ ] O histórico de commits do C04 aparece na aba "Commits" do GitHub.
- [ ] Branch `docs/vol01-readme-inicial` existe no GitHub (aparece em Branches).
- [ ] `README.md` tem problema, stack, como abrir, limitações e próximos passos.
- [ ] `diagrams/git-flow.md` existe e documenta o fluxo do capítulo.
- [ ] `docs/pr-checklist.md` existe com checklist em três seções.
- [ ] PR aberto no GitHub com título semântico, contexto, lista de mudanças, como verificar, limitações e checklist.
- [ ] Nenhum arquivo sensível (`.env`, credencial, dado real) no repositório.

## Checklist de segurança

- [ ] Nenhum token, senha, chave SSH ou credencial nos arquivos commitados.
- [ ] Nenhum e-mail real desnecessário exposto nos arquivos ou no README.
- [ ] Nenhum caminho absoluto de máquina (tipo `C:\Users\nome-real\...`) no README ou docs.
- [ ] Badges no README somente se houver pipeline real por trás (neste capítulo, nenhum badge).

## Entrega de portfólio

### Entregas obrigatórias do C05

| Artefato | Localização | Obrigatório? |
|---|---|---|
| Repositório GitHub | `github.com/seu-usuario/stackovia-intrastack-basic` | Sim |
| `README.md` com seções mínimas | raiz do repositório | Sim |
| `diagrams/git-flow.md` | pasta `diagrams/` | Sim |
| `docs/pr-checklist.md` | pasta `docs/` | Sim |
| Pull Request de estudo aberto | aba Pull Requests do repositório | Sim |
| Entrada no `docs/diario-tecnico.md` | pasta `docs/` | Sim |

### Screenshots ou diagramas esperados

A pasta `assets/screenshots/` pode receber capturas da tela do repositório ou do PR aberto. Esses screenshots são **opcionais** — se você não tiver nada a guardar agora, a pasta continua com apenas o `.gitkeep` do C03.

### Limitações que devem aparecer no portfólio

- Repositório de estudo do Volume 1.
- PR simulado — autor e revisor são a mesma pessoa.
- Projeto ainda em fundamentos: sem backend, sem autenticação, sem deploy.
- O código HTML, CSS e JavaScript real entra nos próximos capítulos.

### Rótulo de maturidade

**Estudo / Fundamentos** — Volume 1, Capítulo 5.

## Mini post LinkedIn

*Apenas esboço para reuso futuro. Não publicar ainda — o projeto ainda está nos fundamentos.*

---

**Gancho:**
"Meu primeiro PR de estudo me ensinou que README também é parte da entrega."

**Texto:**
Passei o C05 aprendendo que subir código para o GitHub não é o mesmo que tornar um projeto revisável. Um repositório sem README claro, com branch de nome confuso e PR sem contexto é só um depósito remoto — não é portfólio.

O que mudou: aprendi a escrever README com seções que respondem o que qualquer visitante vai perguntar (o que é? como abre? quais são as limitações?), a nomear branch com intenção (`docs/vol01-readme-inicial` em vez de `atualizacoes`) e a descrever PR com contexto suficiente para revisão sem precisar adivinhar.

**Stack:** Git, GitHub. Projeto: IntraStack básico — portal interno de estudo da Stackovia.

**Limitação honesta:** PR de estudo — autor e revisor são a mesma pessoa. Projeto em fundamentos (sem backend, sem CI, sem deploy real).

**Próximo passo:** C06 — construir a primeira página HTML semântica do IntraStack.

**Link:** [quando pronto: link do repositório ou do PR]

---

## Perguntas de revisão

1. Qual é a diferença entre repositório local e repositório remoto? Por que os dois coexistem em vez de um substituir o outro?

2. O comando `git push -u origin main` usa a flag `-u`. O que ela faz e quando você não precisa mais usá-la nessa branch?

3. Você tem uma branch chamada `atualizacoes-2`. O que está errado com esse nome e como você a renomearia seguindo o padrão apresentado no capítulo?

4. Alguém te manda o link de um repositório. Você abre e o README diz: "Projeto web. Use HTML e CSS." O que está faltando para esse README ser útil de verdade?

5. Um PR tem o título "melhorias" e a descrição está vazia. Quais são os três problemas concretos que isso cria para quem vai revisar?

6. Por que expor um token de API em um repositório público é um problema sério mesmo que você apague o arquivo logo depois?

## Próximo passo

Com o repositório publicado, o README explicando o projeto e o PR documentando o fluxo, o IntraStack básico existe como artefato técnico revisável. O capítulo anterior deu memória ao projeto; este capítulo o tornou visível e comunicável.

O **Capítulo 06** começa a construir a substância: a primeira página HTML semântica do portal. O `src/index.html` que aparece como placeholder desde o C03 ganha estrutura real. O leitor aprende a diferenciar HTML semântico de HTML que só parece certo, a estruturar a navegação do IntraStack e a tornar a página acessível antes de adicionar qualquer CSS.

Ao final do C06, o repositório terá o primeiro arquivo de interface real — e o PR que esse arquivo abre já pode usar o README e o checklist que você escreveu aqui.
