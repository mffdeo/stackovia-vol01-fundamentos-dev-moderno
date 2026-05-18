---
title: "Capítulo 3 — Terminal, pastas, arquivos e ambiente"
status: Preview
volume: 1
capitulo: 3
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.

# Capítulo 3 — Terminal, pastas, arquivos e ambiente
## Abertura narrativa na Stackovia

Você termina a leitura do C02 com a sensação boa de quem aprendeu a diagnosticar. Tem um diagrama da requisição, tem um checklist, tem um diário com duas entradas. Está com vontade de avançar e começar a "construir alguma coisa de verdade".

Você abre o seu computador no dia seguinte e percebe, na primeira tentativa, que não sabe **onde** estão os arquivos que criou.

O `escopo-v01.md` está na pasta de Documentos? Em Downloads? Na pasta de estudo que você criou semana passada e nunca mais abriu? Você acha o `diagrams/request-response.md`, mas dentro de uma pasta diferente da do `escopo-v01.md`. Em algum momento entre o C01 e o C02 você criou um arquivo "duplicado" — `escopo-v01 (1).md` — porque salvou na pasta errada e quis "consertar".

Você decide colocar tudo no mesmo lugar, manualmente, arrastando ícones. Funciona — até você abrir um `index.html` de teste que estava com uma imagem da Stackovia e a imagem aparecer como ícone quebrado. O HTML continua igual; o navegador continua aberto; a imagem simplesmente sumiu.

O Mestre Py aparece, dá uma olhada na sua tela e te interrompe com duas perguntas que parecem bobas:

- **onde, no seu computador, está esse arquivo agora?**
- **e onde ele estava ontem?**

Você não consegue responder nenhuma das duas com precisão. É exatamente esse problema que o C03 existe para resolver.

## Card da sprint

```text
[Card da Sprint]
Sprint:    Estrutura local do IntraStack (C03)
Cargo:     Estagiário de desenvolvimento web
Tarefa:    Criar a estrutura inicial do IntraStack básico
           usando o terminal, entender caminhos relativos e
           sair com um projeto que outra pessoa consiga abrir
           sem depender da sua máquina.
Definição
de pronto: Estrutura inicial criada por terminal, README
           inicial descrevendo as pastas, runbook local
           registrado e nenhum caminho absoluto da sua
           máquina dentro do projeto.
```

O capítulo é classificado como **laboratório**: você vai digitar comandos, criar pastas e arquivos e usar terminal de verdade. Não vira aula de shell scripting. Os comandos aparecem no momento em que resolvem um problema, não em ordem alfabética de manual.

## Problema de negócio

Antes de o portal interno existir, o projeto precisa morar em algum lugar previsível. Se os arquivos ficam soltos pela sua máquina, três coisas ruins acontecem ao mesmo tempo:

- você não consegue **achar** as próprias coisas quando volta no dia seguinte;
- você cria **duplicatas** sem perceber e começa a editar a versão errada;
- quem **abrir** o seu trabalho — colega, recrutador, mentor — não consegue reproduzir o que você fez.

A terceira parte é a mais cara. Em portfólio, o pior tipo de projeto é o que "só funciona na máquina do autor". Esse projeto não é evidência — é anedota.

O C03 troca isso por uma estrutura simples e reproduzível. Pequena, com regras claras de onde mora cada coisa, e portátil — quer dizer, sem nenhuma referência ao caminho específico do seu computador.

## O que será construído

No fim deste capítulo, a sua pasta de trabalho do IntraStack básico terá:

- a estrutura inicial criada por terminal (`docs/`, `diagrams/`, `assets/screenshots/`, `src/`);
- um `README.md` inicial descrevendo o projeto, as pastas e a regra de caminhos relativos;
- um `docs/runbook-local.md` curto, ensinando outra pessoa a abrir o projeto na máquina dela;
- um `src/index.html` placeholder (não é a página real ainda — isso é C06), apenas para mostrar a referência relativa a um asset;
- uma nova entrada no `docs/diario-tecnico.md` registrando o C03.

O que o C03 **não** vai entregar:

