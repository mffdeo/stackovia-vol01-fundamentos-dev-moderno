---
title: "Capítulo 1 — Entrada na Stackovia e setup da jornada"
status: Preview
volume: 1
capitulo: 1
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.

# Capítulo 1 — Entrada na Stackovia e setup da jornada
## Abertura narrativa na Stackovia

Você acabou de chegar na Stackovia.

Não é um trabalho de verdade. É a sua primeira semana como estagiário de desenvolvimento web dentro do universo desta coleção. A Stackovia é uma software house fictícia, mas o que ela vai te pedir é real demais para tratar como brincadeira: pegar uma página interna improvisada, transformar em algo pequeno mas profissional, e mostrar evidência do trabalho no GitHub e no LinkedIn.

Você abre o portal interno que a equipe usa para receber novas pessoas. Ele tem um pedaço de texto colado no topo, três links espalhados sem ordem clara e uma foto de equipe sem legenda. Falta um lugar pra ver "como abrir um projeto aqui dentro". Falta um lugar pra avisar "quem chamar quando travar". O portal funciona, mas funciona mal.

O Mestre Py é quem vai conduzir você por dentro desse problema. Ele aparece nos próximos capítulos como mentor técnico: revisa código com firmeza, faz pergunta inconveniente na hora certa e não deixa você confundir "rodou na minha máquina" com "entrega pronta". No primeiro encontro dele com você, ele não abre o editor. Ele faz uma pergunta direta: **o que esse portal precisaria ter pra você confiar nele como onboarding?**

Você ainda não sabe responder. Tudo bem. É justamente esse desconforto que esse capítulo quer manter aceso.

## Card da sprint

Toda sprint na Stackovia começa por um card. O card não é decoração — é o contrato curto entre você e a sprint.

```text
[Card da Sprint]
Sprint:    Onboarding técnico — Semana 1
Cargo:     Estagiário de desenvolvimento web
Tarefa:    Entender o problema do portal interno e preparar a
           jornada de construção do IntraStack básico.
Definição
de pronto: Você entende o escopo do Volume 1, sabe o que o V01
           NÃO vai entregar e tem a primeira estrutura de
           acompanhamento do seu próprio aprendizado criada.
```

Repare em três detalhes desse card:

- ele tem **tarefa**, não promessa vaga;
- ele tem **definição de pronto**, então você consegue dizer quando o capítulo terminou para você;
- ele declara o que NÃO entra, e não só o que entra. Isso vai virar hábito da coleção inteira.

## Problema de negócio

A Stackovia recebe pessoas novas todo mês. Toda vez que alguém entra, perde tempo procurando link de Wiki que mudou de lugar, descobrindo no terceiro dia quem é o responsável por uma área e refazendo perguntas que já foram respondidas duas semanas atrás em outro canal.

O portal interno deveria resolver isso. Hoje ele não resolve. Ele só existe.

Esse é o problema de negócio do Volume 1, na forma mais curta que cabe: **a Stackovia precisa de um portal interno pequeno, claro e reproduzível, que sirva de orientação inicial para quem chega — e que possa virar evidência pública do trabalho de quem construiu**.

Pequeno porque o V01 não é o lugar para criar produto completo. Claro porque é onboarding, e onboarding confuso desorienta antes de orientar. Reproduzível porque, no fim, esse repositório vai parar no seu perfil do GitHub e em um post no LinkedIn — e quem clicar precisa conseguir abrir, entender e verificar.

## O que será construído

Ao longo do Volume 1, você vai construir o **IntraStack básico**: um portal interno estático, responsivo, versionado, documentado e com release.

O repositório sugerido se chama `stackovia-intrastack-basic`. Ele vai conter, ao final do volume:

- uma home com estrutura semântica e seções de onboarding;
- páginas auxiliares simples (sobre/equipe, contato);
- CSS responsivo, sem framework;
- JavaScript básico para uma interação previsível;
- consumo de dados mockados via `fetch`, sem backend real;
- um formulário simples com validação client-side;
- um diagrama request/response;
- um fluxo de Git/PR explicado;
- um README profissional, com prints, limitações e próximos passos;
- um `docs/risks.md` com checklist de riscos antes da publicação;
- uma release `v0.1.0-intrastack-basic` com changelog curto;
- um post LinkedIn de fechamento honesto.

