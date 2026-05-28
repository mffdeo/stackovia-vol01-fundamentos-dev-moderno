---
title: "Capítulo 4 — Git como memória do aprendizado"
status: Preview
volume: 1
capitulo: 4
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.

# Capítulo 4 — Git como memória do aprendizado
## Abertura narrativa na Stackovia

Você fecha o C03 com a sensação de quem finalmente arrumou a mesa. A pasta `stackovia-intrastack-basic-rascunho/` tem estrutura, README, runbook, um `index.html` placeholder e o diário técnico com três entradas. Tudo no lugar, tudo com caminho relativo. Dá orgulho.

Aí você tem uma ideia.

"E se o `index.html` tivesse um título diferente? Deixa eu testar." Você apaga a linha do `<h1>`, escreve outra, troca o parágrafo, mexe na estrutura, gosta de uma versão, desgosta, mexe de novo. Quinze minutos depois a página está pior do que começou — e você não lembra exatamente o que tinha antes. A versão que funcionava existia há um quarto de hora e agora não existe em lugar nenhum. Não está no `Ctrl+Z` (você fechou e reabriu o editor). Não está em backup (você não fez). Não está "na pasta de ontem" (é o mesmo arquivo, salvo por cima).

O Mestre Py passa, olha a tela e não pergunta sobre o HTML. Pergunta outra coisa:

- **qual era a última versão que funcionava?**
- **e como você volta para ela agora?**

Você não tem resposta para nenhuma das duas. A página de C03 era reproduzível para *outra pessoa* — qualquer um abre a pasta e roda. Mas ela não é reproduzível *no tempo*: você não consegue voltar ao estado de cinco minutos atrás. É exatamente esse buraco que o C04 existe para fechar.

## Card da sprint

```text
[Card da Sprint]
Sprint:    Memória do projeto (C04)
Cargo:     Estagiário de desenvolvimento web
Tarefa:    Transformar a pasta do IntraStack em um repositório
           Git local, com commits pequenos e mensagens que
           explicam a intenção de cada mudança.
Definição
de pronto: Repositório iniciado na pasta do projeto, pelo
           menos três commits pequenos com mensagens claras,
           git status limpo no final e nenhum segredo ou
           caminho local versionado.
```

O capítulo é **laboratório**: você vai rodar comandos de Git de verdade, dentro da pasta que já existe. Não é aula de Git completo. Os comandos aparecem na ordem em que resolvem o problema da abertura — perder o estado que funcionava — e param exatamente onde o C04 termina. Branch, GitHub e Pull Request ficam para o C05.

## Problema de negócio

A Stackovia precisa que a evolução do IntraStack seja **rastreável**. Não por burocracia: por sobrevivência do trabalho.

Sem rastreabilidade, três coisas ruins acontecem, e você já viveu a primeira na abertura:

- você **perde** a versão que funcionava e não consegue voltar;
- você não consegue **explicar** quando algo quebrou, nem o que mudou entre "funcionava" e "parou";
- quem revisa o seu trabalho — Mestre Py, colega, recrutador — não consegue acompanhar a história das suas decisões.

Os três problemas têm a mesma raiz: o projeto não tem memória. Cada `salvar` sobrescreve o anterior, e o anterior some. O C04 troca isso por um histórico de pontos de retorno, pequenos e descritos, que você cria de propósito antes de arriscar.

Repare na palavra: **memória**, não ritual. Git não é uma sequência de comandos para decorar. É a forma de o projeto lembrar de si mesmo.

## O que será construído

No fim deste capítulo, a pasta do IntraStack básico continuará com os mesmos arquivos do C03 — mas agora dentro de um **repositório Git local**, com:

- um `.gitignore` que impede lixo do sistema e arquivos sensíveis de entrarem no histórico;
- pelo menos **três commits pequenos**, separados por intenção (estrutura, README, documentação/diagrama);
- mensagens de commit que explicam **o porquê** de cada mudança, não só o "o quê";
- uma seção nova de **convenção de commits** no `README.md`;
- uma entrada nova no `docs/diario-tecnico.md` registrando o C04;
- `git status` limpo ao final — nada solto, nada esquecido.

O que o C04 **não** vai entregar:

- branch, `git checkout -b`, fluxo de trabalho com ramos — isso é C05;
- GitHub, repositório remoto, `git push`, Pull Request — isso é C05;
- rebase, cherry-pick, Git Flow corporativo — fora do V01;
- resolução de conflitos profundos — fora do V01;
- comandos de desfazer destrutivos (`reset --hard`, `checkout -- arquivo` para descartar trabalho) — mencionados só como nota cautelosa, não ensinados aqui;
- GitHub Actions, CI/CD — isso é V06.

O foco é exclusivamente **histórico local confiável**. Pequeno, mas inegociável.

## Cena/tensão de abertura

Volte ao momento em que a versão boa do `index.html` evaporou.

O problema não foi o editor, nem o navegador, nem a sua memória. O problema é que, entre uma ideia e outra, **não havia ponto de retorno**. Você experimentou sem rede de proteção.

Agora imagine o oposto exagerado: você decide "salvar tudo de uma vez". Mexe no `index.html`, reescreve o `README.md`, ajusta o diagrama, cria o runbook, tudo junto, e no fim joga a frase mais perigosa do Git iniciante:

```text
git add .
git commit -m "update files"
```

Pronto. Um único commit gigante, com mudanças em quatro arquivos diferentes e uma mensagem que não diz nada. Daqui a duas semanas, quando a página quebrar, você vai abrir esse commit para entender o que aconteceu e vai encontrar... tudo misturado. Qual mudança quebrou? Foi o HTML? Foi o ajuste no diagrama? Impossível dizer.

A tensão do capítulo tem dois lados, e os dois doem:

- **mudança sem commit** — você perde o que funcionava (a abertura);
- **commit grande demais** — você "salva", mas não consegue revisar nem isolar o que mudou.

O bom uso de Git fica no meio: commits **pequenos**, **frequentes** e **descritos**. A próxima seção mostra os dois sintomas lado a lado, antes de nomear qualquer conceito.

## Exemplo concreto antes do conceito

Dois cenários do mesmo IntraStack. Um perde trabalho; o outro esconde o erro.

**Cenário A — mudança sem commit (trabalho perdido):**

```text
1. index.html funcionava.
2. Você edita o <h1>, o <p> e a estrutura. Salva por cima.
3. A página fica pior. Você quer voltar.
4. Não há para onde voltar: o "antes" não foi salvo em lugar nenhum.
```

O estado bom existiu e desapareceu. Não há diff, não há histórico, não há retorno.

**Cenário B — commit grande demais (erro escondido):**

```text
$ git log --oneline
9f3c1a2 update files
```

Um commit só. Dentro dele: HTML, README, diagrama e runbook, todos mexidos juntos. Quando você roda `git show 9f3c1a2`, o diff é uma parede de mudanças sem fio condutor. Se a página quebrou por causa de uma linha do HTML, essa linha está enterrada no meio de tudo o que mais mudou. O commit "salvou", mas não **conta uma história** — e por isso não ajuda a depurar.

Compare com o que você vai aprender a produzir:

```text
$ git log --oneline
c2d4e6f docs: add project notes and request/response diagram
a1b3c5d docs: add project README with commit convention
7e9f0a1 chore: add base structure and gitignore
```

Três pontos de retorno, cada um com uma intenção clara. Se algo quebrar, você sabe **em qual commit** olhar. Essa diferença — entre "salvar tudo" e "registrar intenções" — é o coração do capítulo.

## Conceitos essenciais

### Conceito-chave 1: as três áreas do Git

Quando você inicia o Git numa pasta, ele passa a enxergar o seu trabalho em três áreas. Entender as três resolve 90% da confusão de quem está começando.

- **Working tree (área de trabalho):** os arquivos como estão na pasta, agora. É onde você edita. Tudo aqui é volátil — se você sobrescrever, perdeu, como na abertura.
- **Staging (área de preparação, ou *index*):** uma sala de espera. Você escolhe, com `git add`, quais mudanças vão entrar no próximo commit. Nem tudo que você editou precisa entrar de uma vez.
- **Commit (ponto de retorno):** uma fotografia do que estava no staging, com uma mensagem e uma data. Uma vez criado, vira parte do **histórico** — uma memória estável à qual você sempre pode voltar.