- shell scripting, alias customizado, dotfiles, configurações avançadas do terminal — isso é V06;
- permissões Unix profundas (`chmod`, `chown`, grupos) — isso é V06;
- gerenciamento de pacotes, instalações de runtime (Node, Python, etc.) — só aparece nos volumes em que esses runtimes são realmente usados;
- Docker, container, ambiente isolado por imagem — isso é V03/V06;
- estrutura de projeto de framework (Next.js, FastAPI, Django) — isso é V02/V03;
- servidor web local, hot reload, build pipeline — isso é V02/V03.

O foco é exclusivamente **organização local reproduzível**. Pequeno, mas inegociável.

## Cena/tensão de abertura

Volte por um segundo à imagem quebrada da abertura.

Você olha o HTML. O `<img src="...">` continua lá, com o mesmo texto que estava ontem. Você abre a pasta no explorador de arquivos: a imagem existe. Existe e está visível. Está, inclusive, "do lado" do HTML — pelo menos é o que parece, pelo arrasta-e-solta de ontem.

A tensão do capítulo é esta: **o navegador não enxerga "do lado"**. Ele enxerga **caminho**. Caminho relativo, caminho absoluto, ponto-barra, barra dupla — coisas que parecem detalhe e mudam completamente o resultado.

Mais do que isso: o navegador não enxerga "ontem". Ele enxerga **agora**. Se você moveu a pasta, a referência velha continua apontando para o lugar antigo, e o navegador volta um silencioso `404` no Network. A página continua "carregando bem"; só os assets é que somem.

E há um agravante específico de portfólio: se você, no afobamento, copia para o seu README um caminho do tipo `C:\Users\<usuario>\Documentos\stackovia\imagens\logo.png` (Windows), ou `/home/<usuario>/Documentos/stackovia/imagens/logo.png` (Linux/macOS), você está **expondo a estrutura da sua máquina** dentro do projeto. Quem clonar não consegue abrir. Quem ler entende que você ainda não pensou em portabilidade. Pior dos mundos.

A próxima seção mostra os dois sintomas — o asset quebrado e o caminho absoluto no README — antes de explicar os conceitos.

## Exemplo concreto antes do conceito

Veja dois trechos de IntraStack: um problemático, um portátil.

**Trecho A — README com caminho absoluto local (problema):**

```markdown
# IntraStack básico

Para abrir o projeto, clique duas vezes no arquivo:

C:\Users\<usuario>\Documentos\stackovia\intrastack\src\index.html

A logo está em:

C:\Users\<usuario>\Documentos\stackovia\intrastack\assets\logo.png
```

**Trecho B — README com caminho relativo (correto):**

```markdown
# IntraStack básico

Para abrir o projeto, dentro da pasta clonada, abra:

src/index.html

A logo, referenciada a partir do HTML, fica em:

../assets/screenshots/logo-exemplo.png
```

O Trecho A só funciona na máquina do autor, e só funciona enquanto a pasta `<usuario>\Documentos\stackovia` existir naquele caminho. Se você renomear uma pasta acima, quebra. Se outra pessoa clonar, nem chega a tentar. Se você abre em um Mac amanhã, esquece.

O Trecho B funciona em qualquer máquina, em qualquer sistema operacional, dentro de qualquer pasta — desde que a estrutura interna do projeto seja respeitada. **Isso** é portabilidade. E é nisso que terminal e organização entram.

Veja também um exemplo simples de imagem quebrada por reorganização:

```html
<!-- src/index.html -->
<!-- Antes: assets ficava em src/imagens/logo.png -->
<img src="imagens/logo.png" alt="Logo do IntraStack">

<!-- Depois de mover a pasta de assets para fora de src/,
     o caminho não foi atualizado. O navegador procura
     em src/imagens/, não encontra, e responde 404. -->
```

A imagem some sem mudar uma única linha do `<img>`. O que mudou foi o lugar do arquivo, não o código — e o código não acompanhou.

Esses dois sintomas vão nortear o resto do capítulo.

## Conceitos essenciais

### Conceito-chave 1: terminal como ferramenta de trabalho

Terminal é o lugar onde você fala com o sistema operacional escrevendo, em vez de clicando.

No V01, você não precisa saber tudo de terminal. Precisa saber **cinco comandos** que cobrem 90% da rotina de organizar projeto:

- `pwd` — diz em qual pasta você está agora;
- `ls` — lista o que tem na pasta atual;
- `cd <pasta>` — entra na pasta;
- `mkdir <pasta>` — cria pasta;
- `touch <arquivo>` — cria arquivo vazio.

Cinco comandos. Nada além disso é exigido no V01. Eles funcionam de forma idêntica em **Linux**, **macOS** e **WSL** no Windows. No Windows nativo, há duas opções, e elas se comportam de jeitos diferentes:

- **PowerShell** (recomendado para o V01 no Windows). `pwd`, `ls`, `cd` e `mkdir` funcionam — `pwd` e `ls` existem como apelidos (aliases) de `Get-Location` e `Get-ChildItem`. `touch` **não** vem por padrão; em vez disso, use `New-Item nome.md` (ou `New-Item -ItemType File nome.md`) para criar arquivo, e `New-Item -ItemType Directory nome-pasta` para criar pasta.
- **CMD (Prompt de Comando clássico)**. Use `cd` para entrar em pastas, `dir` no lugar de `ls` para listar e `mkdir` para criar pasta. Não existe `touch` nem `New-Item`; para criar um arquivo vazio, use `type nul > arquivo.md` ou simplesmente crie o arquivo pelo editor de código.

Os trechos de terminal no resto deste capítulo mostram o comando Linux/macOS/WSL e, quando for necessário, indicam o equivalente em PowerShell ou CMD entre parênteses.

A regra do V01 sobre terminal é simples: **se você ainda depende sempre do mouse para criar pasta e arquivo, o terminal ainda não virou ferramenta de trabalho.**

### Conceito-chave 2: diretório atual

Toda vez que você abre um terminal, ele está "em alguma pasta". Essa é a sua pasta atual — também chamada de **diretório de trabalho**. Todo comando que você digitar vai rodar como se estivesse "lá dentro".

`pwd` te mostra exatamente onde você está:

```text
$ pwd
/Users/exemplo/projetos/stackovia-intrastack-basic-rascunho
```

`ls` te mostra o que tem nesse lugar:

```text
$ ls
diagrams   docs
```

Toda confusão de "salvei em lugar errado" começa aqui: o usuário **não tinha certeza** de qual era o diretório atual quando salvou o arquivo. O hábito que resolve isso para sempre é começar cada sessão de trabalho com um `pwd` e um `ls`. Custa um segundo. Evita meia hora de procura depois.

### Conceito-chave 3: caminho relativo versus caminho absoluto

Dois tipos de caminho. Saber a diferença é a meta principal do capítulo.

- **Caminho absoluto** é o endereço completo, começando da raiz do sistema:
  - Linux/macOS: `/home/exemplo/projetos/stackovia/src/index.html`
  - Windows: `C:\Users\exemplo\projetos\stackovia\src\index.html`

  Ele depende da sua máquina inteira. Mudou de máquina, mudou de usuário, mudou de pasta — quebrou.

- **Caminho relativo** é o endereço a partir de **onde você está agora** dentro do projeto:
  - `src/index.html` (dentro da raiz do projeto)
  - `../assets/logo.png` (subir uma pasta e descer em `assets/`)
  - `./styles.css` (mesma pasta — o `./` é opcional, mas ajuda a deixar explícito)

Caminho relativo é a única forma honesta de referenciar arquivo **dentro** de um projeto que vai parar no GitHub. O navegador, o servidor estático, o próximo desenvolvedor — todos esperam relativo.

Regra de bolso do V01: **se aparece o nome do seu usuário em um caminho dentro do projeto, é absoluto e está errado**.

### Conceito-chave 4: estrutura previsível de projeto

A estrutura do IntraStack básico, hoje, cabe em cinco pastas e um README. Cada pasta tem um único propósito:

```text
stackovia-intrastack-basic-rascunho/
  README.md                ← descrição, como abrir, limitações
  docs/                    ← documentação textual do projeto
    escopo-v01.md
    diario-tecnico.md
    http-basico.md
    checklist-diagnostico.md
    runbook-local.md       ← novo no C03
  diagrams/                ← diagramas textuais
    request-response.md
  assets/                  ← imagens, screenshots, mídias
    screenshots/
      .gitkeep
  src/                     ← código-fonte do site
    index.html             ← placeholder; HTML real entra no C06
```