O que o IntraStack básico **não** vai ter neste volume:

- backend real (FastAPI, banco, autenticação) — isso é V03;
- frontend com React, Next.js, TypeScript ou Tailwind — isso é V02;
- Docker, AWS, Kubernetes, CI/CD — isso entra a partir do V06;
- arquitetura distribuída, RAG, agentes ou red teaming — isso é a Temporada 2 em diante.

Cada vez que algum desses temas aparecer em algum capítulo do V01, vai aparecer como ponte ("isso vem depois"), nunca como aula prática.

Essa fronteira não é restrição editorial: é proteção contra um erro clássico de portfólio iniciante, que é tentar carregar reputação de senioridade em cima de um projeto de fundamentos.

## Cena/tensão de abertura

Volte por um instante ao portal interno improvisado.

Você passa o olho de novo e a sensação fica mais clara: o problema não é estético. É de **escopo**. Ninguém combinou o que esse portal deveria ser, então ele virou aquilo que cada pessoa achou que devia ser, em camadas. Texto colado no topo, links jogados, foto sem legenda.

Você imagina abrir o editor agora e começar a melhorar a home. Trocar a cor. Reorganizar links. Mas, antes de tocar em qualquer arquivo, vem uma pergunta desconfortável: **se você terminar de "ajeitar" o portal hoje, como alguém verifica amanhã se ficou bom?**

Não tem critério.

A tensão do capítulo é essa: você vai aprender a entregar trabalho profissional pequeno, e trabalho pequeno sem critério vira retrabalho. Vira "achei que estava pronto" no PR, vira "funciona aqui" no review, vira post LinkedIn que promete o que não foi feito.

## Exemplo concreto antes do conceito

Veja dois cards possíveis para essa mesma sprint.

**Card A — vago:**

```text
[Card A]
Sprint: Onboarding — Semana 1
Tarefa: Arrumar a página interna.
```

**Card B — operacional:**

```text
[Card B]
Sprint:    Onboarding técnico — Semana 1
Tarefa:    Entender o portal interno como problema de
           comunicação. Preparar escopo do IntraStack básico
           e a primeira estrutura de acompanhamento.
Definição
de pronto: Escopo do V01 escrito; lista do que NÃO entra
           registrada; primeira pasta do projeto pronta;
           rótulo de maturidade definido.
```

Os dois cards descrevem o mesmo dia de trabalho. O Card A te deixa fazer qualquer coisa e chamar de "arrumado". O Card B te impede de chamar a entrega de pronta sem critério.

Esse é o exemplo. Agora o conceito.

## Conceitos essenciais

### Conceito-chave 1: escopo

Escopo é o que você concorda **fazer** e o que você concorda **não fazer**.

Em projeto pequeno, escopo parece desnecessário. É exatamente o oposto: projeto pequeno sem escopo vira projeto pequeno que cresce de lado, vira projeto pequeno que demora três vezes mais, vira projeto pequeno que ninguém consegue avaliar porque ninguém combinou o que era pra entregar.

O escopo do V01 está no Card B: portal estático, responsivo, versionado, documentado, com release e post honesto.

### Conceito-chave 2: critério de pronto

Critério de pronto é a régua que diz se a entrega terminou.

Sem critério, "pronto" depende do humor. Com critério, "pronto" depende de uma lista verificável. Em cada capítulo do V01, você vai encontrar uma seção **Critérios de aceitação** — exatamente para isso.

### Conceito-chave 3: evidência

Evidência é o que outra pessoa consegue **abrir, ler e verificar** sem te pedir explicação.

Trabalho sem evidência é difícil de mostrar em entrevista, em revisão de portfólio ou em conversa técnica. O Volume 1 inteiro está montado para que a entrega final caiba em três artefatos verificáveis:

- um repositório no GitHub que outra pessoa consiga clonar e abrir;
- um README que explique problema, solução, como rodar e onde estão os limites;
- um post LinkedIn que conte o aprendizado sem prometer o que não foi feito.

### Conceito-chave 4: estudar versus produzir evidência

Estudar é consumir conteúdo: ler, ver vídeo, fazer exercício pontual.