O caminho de uma mudança é sempre o mesmo: você edita na working tree, escolhe o que vai com `git add` (vai para staging), e congela com `git commit` (vira histórico). A sala de espera (staging) é o que permite o commit pequeno: é ali que você separa "o que é uma intenção" de "tudo o que mudou".

### Conceito-chave 2: `git status` e `git diff` são a sua visão antes de salvar

Antes de commitar qualquer coisa, você precisa **ver** o que vai commitar. Dois comandos dão essa visão, e eles vêm sempre antes do commit:

- `git status` responde "o que mudou e o que já está no staging?". Mostra arquivos novos (untracked), modificados e prontos para commit.
- `git diff` responde "o que mudou, linha por linha?". Mostra o conteúdo exato da diferença.

```text
$ git status
On branch main
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        README.md
        docs/
        diagrams/
        src/

$ git diff
(sem saída: arquivos ainda não rastreados não aparecem em diff até o primeiro add)
```

Dependendo da versão do Git, a primeira linha pode aparecer como `On branch master` em vez de `On branch main`. É só o nome da linha principal do histórico — não mude nada agora; esse nome volta no C05, quando o projeto for para o GitHub.

O hábito que separa o iniciante do profissional é simples: **nunca commitar no escuro**. Roda `git status`, roda `git diff`, entende exatamente o que vai entrar, e só então commita. Esse hábito também é a sua primeira linha de defesa contra commitar segredo por engano (mais sobre isso no Conceito-chave 5).

### Conceito-chave 3: o commit é uma unidade de intenção

Um commit não é "tudo o que eu fiz hoje". É **uma intenção fechada**: uma mudança que faz sentido sozinha e pode ser descrita em uma frase curta.

A mensagem do commit é onde essa intenção vira memória. No V01, a regra é uma convenção simples e legível, no formato `tipo: descrição no imperativo`:

- `chore:` tarefa de manutenção/estrutura, sem mudar comportamento (ex.: `chore: add base structure and gitignore`);
- `docs:` mudança em documentação (ex.: `docs: describe initial project structure`);
- `feat:` um recurso novo (vai aparecer a partir do C06, quando houver HTML/CSS/JS);
- `fix:` correção de um problema.

A descrição é curta, no imperativo e em inglês — é a convenção mais comum em projetos abertos, e treinar isso desde já facilita o portfólio. O importante não é decorar a lista: é que a mensagem **explique a intenção**. "update files" não explica nada. "docs: describe initial project structure" explica.

> **Antes / Depois.**
> Antes: `update files`, `mudancas`, `commit final`, `agora vai` — mensagens que não dizem o que mudou nem por quê.
> Depois: `docs: describe initial project structure` — qualquer pessoa (inclusive você, em duas semanas) entende a intenção sem abrir o diff.

### Conceito-chave 4: o histórico é evidência

Cada commit entra numa sequência: o **histórico**. Você o lê com `git log`:

```text
$ git log --oneline
c2d4e6f docs: add project notes and request/response diagram
a1b3c5d docs: add project README with commit convention
7e9f0a1 chore: add base structure and gitignore
```

O `--oneline` resume cada commit em uma linha (código curto + mensagem). É a forma mais rápida de ver a história do projeto.

Esse histórico não é só conforto pessoal. É **evidência**: prova de que você trabalha em passos pequenos, com intenção clara. No C05, quando esse repositório for para o GitHub, o histórico vira a primeira coisa que um avaliador olha. Um histórico limpo de commits pequenos conta uma história profissional. Uma fileira de `update files` conta outra.

### Conceito-chave 5: o que NÃO deve entrar no Git

Versionar é poderoso justamente porque é difícil apagar do histórico. Por isso, algumas coisas **nunca** podem entrar:

- **segredos:** senha, token, chave de API, qualquer `.env` real. Uma vez commitado, o segredo fica no histórico mesmo que você apague o arquivo depois;
- **lixo do sistema:** `.DS_Store` (macOS), `Thumbs.db` (Windows), arquivos temporários do editor;
- **caminho ou dado pessoal:** nada que exponha a estrutura da sua máquina ou informação sua que não precisa ser pública.

A ferramenta que resolve isso é o `.gitignore`: um arquivo que lista o que o Git deve **ignorar**. O que está no `.gitignore` nem aparece como candidato a commit.