Repare em três escolhas:

- **separar documentação de código**. `docs/` é texto sobre o projeto. `src/` é código que vai virar a página. Misturar os dois cria a bagunça que o C03 está combatendo.
- **separar assets em pasta própria**. Imagens, ícones, screenshots, mídias — todos em `assets/`. Quando algo "some", você sabe onde procurar.
- **`.gitkeep` em pasta vazia**. Git ignora pasta vazia. O arquivo `.gitkeep` é uma convenção para reservar a pasta no repositório, mesmo sem conteúdo. Sem ele, `assets/screenshots/` simplesmente não aparece quando alguém clonar.

Essa estrutura **não é a única possível**. É uma escolha pequena, defensável e suficiente para o V01. Daqui a alguns volumes, projetos maiores vão pedir convenções diferentes. Por enquanto, esta resolve.

### Conceito-chave 5: portabilidade e o README como contrato

Portabilidade quer dizer: o que está dentro do projeto pode ser aberto, lido e executado em outra máquina, por outra pessoa, sem ajuste manual.

O README é o contrato entre o seu projeto e quem chega. Para o V01, um README portátil precisa, no mínimo:

- dizer **o que é** o projeto, em uma ou duas frases;
- descrever **as pastas principais**, em uma linha cada;
- mostrar **como abrir** o `src/index.html` localmente, sem assumir o caminho da sua máquina;
- declarar **o rótulo de maturidade** (Estudo / Fundamentos);
- declarar **limitações** ("ainda não há site completo", "ainda não há backend").

Tudo isso cabe em meia página. Mais do que isso, neste momento, vira README inflado.

## Estrutura-alvo e onde você está agora

A estrutura **completa** do IntraStack básico vai aparecer aos poucos ao longo do volume. Para te dar bússola sem inflar o C03, a árvore abaixo destaca o que **já existe** depois do C01/C02 e o que **vai nascer** no C03.

```text
stackovia-intrastack-basic-rascunho/
  README.md                    ← C03 (NOVO)
  docs/
    escopo-v01.md              ← C01
    diario-tecnico.md          ← C01 (acrescenta entrada no C03)
    http-basico.md             ← C02
    checklist-diagnostico.md   ← C02
    runbook-local.md           ← C03 (NOVO)
  diagrams/
    request-response.md        ← C02
  assets/                      ← C03 (NOVO)
    screenshots/               ← C03 (NOVO, vazia, com .gitkeep)
      .gitkeep                 ← C03 (NOVO)
  src/                         ← C03 (NOVO)
    index.html                 ← C03 (NOVO, placeholder)
```

Você está, hoje, dentro da pasta `stackovia-intrastack-basic-rascunho/`. O nome continua com o sufixo `-rascunho` de propósito: o **repositório oficial** no GitHub só nasce no C05, e o `git` em si só entra no C04. O que você faz agora é estrutura **local** — a base sólida para os próximos capítulos.

## O que pode dar errado?

Cinco famílias de erro aparecem o tempo todo quando se está organizando projeto pela primeira vez. Reconhecê-las já é meio caminho.

- **Não saber em que pasta você está.** Você abre o terminal, digita `mkdir docs` e a pasta aparece em algum lugar — quase nunca onde você imaginou. Sintoma: você cria a mesma pasta duas vezes em lugares diferentes. Cura: começar toda sessão com `pwd` e `ls`.
- **Caminho absoluto no projeto.** README, HTML, CSS, JS, documentação — qualquer arquivo do projeto que cite caminho absoluto local (`C:\Users\...`, `/home/...`, `/Users/...`) cria a dependência da sua máquina que o C03 está combatendo. Cura: substituir por relativo sempre que estiver dentro do projeto.
- **Asset movido sem atualizar referência.** Você reorganiza pastas pelo explorador de arquivos. O HTML continua igual. A imagem some. Cura: ao mover asset, abrir o HTML/CSS e atualizar o caminho **na mesma operação**. Sem "depois eu vejo".
- **Duplicar arquivo no afobamento.** "Vou só renomear", "vou só salvar uma cópia". Em pouco tempo você tem `escopo-v01.md`, `escopo-v01 (1).md`, `escopo-v01-final.md`, `escopo-v01-FINAL-FINAL.md`. Cura: um único arquivo de cada coisa; histórico de versões é trabalho do Git, que entra no C04.
- **Misturar documentação e código.** Colocar `README.md` dentro de `src/`. Colocar `index.html` dentro de `docs/`. Colocar imagem na raiz. Sintoma: depois de duas semanas, você não sabe dizer onde nada mora. Cura: respeitar as cinco pastas e o propósito único de cada uma.