Produzir evidência é diferente. É deixar um rastro **verificável** do que você aprendeu, num lugar onde alguém que não te conhece possa abrir e validar.

Os dois são úteis. Mas só o segundo move o seu portfólio profissional. A coleção Stackovia inteira é construída sobre essa segunda parte.

### Conceito-chave 5: rótulo de maturidade

Toda entrega da Stackovia é rotulada. O rótulo evita confusão entre "estudo" e "produto em produção".

Os rótulos disponíveis são: **Estudo**, **Laboratório**, **Simulação**, **MVP**, **Staging** e **Capstone**.

Para o Volume 1, o rótulo é fixo:

```text
[Conceito-chave: Rótulo de maturidade]
Definição operacional: declaração explícita do nível de
maturidade da entrega, escrita no README e no post.
Por que importa: impede que estudo seja descrito como
produto pronto para produção.
Stackovia, V01: Estudo / Fundamentos.
```

### Conceito-chave 6: o papel do Mestre Py

O Mestre Py é o seu mentor de leitura ao longo da coleção. Ele tem uma função clara: te incomodar nos lugares certos.

Ele não vai resolver tudo por você. Ele vai aparecer quando você estiver prestes a confundir "fiz um deploy" com "tenho um produto", quando estiver prestes a colocar segredo em arquivo público ou quando o seu post LinkedIn começar a soar como propaganda. A voz dele é firme onde há risco real, e respeitosa onde há erro de iniciante.

Trate o Mestre Py como segunda opinião dura e bem-intencionada. Ele já viu deploy ruim, PR raso e README decorativo. A função dele é evitar que você passe por isso sozinho.

## Como organizar a jornada

A jornada do Volume 1 é linear e tem 13 capítulos. Você está no primeiro. O mapa abaixo serve como bússola da semana de onboarding e dos capítulos seguintes.

```text
[Mapa da jornada — Volume 1]

  C01  Entrada na Stackovia e setup da jornada              ← você está aqui
   ↓
  C02  Como a internet funciona na prática
   ↓
  C03  Terminal, pastas, arquivos e ambiente
   ↓
  C04  Git como memória do aprendizado
   ↓
  C05  GitHub, README e Pull Request
   ↓
  C06  HTML semântico para a primeira página
   ↓
  C07  CSS moderno e layout responsivo
   ↓
  C08  JavaScript básico aplicado ao IntraStack
   ↓
  C09  HTTP, request/response e dados mockados
   ↓
  C10  Formulário, validação simples e erros comuns
   ↓
  C11  Segurança básica desde cedo
   ↓
  C12  Publicação estática e checklist de portfólio
   ↓
  C13  Fechamento: release, LinkedIn e próximos passos
```

Cada capítulo segue o mesmo padrão de leitura: começa com uma cena de trabalho, mostra um exemplo antes de nomear o conceito, traz uma seção **O que pode dar errado?** quando há risco real, fecha com **Mãos à Obra** e com um critério verificável. Você vai reconhecer esse ritmo a partir do Capítulo 2.

A regra do volume é simples: você não avança para o próximo capítulo sem ter feito a entrega prática do capítulo anterior. Ler e seguir adiante sem registrar evidência transforma a jornada em consumo passivo — e o V01 inteiro foi desenhado contra isso.

## O que pode dar errado?

Antes de você começar a criar pasta e arquivo, vale antecipar os erros mais comuns de quem está no primeiro capítulo de uma trilha de fundamentos. Eles são pequenos, mas atrapalham o resto do volume se passarem em branco.