```text
# .gitignore — IntraStack básico
.env
.env.local
.DS_Store
Thumbs.db
*.log
```

> **Atenção de segurança.**
> O `.gitignore` é uma rede de proteção, não uma garantia. A garantia é o hábito do Conceito-chave 2: rodar `git status` e `git diff` antes de cada commit e conferir, com os próprios olhos, que nenhum segredo está na lista. No V01 não há `.env` real — quando houver, em volumes futuros, ele será `.env.example` com valores falsos. Segredo de verdade fica fora do repositório, sempre.

## Fluxo do Git local

O capítulo inteiro cabe neste desenho. Guarde-o.

```text
[ working tree ]          [ staging / index ]         [ commit ]              [ histórico ]
 arquivos que       git add  o que você marcou   git commit  fotografia com    git log  sequência de
 você editou    ─────────▶   para o próximo   ──────────▶    mensagem e     ─────────▶  pontos de
 (voláteis)                  commit                          data (estável)             retorno
       ▲                                                                                    │
       └──────────────────  você sempre pode voltar a ler um ponto de retorno  ────────────┘
```

- `git add <arquivo>` move uma mudança da working tree para o staging.
- `git commit -m "tipo: mensagem"` congela o staging em um ponto de retorno e o adiciona ao histórico.
- `git status` e `git diff` mostram, a qualquer momento, onde cada mudança está.

Não há branch neste desenho de propósito: no C04, o histórico é uma linha reta. Ramificar essa linha — trabalhar em paralelo sem afetar o principal — é assunto do C05.

## O que pode dar errado?

Cinco famílias de erro aparecem quando se versiona projeto pela primeira vez. Reconhecê-las já evita a maioria.

- **Experimentar sem ponto de retorno.** Você muda bastante antes do primeiro commit e perde o estado bom — é a cena da abertura (`INC-V01-001`). Cura: commitar o estado que funciona **antes** de arriscar a próxima ideia.
- **Commit gigante.** `git add .` seguido de um commit que mistura estrutura, documentação e código. Sintoma: o diff é grande demais para revisar e esconde o erro (`INC-V01-002`). Cura: separar por intenção, usando o staging para escolher o que entra.
- **Mensagem vaga.** `update`, `mudancas`, `agora vai`. Sintoma: o histórico não conta nada e você precisa abrir cada diff para entender. Cura: `tipo: descrição da intenção`.
- **Versionar lixo ou segredo.** `.env`, `.DS_Store`, log, token entram no commit. Sintoma (grave): segredo fica no histórico, difícil de remover. Cura: `.gitignore` desde o primeiro commit, e `git status` antes de cada commit.
- **Esquecer mudança solta.** Você commita parte, edita mais, e esquece o resto na working tree. Sintoma: `git status` no fim do capítulo não está limpo. Cura: terminar a sessão com `git status` e garantir que não há nada pendente que devesse ter sido commitado.

O hábito que evita as cinco de uma vez: **antes de mudar algo arriscado, commite o que funciona; antes de commitar, leia o que vai entrar.**

## Debugging realista: o commit que misturou tudo

Suponha que você já caiu na armadilha e fez um `git add .` com tudo misturado, mas **ainda não commitou**. Dá para arrumar antes do commit, sem nenhum comando perigoso. O passo a passo do Mestre Py:

1. **Veja o estrago.** Rode `git status`. Tudo o que está em "Changes to be committed" vai entrar no próximo commit de uma vez só. É o commit gigante esperando para nascer.
2. **Entenda o que é cada coisa.** Rode `git diff --staged` para ver, linha por linha, o que está preparado. Identifique quantas intenções diferentes estão ali (estrutura? README? diagrama?).
3. **Desfaça a preparação, sem perder trabalho.** Rode `git restore --staged .` para tirar tudo do staging. **Importante:** isso só esvazia a sala de espera — os seus arquivos na working tree continuam intactos. Nada é apagado.
4. **Reagrupe por intenção.** Agora adicione um grupo de cada vez: `git add .gitignore src/ assets/`, commite; `git add README.md`, commite; `git add docs/ diagrams/`, commite. Três commits pequenos no lugar de um gigante.
5. **Confirme a história.** Rode `git log --oneline`. Você deve ver três linhas, cada uma com uma intenção legível.