O hábito que evita as cinco famílias de uma vez é o mais simples: **sempre que mover, criar ou referenciar arquivo, conferir o caminho relativo a partir da raiz do projeto**.

## Debugging guiado: imagem quebrada após reorganização

Volte à cena da imagem que sumiu sozinha. O passo a passo do Mestre Py é curto.

1. **Abra o HTML no editor.** Procure a linha do `<img src="...">`. Anote o caminho exato escrito ali.
2. **Confira a estrutura real.** No terminal, a partir da pasta do projeto, liste a estrutura e veja **onde** a imagem realmente está agora.
   - Linux, macOS e WSL: `ls -R`.
   - PowerShell: `Get-ChildItem -Recurse` (ou o alias `ls -Recurse`).
   - CMD: `dir /s` para listagem recursiva equivalente.
   Se preferir, abra também pelo explorador de arquivos para conferência visual — mas o terminal continua sendo o registro confiável.
3. **Reconstrua o caminho relativo.** A partir do arquivo HTML, qual é o caminho até a imagem? Se o HTML está em `src/index.html` e a imagem está em `assets/screenshots/logo-exemplo.png`, o caminho relativo é `../assets/screenshots/logo-exemplo.png` (sobe uma pasta com `..`, desce em `assets/screenshots/`).
4. **Atualize o `src` do `<img>`** com esse caminho relativo e recarregue o navegador.
5. **Confirme no DevTools.** Aba Network, recarregar. A linha do asset agora deve voltar `200 OK` em vez de `404`.

Se você fez o C02, já reconhece esse último passo. O debugging do C03 é a aplicação prática do debugging do C02 — agora não sobre página, mas sobre asset.

## Code Review do Mestre Py

O Mestre Py revisa, neste capítulo, três coisas: a **estrutura** que você criou, o **README inicial** e os **caminhos** dentro dos seus arquivos.

**O que ele aprovaria**

- estrutura com as cinco pastas exatas (`docs/`, `diagrams/`, `assets/screenshots/`, `src/`) na raiz, criadas via terminal e não via clique;
- README inicial curto e específico, com seções de propósito, pastas, como abrir, rótulo de maturidade e limitações;
- `docs/runbook-local.md` curto, ensinando outra pessoa a abrir o projeto sem citar a sua máquina;
- nenhum caminho absoluto local em nenhum arquivo do projeto;
- `.gitkeep` em `assets/screenshots/` para manter a pasta viva mesmo vazia;
- entrada nova no `docs/diario-tecnico.md` para o C03.

**O que ele pediria para ajustar**

- README com frase genérica do tipo "projeto de estudos sobre web" sem dizer que é o IntraStack básico, sem listar pastas e sem rótulo de maturidade — pediria para reescrever em meia página objetiva;
- runbook que assume que a pasta já existe no `Desktop` do leitor — pediria para descrever a partir de "depois de clonar/baixar o projeto, dentro da pasta...";
- pastas criadas pelo explorador de arquivos, sem evidência de terminal — pediria para refazer com `mkdir` para fixar o hábito;
- `index.html` sem nenhuma referência a asset, perdendo a oportunidade de demonstrar caminho relativo — pediria para incluir um `<img>` apontando para `../assets/screenshots/logo-exemplo.png`, mesmo que o arquivo de imagem ainda não exista (a página vai mostrar ícone quebrado, e isso é didático para o próximo capítulo).

**O que ele reprovaria**