- **Criar o repositório no GitHub agora.** É tentador. Não faça. O C01 ainda não tem código, README profissional, branch ou PR. Repositório criado cedo demais vira repositório vazio com badge decorativo, e isso é justamente o tipo de portfólio que o V01 está tentando te ensinar a não publicar. GitHub entra no C05.
- **Usar dados reais.** Nome de colega de trabalho, e-mail pessoal, foto interna da sua empresa atual, descrição de cliente. Nada disso entra. A Stackovia é cenário fictício; o IntraStack é estudo. O que entra é nome inventado, contato `exemplo@stackovia.dev`, foto genérica ou placeholder.
- **Escrever escopo genérico.** Frases como "vou aprender desenvolvimento web" ou "vou criar um portal" não são escopo. Não dizem o que entra, não dizem o que não entra e não dão critério para fechar o capítulo. Reescreva até caber em três blocos curtos e específicos.
- **Prometer demais no esboço do LinkedIn.** "Em breve, um produto interno completo" é o tipo de frase que estraga o post antes de ele existir. O esboço de post deste capítulo é uma anotação privada no seu diário, declarando que é estudo. Nada além disso.
- **Confundir estudo com produto.** O IntraStack básico não é produto. Não tem usuários, não tem SLA, não tem produção. Cada vez que aparecer dúvida sobre "estudo ou produto?", a resposta é estudo. Esse hábito sustenta a honestidade técnica do portfólio.
- **Criar a árvore inteira de pastas já hoje.** A estrutura-alvo aparece na próxima seção, mas ela é resultado **do volume inteiro**, não do C01. Tentar montar tudo de uma vez gera diretórios vazios e cansaço inútil. O C01 pede apenas dois arquivos texto.

## Checklist de segurança inicial

Mesmo sem código, o Capítulo 1 já carrega cinco regras de higiene que não devem ser quebradas em nenhum capítulo do V01:

- [ ] Nada que você escrever neste capítulo usa dados reais (pessoas, clientes, equipes, empresas).
- [ ] Nenhum segredo (token, senha, chave de API) entra em arquivo nenhum — nem como "exemplo".
- [ ] Você **não** vai criar arquivo `.env` neste capítulo. Se algum capítulo futuro precisar, será `.env.example` com placeholders, nunca com valor real.
- [ ] Você não vai usar nome de empresa, cliente ou marca real no escopo, no diário ou no esboço de post.
- [ ] Você não vai descrever a entrega como "produto pronto", "produção", "pronto para clientes" ou qualquer frase equivalente. O rótulo é Estudo / Fundamentos.

Esta é a versão mínima de segurança do V01: pequena, mas inegociável. Os capítulos 11 e 12 voltam a esses pontos com mais profundidade.

## Primeira estrutura de pastas do projeto

Você ainda não vai escrever HTML, CSS ou JavaScript. Esse trabalho começa no Capítulo 6.

O que você vai preparar agora é o **lugar** onde tudo isso vai morar. Os capítulos 3 e 4 ensinam a criar essa estrutura no terminal e a versioná-la com Git. Aqui, no C01, basta reconhecer a forma final que o projeto vai assumir ao longo do volume.

> **Aviso operacional.** A árvore abaixo é a **estrutura-alvo do Volume 1 inteiro**, e não uma lista de pastas para criar hoje. Não tente criar tudo agora. No C01, você só precisa criar **dois arquivos** dentro de `docs/`: `escopo-v01.md` e `diario-tecnico.md`. Todo o resto da árvore vai surgindo nos capítulos seguintes, na hora certa.

Estrutura-alvo do IntraStack básico (referência do volume, não tarefa do C01):

```text
stackovia-intrastack-basic/
  README.md
  CHANGELOG.md
  docs/
    diario-tecnico.md
    escopo-v01.md
    runbook-local.md
    risks.md
  diagrams/
    request-response.md
    git-flow.md
  assets/
    screenshots/
    linkedin/
  src/
    index.html
    sobre.html
    contato.html
    styles.css
    app.js
    data/
      equipe.json
```

Três observações importantes sobre essa estrutura:

- ela **não** precisa nascer pronta hoje. Cada capítulo seguinte traz o pedaço dela na hora certa;
- **nenhum** desses arquivos pode conter dado real da sua vida pessoal, da sua empresa atual, de cliente real ou de equipe real. A Stackovia é cenário; o projeto é estudo;
- ainda **não** existe `.env`. Se em algum capítulo futuro for útil registrar variáveis, vai aparecer como `.env.example` com placeholders — nunca com valor real.

No final deste capítulo, você só precisa de duas pastas leves no seu computador para começar a se organizar: uma pasta `docs/` com dois arquivos texto, e nada mais. O resto vai surgindo.

## Mãos à Obra

Tarefa concreta do Capítulo 1.

### Contexto

Você precisa sair desta leitura com três coisas: o escopo do V01 registrado por escrito por você, um diário onde você vai anotar aprendizados ao longo do volume e o primeiro checklist da sua jornada. Nada além disso.