Repare que em nenhum passo você apagou conteúdo. `git restore --staged` mexe só no staging, não na working tree. Comandos que descartam trabalho de verdade (como `reset --hard`) existem, mas são afiados e ficam para mais à frente — no V01, o hábito é **acumular pontos de retorno**, não destruí-los.

## Code Review do Mestre Py

O Mestre Py revisa, neste capítulo, o **histórico** que você criou: os commits, as mensagens e o que entrou em cada um.

**O que ele aprovaria**

- repositório iniciado dentro da pasta do projeto, com `git status` limpo ao final;
- três (ou mais) commits pequenos, cada um com uma intenção fechada;
- mensagens no formato `tipo: descrição` que explicam o porquê (`chore: add base structure and gitignore`, `docs: add project README with commit convention`);
- `.gitignore` presente desde o primeiro commit, cobrindo `.env`, lixo de sistema e logs;
- seção de convenção de commits no `README.md`;
- entrada nova no `docs/diario-tecnico.md` para o C04.

**O que ele pediria para ajustar**

- mensagem genérica como `update` ou `mudancas` — pediria para reescrever no formato `tipo: intenção`;
- dois assuntos no mesmo commit (ex.: README + diagrama juntos) — pediria para separar usando o staging;
- `.gitignore` criado só no último commit, depois de já ter rastreado lixo — pediria para colocá-lo no primeiro;
- README com seção de commits dizendo apenas "uso Git", sem mostrar a convenção adotada — pediria três linhas de exemplo concretas.

**O que ele reprovaria** (`INC-V01-002`)

- um único commit `update files` misturando estrutura, README e diagrama — exatamente o anti-padrão que esconde o erro no review;
- qualquer segredo, token, `.env` real ou caminho local versionado;
- mensagem que descreve a emoção, não a mudança (`agora vai`, `cansei`, `commit final`);
- histórico "limpo na marra" com comandos destrutivos para esconder bagunça — no V01 não se reescreve história, se acumula história honesta.

**O resumo do Mestre Py**

> "Em C04, o seu trabalho é dar memória ao IntraStack. Não me traga um commit gigante chamado 'update files' — isso não é memória, é entulho com data. Me traga três commits pequenos, cada um contando uma frase do que você fez e por quê. Commit bom conta uma história curta. Antes de experimentar qualquer coisa nova, deixe um ponto de retorno. É isso que separa quem perde trabalho de quem aprende com ele."

## Mãos à Obra

Tarefa concreta do Capítulo 4.

### Contexto

Você está dentro da pasta `stackovia-intrastack-basic-rascunho/`, criada e organizada nos capítulos anteriores. Ela já tem `README.md`, `docs/` (com `escopo-v01.md`, `diario-tecnico.md`, `http-basico.md`, `checklist-diagnostico.md`, `runbook-local.md`), `diagrams/request-response.md`, `assets/screenshots/.gitkeep` e `src/index.html`. Nada disso está no Git ainda. Confirme onde você está com `pwd` e `ls` antes de começar (hábito do C03).

Antes do primeiro uso, o Git pode pedir que você se identifique. Configure uma vez, com calma:

```text
git config --global user.name "Seu Nome"
git config --global user.email "voce@exemplo.com"
```

Esse nome e esse e-mail ficam gravados em cada commit. Use um e-mail que você não se incomode de ver público no futuro (no C05 esse histórico vai para o GitHub) — isso já é uma decisão de segurança.

### Tarefa

1. **Inicie o repositório.**
   ```text
   git init
   git status
   ```
   - `git init` cria o repositório local (uma pasta oculta `.git/`). `git status` deve mostrar todos os arquivos como *untracked* e "No commits yet".

2. **Crie o `.gitignore` antes de qualquer commit.**
   ```text
   # .gitignore — IntraStack básico
   .env
   .env.local
   .DS_Store
   Thumbs.db
   *.log
   ```
   - Salve na raiz do projeto. Assim, lixo e segredo nunca chegam a ser candidatos a commit.

3. **Commit 1 — estrutura inicial.** Adicione só o esqueleto e a configuração de ignore:
   ```text
   git add .gitignore src/ assets/
   git status
   git commit -m "chore: add base structure and gitignore"
   ```
   - Rode `git status` antes do commit e confirme que só esses itens estão preparados. Esse é o hábito de não commitar no escuro.