- qualquer caminho absoluto local — `C:\Users\...`, `/home/<seu-nome>/...`, `/Users/<seu-nome>/...` — em qualquer arquivo do projeto;
- README citando empresa, cliente, colega ou produto real;
- pasta `secrets/`, `private/`, `meus-projetos/`, ou qualquer pasta que misture trabalho real com este estudo;
- arquivo `.env`, `.env.local`, `credentials.txt`, qualquer arquivo com aparência de segredo dentro do projeto;
- pasta de assets com foto pessoal, screenshot do trabalho atual, imagem com logo real;
- README descrevendo a entrega como "produto", "MVP" ou "produção".

**O resumo do Mestre Py**

> "Em C03, o seu trabalho é fazer com que o IntraStack básico exista em algum lugar previsível, que não seja a memória da sua máquina. Estrutura clara, terminal usado de verdade, caminho relativo em tudo, README honesto. Quem entra no projeto consegue abrir; quem volta amanhã consegue achar. Sem esse alicerce, todo o resto do volume vira retrabalho."

## Mãos à Obra

Tarefa concreta do Capítulo 3.

### Contexto

Você ainda está dentro da pasta `stackovia-intrastack-basic-rascunho/` criada no C01. O `git` ainda não entrou (isso é C04) e o GitHub também não (isso é C05). O que você vai fazer aqui é **organização local**, com terminal, dentro dessa mesma pasta.

Se você não tem certeza de onde a pasta está, abra o terminal, navegue até ela com `cd` e rode `pwd` para confirmar.

### Tarefa

1. **Confirme onde você está.**
   - Abra o terminal e rode `pwd`. A saída deve terminar com `/stackovia-intrastack-basic-rascunho` (ou o equivalente no seu sistema).
   - Rode `ls`. Você deve ver, no mínimo, `docs/` e `diagrams/` (criados no C01 e C02).

2. **Crie as pastas que faltam.**
   ```text
   mkdir -p assets/screenshots
   mkdir -p src
   ```
   - `mkdir -p` cria a pasta sem reclamar se já existir e cria caminhos aninhados em uma única chamada.
   - No Windows puro (PowerShell), use `New-Item -ItemType Directory -Force -Path assets/screenshots, src`.

3. **Crie os arquivos novos.**
   ```text
   touch README.md
   touch docs/runbook-local.md
   touch src/index.html
   touch assets/screenshots/.gitkeep
   ```
   - No PowerShell, use `New-Item README.md` (e equivalentes) ou simplesmente crie pelo editor.

4. **Preencha o `README.md`** com, no mínimo, estas seções curtas (uma frase ou duas em cada):
   - **O que é:** "IntraStack básico — portal interno fictício da Stackovia, criado como projeto do Volume 1 da coleção. Estudo / Fundamentos.";
   - **Estrutura de pastas:** liste `docs/`, `diagrams/`, `assets/`, `src/` com uma linha explicando o propósito;
   - **Como abrir:** "Dentro desta pasta, abra `src/index.html` no seu navegador. Não há servidor web neste momento.";
   - **Limitações:** "Sem backend, sem banco, sem build. O HTML real entra a partir do Capítulo 6.";
   - **Rótulo de maturidade:** "Estudo / Fundamentos.".

5. **Preencha o `docs/runbook-local.md`** com um passo a passo de quatro linhas para outra pessoa abrir o projeto:
   - obter o projeto (por enquanto, "receber a pasta"; no C05 vira "clonar do GitHub");
   - entrar na pasta;
   - abrir `src/index.html` no navegador;
   - aviso de que a imagem do `index.html` aparecerá quebrada por ora (o arquivo de imagem ainda não existe — é proposital, para demonstrar caminho relativo no C06).

6. **Preencha o `src/index.html`** com um esqueleto mínimo, apenas para amarrar o conceito de caminho relativo:
   ```html
   <!doctype html>
   <html lang="pt-br">
     <head>
       <meta charset="utf-8">
       <title>IntraStack básico — placeholder</title>
     </head>
     <body>
       <h1>IntraStack básico (placeholder)</h1>
       <p>Esta é uma página temporária. O HTML real entra no Capítulo 6.</p>
       <img src="../assets/screenshots/logo-exemplo.png" alt="Logo de exemplo">
     </body>
   </html>
   ```
   - Não há `logo-exemplo.png` no projeto. A imagem **vai aparecer quebrada** — esse é o ponto. Você acabou de criar, de propósito, o sintoma do `INC-V01-009`. Aqui, ele serve como prova de que caminho relativo funciona (ou falha) por **caminho**, não por aparência.
   - **Esse ícone quebrado é didático apenas neste capítulo.** Não é o estado final do projeto, nem um bug a corrigir agora. Ele vai ser tratado nos capítulos seguintes: o HTML real entra no C06, o asset propriamente dito (ou um placeholder bem identificado) é introduzido lá, e a referência deixa de quebrar de forma natural.