Você ainda não vai instalar Git, criar repositório, abrir GitHub ou publicar. Esses passos vêm a partir do Capítulo 3.

### Tarefa

1. Crie em algum lugar do seu computador uma pasta chamada `stackovia-intrastack-basic-rascunho/`. Pode ser na sua área de estudos; ainda não é o repositório oficial.
2. Dentro dela, crie uma subpasta `docs/`.
3. Dentro de `docs/`, crie dois arquivos texto:
   - `escopo-v01.md`;
   - `diario-tecnico.md`.
4. No arquivo `docs/escopo-v01.md`, escreva, com suas próprias palavras, três blocos curtos:
   - **O que o V01 vai entregar.** Use a lista da seção "O que será construído" como referência, mas escreva no seu vocabulário.
   - **O que o V01 não vai entregar.** Liste de forma explícita: sem backend, sem React, sem Docker, sem cloud, sem IA. Essa lista é tão importante quanto a primeira.
   - **Rótulo de maturidade da minha entrega.** Escreva uma frase: "Esta entrega do Volume 1 é classificada como Estudo / Fundamentos, e não como produto em produção."
5. No arquivo `docs/diario-tecnico.md`, registre a primeira entrada:
   - data;
   - capítulo (C01);
   - uma frase sobre o que ficou mais claro nesta leitura;
   - uma frase sobre o que ainda está confuso;
   - uma frase sobre o próximo passo (que é o C02).

### Dica anti-armadilha

Se você se pegar querendo "deixar bonito" o `escopo-v01.md` agora, pare. O documento é seu, é interno e é editável. Escrever rápido e revisar depois vale mais do que travar tentando começar perfeito.

## Critérios de aceitação

Use esta lista para fechar o Capítulo 1. Ela é binária: cada item é "feito" ou "não feito".

- [ ] Você consegue explicar, em três frases, o que é o IntraStack básico.
- [ ] Você consegue listar, sem consultar este texto, pelo menos quatro coisas que o V01 **não** vai ensinar.
- [ ] A pasta `stackovia-intrastack-basic-rascunho/docs/` existe no seu computador.
- [ ] O arquivo `docs/escopo-v01.md` existe e tem os três blocos descritos no Mãos à Obra.
- [ ] O arquivo `docs/diario-tecnico.md` existe e tem a primeira entrada datada.
- [ ] Você sabe qual é o rótulo de maturidade da sua entrega (e é "Estudo / Fundamentos").
- [ ] Você sabe que ainda não precisa criar repositório no GitHub.
- [ ] Você sabe que o próximo capítulo trata de internet e HTTP, e não de código.

Se algum item não estiver marcado, volte ao trecho correspondente antes de avançar. Não há vergonha em reler — há custo em pular.

## Code Review do Mestre Py

Você ainda não tem código para o Mestre Py revisar. O que ele revisa hoje é a sua entrega de **escopo e evidência inicial**: o `escopo-v01.md`, o `diario-tecnico.md` e a clareza geral do seu compromisso com o volume.

Imagine que você mostrou os dois arquivos ao Mestre Py no fim do dia. Esta é a leitura que ele faria.

**O que ele aprovaria**

- escopo escrito como três blocos curtos, com "o que entra", "o que NÃO entra" e rótulo de maturidade declarado;
- frase explícita do tipo "Esta entrega é Estudo / Fundamentos; não é produto em produção";
- lista de não-escopo concreta (sem React, sem FastAPI, sem Docker, sem cloud, sem IA) — e não genérica;
- diário com data, capítulo, o que ficou claro, o que está confuso e qual é o próximo passo;
- ausência de repositório no GitHub neste momento.

**O que ele pediria para ajustar**

- escopo escrito com frases vagas ("vou aprender web", "vou criar um site bonito") — pediria para reescrever em termos de entrega verificável;
- "o que NÃO entra" omitido ou genérico — pediria para listar pelo menos quatro temas específicos;
- rótulo de maturidade ausente do `escopo-v01.md` — pediria a frase literal de declaração;
- diário escrito como resumo motivacional ("foi incrível!") em vez de registro técnico — pediria três frases curtas e específicas.

**O que ele reprovaria**