4. **Adicione a convenção de commits ao `README.md`.** Inclua uma seção curta:
   ```markdown
   ## Convenção de commits

   Commits pequenos, por intenção, no formato `tipo: descrição`:

   - `chore:` estrutura e manutenção;
   - `docs:` documentação;
   - `feat:` recurso novo (a partir do Capítulo 6);
   - `fix:` correção.
   ```

5. **Commit 2 — README com a convenção.** O README agora documenta a estrutura do projeto e a convenção que você acabou de adotar. Adicione e commite só ele — e repare que a mensagem reflete exatamente o que mudou:
   ```text
   git add README.md
   git commit -m "docs: add project README with commit convention"
   ```

6. **Commit 3 — documentação e diagrama.** Adicione o resto da documentação:
   ```text
   git add docs/ diagrams/
   git commit -m "docs: add project notes and request/response diagram"
   ```

7. **Atualize o `docs/diario-tecnico.md`** com a entrada do C04 (data, capítulo, uma frase sobre o que ficou mais claro, uma sobre o que ainda confunde, uma sobre o próximo passo — que é o C05, GitHub e PR). Como essa edição cria uma mudança nova, faça mais um commit pequeno:
   ```text
   git add docs/diario-tecnico.md
   git commit -m "docs: add C04 entry to technical journal"
   ```

8. **Feche a sessão com o histórico limpo.**
   ```text
   git status      # deve dizer "nothing to commit, working tree clean"
   git log --oneline
   ```
   - O `git status` precisa estar limpo. O `git log --oneline` deve mostrar pelo menos quatro commits pequenos e legíveis.

### Dica anti-armadilha

A tentação número um aqui é `git add .` seguido de um único `git commit -m "primeiro commit"`. Resista. O capítulo inteiro existe para você sentir a diferença entre "salvar tudo" e "registrar intenções". Se você fizer o commit gigante por reflexo, use o passo de Debugging Realista (`git restore --staged .`) para desfazer a preparação — sem perder nada — e reagrupe por intenção.

## Critérios de aceitação

Use esta lista para fechar o Capítulo 4. Cada item é "feito" ou "não feito".

- [ ] `git init` foi executado dentro da pasta `stackovia-intrastack-basic-rascunho/`.
- [ ] Existe um `.gitignore` na raiz, cobrindo `.env`, lixo de sistema e logs, e ele entrou no **primeiro** commit.
- [ ] Há **pelo menos três** commits pequenos, separados por intenção.
- [ ] Toda mensagem de commit segue o formato `tipo: descrição` e explica a intenção (nenhum `update files`).
- [ ] O `README.md` tem a seção "Convenção de commits".
- [ ] O `docs/diario-tecnico.md` tem a entrada do C04.
- [ ] `git status` mostra "working tree clean" ao final.
- [ ] `git log --oneline` mostra um histórico legível, do mais recente ao mais antigo.
- [ ] Nenhum segredo, token, `.env` real ou caminho local foi versionado.
- [ ] Você consegue explicar, em uma frase, a diferença entre working tree, staging e commit.

Se algum item não estiver marcado, volte ao trecho correspondente antes de avançar.

## Checklist de segurança inicial

O C04 grava coisas de forma **difícil de apagar**. Por isso, a segurança aqui é sobre o que entra no histórico.

- [ ] O `.gitignore` existe e entrou desde o primeiro commit, antes de qualquer arquivo sensível ter chance de ser rastreado.
- [ ] Você rodou `git status` (e, quando útil, `git diff --staged`) **antes** de cada commit, conferindo o que entrava.
- [ ] Nenhum arquivo com aparência de segredo (`.env`, `.env.local`, `credentials.txt`, `token.txt`) foi adicionado — eles não existem neste projeto e, quando existirem em volumes futuros, virão como `.env.example` com valores falsos.
- [ ] O e-mail configurado em `git config user.email` é um que você aceita ver público quando o repositório for para o GitHub (C05).
- [ ] Nenhuma mensagem de commit expõe dado pessoal, caminho local ou informação interna.

Esses pontos voltam, ampliados, no C05 (quando o histórico for publicado) e no C11 (segurança básica).

## Entrega de portfólio