7. **Atualize o `docs/diario-tecnico.md`** com a entrada do C03:
   - data;
   - capítulo (C03);
   - uma frase sobre o que ficou mais claro;
   - uma frase sobre o que ainda está confuso;
   - uma frase sobre o próximo passo (que é o C04 — Git).

### Dica anti-armadilha

Você vai ter vontade de "deixar o `index.html` bonito agora" ou de criar mais arquivos do que o C03 pede. Não faça. O placeholder é placeholder de propósito. O C06 cuida de HTML semântico, o C07 cuida de CSS, e cada um tem o próprio capítulo. Antecipar trabalho aqui só atrapalha o ritmo do volume.

## Critérios de aceitação

Use esta lista para fechar o Capítulo 3. Cada item é "feito" ou "não feito".

- [ ] `pwd` mostra você dentro da pasta `stackovia-intrastack-basic-rascunho/` antes de criar qualquer coisa.
- [ ] As pastas `assets/screenshots/` e `src/` existem, criadas via terminal.
- [ ] Os arquivos `README.md`, `docs/runbook-local.md`, `src/index.html` e `assets/screenshots/.gitkeep` existem.
- [ ] O `README.md` tem as cinco seções pedidas (o que é, estrutura de pastas, como abrir, limitações, rótulo de maturidade).
- [ ] O `src/index.html` referencia a imagem por caminho relativo (`../assets/screenshots/logo-exemplo.png`), e você entende por que a imagem aparece quebrada.
- [ ] Nenhum arquivo do projeto contém caminho absoluto local (sem `C:\Users\...`, sem `/home/<usuario>/...`, sem `/Users/<usuario>/...`).
- [ ] Você consegue explicar, em uma frase, a diferença entre caminho relativo e caminho absoluto.
- [ ] Você consegue listar, sem consultar, os cinco comandos de terminal usados neste capítulo.
- [ ] O `docs/diario-tecnico.md` tem a entrada do C03.

Se algum item não estiver marcado, volte ao trecho correspondente antes de avançar.

## Checklist de segurança inicial

O C03 ainda não traz código de aplicação, mas já mexe com **arquivos** e **caminhos** — o que abre três janelas de risco que precisam ficar fechadas desde já.

- [ ] Nenhum caminho dentro do projeto contém o seu nome de usuário, nome de empresa, cliente ou pasta pessoal real.
- [ ] Nenhum arquivo do projeto tem aparência de segredo (`.env`, `.env.local`, `credentials.txt`, `token.txt`, `senha.md` e similares **não existem** neste capítulo; quando aparecerem em volumes futuros, será como `.env.example` com placeholders).
- [ ] Nenhuma imagem ou screenshot real de trabalho, equipe, cliente ou produto interno entra em `assets/`. Se você quiser uma imagem de exemplo, use placeholder genérico ou deixe vazio.
- [ ] O `README.md` descreve apenas o que o projeto é, sem expor o caminho da sua máquina, sem citar empresa real, sem prometer "produção".

Esses três pontos voltam, ampliados, em C05 (quando o repositório nascer no GitHub), C11 (segurança básica) e C12 (publicação).

## Entrega de portfólio

O Capítulo 3 ainda não produz evidência **pública**. Produz evidência **local reproduzível**: alguém que receba esta pasta amanhã consegue abrir o `index.html`, ler o README e entender o projeto.

### Entregas obrigatórias do C03

As **quatro** entregas obrigatórias deste capítulo são, e somente:

- estrutura criada por terminal (`assets/screenshots/`, `src/`, mais o que já existia);
- `README.md` com as cinco seções pedidas;
- `docs/runbook-local.md` curto e portátil;
- `src/index.html` placeholder referenciando o asset por caminho relativo, e entrada nova no `docs/diario-tecnico.md`.

### Artefato GitHub esperado