- qualquer dado real (nome, e-mail, foto, empresa) dentro do `escopo-v01.md` ou do diário;
- qualquer descrição da entrega como "projeto pronto", "MVP", "produto", "produção" ou "Capstone";
- repositório criado no GitHub neste capítulo, com README vazio e badge decorativo;
- post LinkedIn publicado hoje, antes de existir evidência verificável;
- segredo, token, chave ou senha registrado em qualquer arquivo, ainda que "só como exemplo".

**O resumo do Mestre Py**

> "No C01, o seu trabalho ainda não é técnico — é editorial. Você está aprendendo a delimitar o tamanho do que vai entregar e a declarar maturidade. Faz isso com clareza aqui, e os doze capítulos seguintes ficam mais fáceis. Faz isso mal, e o projeto inteiro herda a falta de critério."

## Entrega de portfólio

O Capítulo 1 ainda não produz evidência pública. Ele produz evidência interna, que vai virar evidência pública a partir do Capítulo 5.

### Artefato GitHub esperado

Nenhum. Você ainda não publicou nada no GitHub e isso é intencional. Repositório no GitHub vem no C05.

### README esperado

Nenhum README oficial nesta etapa. O `docs/escopo-v01.md` faz o papel de README interno por enquanto.

### Screenshots ou diagramas

Você pode tirar uma captura de tela da árvore de pastas que criou — apenas para o seu próprio registro, no `diario-tecnico.md`. Não é entrega pública.

### Evidências internas que ficam prontas no C01

- `docs/escopo-v01.md` com escopo, não-escopo e rótulo;
- `docs/diario-tecnico.md` com primeira entrada;
- pasta inicial do projeto na sua máquina, pronta para o C03 começar a evoluir.

### Limitações que devem aparecer

- entrega é local, não publicada;
- é estudo, não produto;
- não há código de aplicação ainda;
- o GitHub do projeto vai existir só a partir do C05.

### Rótulo de maturidade

**Estudo / Fundamentos.**

## Mini post LinkedIn

Este é um capítulo de abertura. Ainda não é o momento de publicar link principal do projeto. Mas você já pode preparar uma versão curta de post para **quando** tiver evidência para mostrar, lá no C04 ou C05.

Gancho honesto:

> "Comecei uma jornada de fundamentos de desenvolvimento web em formato de projeto: pequeno, versionado, com README e limitações declaradas. Ainda não há link do projeto público — vai aparecer nos próximos capítulos da minha leitura, quando o repositório for criado e o primeiro PR estiver de pé."

Limitação que deve aparecer:

> "É estudo, não produto. Não simula produção, não simula escala. É a primeira semana de uma trilha guiada."

Não publique nada hoje. Apenas guarde esse esboço no seu `diario-tecnico.md` para reaproveitar.

## Perguntas de revisão

Antes de virar a página para o C02, revise estas perguntas mentalmente. Se alguma travar, volte à seção correspondente.

1. Qual é o problema de negócio do V01, em uma frase?
2. Qual é o nome do projeto integrador do V01 e o que ele faz?
3. Quais quatro temas o V01 **não** vai ensinar em profundidade?
4. Qual é a diferença entre "estudar" e "produzir evidência"?
5. Qual é o rótulo de maturidade da sua entrega no V01, e onde ele precisa aparecer escrito?
6. Por que o GitHub do projeto ainda não foi criado neste capítulo?

Se você consegue responder essas seis perguntas sem consultar o texto, o Capítulo 1 cumpriu o papel dele.

## Próximo passo

No próximo capítulo, você não vai tocar em arquivo de código.

O Mestre Py vai te pedir uma coisa estranha antes disso: descobrir por que uma página simples chega ao navegador. Como uma URL vira pixel na tela. Onde, exatamente, o caminho quebra quando alguém diz "o site caiu".

O C02 é uma aula curta sobre internet, HTTP e o caminho da requisição — não como teoria seca, mas como ferramenta de diagnóstico que você vai usar do C06 em diante.

Antes de seguir, confira: a sua pasta `stackovia-intrastack-basic-rascunho/docs/` está criada, com `escopo-v01.md` e `diario-tecnico.md` preenchidos com sua mão. Se sim, vire para o Capítulo 2.