O Capítulo 4 ainda não produz evidência **pública** — o repositório é local. Mas produz a base da evidência mais observada de um portfólio técnico: o **histórico de commits**.

### Entregas obrigatórias do C04

As entregas obrigatórias deste capítulo são, e somente:

- repositório Git iniciado na pasta do projeto, com `.gitignore`;
- pelo menos três commits pequenos com mensagens semânticas claras;
- seção de convenção de commits no `README.md`;
- entrada do C04 no `docs/diario-tecnico.md`;
- `git status` limpo ao final.

### Artefato GitHub esperado

Nenhum publicado ainda. O histórico local que você criou hoje é exatamente o que será enviado ao GitHub no C05. Ou seja: a qualidade dos seus commits de hoje é a primeira impressão que o seu repositório vai causar amanhã.

### README / documentação esperada

A seção "Convenção de commits" no `README.md`, curta e com exemplos concretos da convenção que você adotou.

### Screenshots ou diagramas esperados

- O diagrama de fluxo `working tree → staging → commit → histórico` (pode ser a versão textual deste capítulo, salva em `diagrams/git-fluxo-local.md` se quiser deixá-la registrada).
- **Opcional:** uma captura da saída de `git log --oneline` como evidência do histórico limpo, salva em `assets/screenshots/`.

### Evidências internas que ficam prontas no C04

- histórico de commits pequenos e legíveis;
- `.gitignore` protegendo o repositório desde o início;
- README com convenção de commits;
- diário com a entrada do C04.

### Limitações que devem aparecer

- o repositório é **local**: não há GitHub, não há `push`, não há Pull Request — isso é C05;
- não há branch ainda — o histórico é uma linha reta;
- não há automação (CI/CD) — isso é V06;
- desfazer destrutivo não foi ensinado de propósito; o hábito do V01 é acumular pontos de retorno.

### Rótulo de maturidade

**Estudo / Fundamentos.**

## Mini post LinkedIn

Você ainda não vai publicar — não há link de repositório real até o C05. Mas já pode rascunhar.

**Gancho honesto:**

> "Aprendi a usar Git como memória do projeto, não só como comando para decorar."

**Corpo curto:**

> "Passei o capítulo transformando uma pasta de estudo em um repositório com histórico de verdade: commits pequenos, separados por intenção, com mensagens que explicam o porquê. O insight não foi o comando — foi parar de 'salvar tudo de uma vez' e começar a deixar pontos de retorno antes de arriscar."

**Limitação que deve aparecer no post:**

> "Ainda é repositório local. GitHub, Pull Request e colaboração real vêm no próximo passo."

Guarde o rascunho no `docs/diario-tecnico.md`. Ele volta no C05, quando houver link de repositório público para incluir.

## Perguntas de revisão

Antes de virar para o C05, revise mentalmente. Se alguma travar, volte à seção correspondente.

1. Quais são as três áreas do Git, e o que cada uma representa?
2. O que `git add` faz, e de onde para onde ele move uma mudança?
3. Por que `git status` e `git diff` vêm sempre antes do commit?
4. O que torna uma mensagem de commit boa, e por que "update files" é ruim?
5. Por que um commit pequeno é mais fácil de revisar do que um commit gigante?
6. O que o `.gitignore` resolve, e por que ele precisa existir desde o primeiro commit?
7. Por que o histórico de commits é considerado "evidência" em um portfólio?

Se você responde essas sete perguntas sem consultar o texto, o Capítulo 4 cumpriu o papel dele.

## Próximo passo

O C04 deu memória à sua pasta. O C05 dá a ela um endereço público.

A partir do próximo capítulo, esse histórico local sai da sua máquina e vai para o GitHub: o projeto ganha um repositório remoto, um README que serve de vitrine, e você abre o seu primeiro Pull Request de estudo — o momento em que branch, finalmente, entra em cena. O trabalho que você fez aqui é o que torna isso possível: não se publica bem um projeto sem memória.

Antes de seguir, confira: a sua pasta `stackovia-intrastack-basic-rascunho/` agora é um repositório Git, com `.gitignore`, pelo menos quatro commits pequenos, `README.md` com convenção de commits, `docs/diario-tecnico.md` com a entrada do C04 e `git status` limpo. Se sim, vire para o Capítulo 5.