Nenhum publicado ainda. Quando o repositório nascer no C05, esta estrutura inicial vai entrar nos primeiros commits. O `README.md` que você escrever hoje é a base do README oficial — vai evoluir, mas começa aqui.

### README esperado

Versão curta inicial dentro da própria pasta do projeto (`README.md`). Ainda não é o README "de portfólio completo" do C12; é a base honesta dele.

### Screenshots ou diagramas esperados

- **Opcional, sem obrigação no C03:** uma captura de tela do seu terminal mostrando a saída de `ls -R` dentro da raiz do projeto, salva apenas como registro pessoal. Se você optar por salvar, use a pasta `assets/screenshots/` que acabou de criar. **Não precisa criar imagem nova** se não quiser — `.gitkeep` mantém a pasta viva.
- **Opcional:** uma árvore textual gerada por `tree` (em sistemas que tenham) ou montada manualmente, salva em `docs/estrutura-projeto.md`. Útil se você quiser deixar visível, em texto, o que existe hoje na raiz.

### Evidências internas que ficam prontas no C03

- estrutura de cinco pastas com propósitos claros;
- README inicial portátil;
- runbook que outra pessoa consegue seguir;
- HTML placeholder demonstrando caminho relativo;
- diário com entrada do C03.

### Limitações que devem aparecer

- não há site real ainda — o `src/index.html` é placeholder;
- o asset referenciado aparece como ícone quebrado de propósito;
- não há `git` neste momento — entra no C04;
- não há repositório no GitHub — entra no C05;
- não há build, hot reload, servidor local.

### Rótulo de maturidade

**Estudo / Fundamentos.**

## Mini post LinkedIn

Você ainda não vai publicar nada — pelos mesmos motivos do C01 e C02. Mas já pode rascunhar.

**Gancho honesto:**

> "Hoje aprendi que organização de pastas também é parte do código."

**Corpo curto:**

> "Passei o capítulo criando, via terminal, a estrutura inicial de um projeto pequeno de fundamentos: cinco pastas, README portátil, runbook curto e um HTML placeholder amarrado por caminho relativo. O ponto não era 'aprender terminal' — era impedir que o projeto dependa da minha máquina."

**Limitação que deve aparecer no post:**

> "Ainda é setup local. Não há repositório público, não há site no ar, não há backend."

Guarde o rascunho no `docs/diario-tecnico.md`. Ele volta no C04 ou C05, quando houver link de repositório real para incluir.

## Perguntas de revisão

Antes de virar para o C04, revise mentalmente. Se alguma travar, volte à seção correspondente.

1. Quais são os cinco comandos de terminal que cobrem 90% da rotina de organizar projeto no V01?
2. O que `pwd` te diz, e por que ele é o primeiro hábito de uma sessão de trabalho?
3. Qual é a diferença, em uma frase, entre caminho relativo e caminho absoluto? E qual deles entra dentro do projeto?
4. Por que `.gitkeep` é necessário em `assets/screenshots/` se a pasta vai ser usada depois?
5. Por que a imagem do `src/index.html` aparece quebrada hoje, e o que isso ensina?
6. Quais cinco famílias de erro você reconhece em projetos com má organização local?
7. O que torna um README "portátil" em vez de "específico da sua máquina"?

Se você responde essas sete perguntas sem consultar o texto, o Capítulo 3 cumpriu o papel dele.

## Próximo passo

O C03 te deu uma pasta organizada. O C04 te dá a memória dessa pasta.

A partir do próximo capítulo, você vai parar de depender da boa vontade do seu próprio "ctrl+z" e do seu próprio sistema de arquivos. Vai aprender Git como **diário técnico do projeto** — quando salvar, o que salvar, como descrever o que foi feito, e como voltar atrás quando alguma coisa quebrar.

Antes de seguir, confira: a sua pasta `stackovia-intrastack-basic-rascunho/` agora tem `README.md`, `docs/escopo-v01.md`, `docs/diario-tecnico.md` (com três entradas), `docs/http-basico.md`, `docs/checklist-diagnostico.md`, `docs/runbook-local.md`, `diagrams/request-response.md`, `assets/screenshots/.gitkeep` e `src/index.html`. Se sim, vire para o Capítulo 4.
