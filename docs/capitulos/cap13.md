---
title: "Capítulo 13 — Fechamento do Volume 1: release, LinkedIn e próximos passos"
status: Preview
volume: 1
capitulo: 13
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 13 — Fechamento do Volume 1: release, LinkedIn e próximos passos

## Abertura

O IntraStack estava no ar. Link público testado em aba anônima, CSS carregando, imagens no lugar, README completo, checklist de publicação preenchido. O Mestre Py tinha aprovado a entrega do C12 sem comentário — coisa rara.

Você abriu o LinkedIn, animado, e escreveu o primeiro rascunho do post:

> "🚀 Acabei de lançar o IntraStack, um portal de onboarding **pronto para produção**! Sistema completo de gestão de equipe, com formulário de contato funcional e API de dados. Stack profissional, escalável e segura. Bora pra próxima! 💪"

Você mandou o rascunho para o Mestre Py antes de publicar. A resposta foi quase imediata:

"Para. Lê isso de novo, devagar, como se fosse um recrutador que abre o seu repositório logo depois de ler esse post. 'Pronto para produção' — o projeto não tem backend. 'API de dados' — são dados mockados num arquivo JSON. 'Formulário funcional' — ele simula o envio, você mesmo escreveu isso no C10. 'Escalável e segura' — escalável como, se não tem servidor? Segura contra o quê?"

"O projeto que você construiu é bom. É honesto, é reproduzível, é verificável. E você acabou de escrever um post que promete cinco coisas que o repositório vai desmentir no primeiro clique. Isso não te faz parecer mais sênior. Te faz parecer alguém que não sabe a diferença entre estudo e produção — ou que sabe e mentiu. As duas leituras são ruins numa entrevista."

É o INC-V01-023: o post exagera a maturidade, e a descrição pública promete mais do que o repositório entrega.

Este capítulo fecha o Volume 1. Não com um foguete, mas com a coisa que vale mais num portfólio de quem está começando: uma entrega pequena, marcada, verificável e **honesta**.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Fechar a primeira entrega com honestidade (C13) |
| Tarefa | Criar a release/tag do IntraStack, escrever o changelog, finalizar o README e preparar o post de fechamento — com limitações e próximo passo |
| Definição de pronto | Entrega final do V01 documentada, verificável e sem exagero: release marcada, links revisados, post proporcional |

O tamanho desta sprint é o de um capítulo, e é um capítulo de **fechamento** — não se constrói nenhuma feature nova aqui. O trabalho é marcar o que já existe, conferir que tudo se sustenta para um olhar externo, e contar a história de forma honesta.

## Problema de negócio

Você construiu uma base sólida ao longo de doze capítulos. Mas um volume mal fechado pode desperdiçar tudo isso de duas formas opostas:

1. **Fechar com exagero** transforma um bom estudo numa promessa inflada. O recrutador abre o repositório, vê que o "produto pronto para produção" é uma demo estática, e a credibilidade desaba — não pela qualidade do projeto, mas pela distância entre o que foi prometido e o que foi entregue.
2. **Fechar sem evidência verificável** desperdiça do outro lado: a release aponta para um link quebrado, o README está desatualizado, e o avaliador clica logo na entrega final e encontra um 404. O trabalho existe, mas o fechamento o esconde.

Fechar bem é o meio-termo profissional: **marcar** a entrega (uma versão com nome e data, que não muda mais), **documentar** o que ela é e o que não é, e **contar** a história sem fingir senioridade. É o que separa "fiz um exercício" de "tenho um projeto que sei explicar".

## O que será construído neste capítulo

Ao final deste capítulo, a entrega do IntraStack básico estará **fechada e marcada**:

- Uma **release/tag** `v0.1.0-intrastack-basic` — uma versão marcada do repositório, que registra "este é o estado da primeira entrega de fundamentos".
- Um `CHANGELOG.md` — um resumo curto e honesto do que foi construído do C01 ao C12.
- O **README final** revisado uma última vez, com links conferidos, limitações claras e a retrospectiva da jornada.
- Um **post de fechamento** para o LinkedIn — honesto, proporcional, com limitação e próximo passo (em `assets/linkedin/`, pronto para quando você quiser publicar).
- Os **links revisados** uma última vez, como faria um avaliador externo.
- Entrada final no diário técnico.
- Commit e tag fechando o volume.

O que **não** entra: nenhuma feature técnica nova, nenhuma linha de React, Next.js ou TypeScript, nenhum CI/CD, nenhum deploy full stack, nenhuma métrica de produção, nenhuma promessa de escala. Este capítulo **fecha** o volume; ele não abre o próximo. O V02 começa no próximo volume, não aqui.

## Cena/tensão de abertura

Depois que o Mestre Py barrou o post exagerado, você corrigiu o texto e foi criar a release. Marcou a tag, escreveu o changelog e, no campo de notas, colou o link da demo. Mandou o link da release para ele conferir.

"Cliquei no link de demo do seu changelog", ele respondeu. "404. A página não existe."

Você tinha copiado a URL errada — faltou o subcaminho do repositório. No checklist do C12 você testou a home, mas na pressa de fechar a release colou um link diferente, e não o abriu de novo.

É o INC-V01-024: a release existe, mas o link de demo no changelog retorna 404. O fechamento do volume aponta para uma evidência quebrada — e é a primeira coisa que um avaliador clica.

"Olha o padrão", disse o Mestre Py. "No C12 você aprendeu a verificar o link antes de chamar de 'no ar'. Aqui é a mesma lição, num lugar novo: a release é uma página pública também. Todo link que você coloca nela precisa ser aberto, de fora, antes de você considerar a entrega fechada. Release boa é aquela que **outra pessoa** consegue conferir. Tag não é o fim. O fim é quando o link da tag funciona."

A correção foi trivial — colar a URL certa, testada em aba anônima. A lição não foi: **o checklist final vale para a release tanto quanto valeu para o deploy.**

## Exemplo antes do conceito

Duas formas de fechar o mesmo volume. As duas "anunciam o projeto"; só uma sobrevive ao primeiro clique de quem avalia.

**Trecho A — fechamento inflado:**

> **Post:** "🚀 Lancei o IntraStack, portal de onboarding pronto para produção, escalável e seguro!"
>
> **Release:** `v1.0.0 — Versão final de produção`
> Link de demo: `https://usuario.github.io/intrastack-prod/` → **404**

Três problemas num fechamento só. O post promete produção, escala e segurança que não existem. A versão `v1.0.0` e o rótulo "final de produção" reforçam o exagero. E o link, o detalhe que derruba tudo, está quebrado — o avaliador clica e encontra erro antes mesmo de ler o código.

**Trecho B — fechamento honesto:**

> **Post:** "Fechei meu primeiro projeto de fundamentos: o IntraStack Básico, uma demo estática de um portal de onboarding. É estudo, não produção — e está documentado e verificável."
>
> **Release:** `v0.1.0-intrastack-basic — Primeira entrega de fundamentos (V01)`
> Link de demo: `https://usuario.github.io/stackovia-intrastack-basic/` (testado em aba anônima)
> Changelog curto, limitações declaradas, próximo passo apontado.

A diferença não é modéstia — é **calibragem honesta**:

- A versão `v0.1.0` comunica o que o projeto é: um começo, não um produto acabado.
- O post descreve "demo estática de estudo", e o repositório confirma exatamente isso.
- O link foi testado de fora e funciona.
- As limitações e o próximo passo estão à vista, não escondidos.

Quem recebe o Trecho B vê alguém que sabe exatamente o que construiu e o que ainda falta. Isso, num iniciante, vale mais do que qualquer foguete. Agora vamos nomear os conceitos.

## Conceitos essenciais

### Conceito-chave 1 — Fechamento profissional combina evidência, limite honesto, release e próximo passo

A definição que orienta o capítulo: **fechar** um projeto de portfólio não é anunciá-lo do jeito mais impressionante possível. É reunir quatro coisas que se sustentam juntas:

- **Evidência:** o que prova que o projeto funciona (link verificável, prints, README reproduzível — tudo já reunido no C12).
- **Limite honesto:** o que o projeto **não** é, dito sem rodeios (sem backend, sem produção, sem escala).
- **Release:** uma versão marcada, que congela "este é o estado da entrega".
- **Próximo passo:** para onde o trabalho aponta a seguir, sem prometer que já chegou lá.

Falta qualquer uma das quatro e o fechamento desequilibra: só evidência sem limite vira exagero; só limite sem evidência vira insegurança; sem release a entrega não tem ponto de referência; sem próximo passo parece que a jornada parou.

### Conceito-chave 2 — Release e tag: marcar um ponto no tempo

Uma **tag** é um marcador que você prega num ponto específico do histórico do Git — "aqui estava o projeto neste momento". Diferente de um commit comum, ela tem um nome estável (`v0.1.0-intrastack-basic`) e não se move: mesmo que você continue commitando depois, a tag continua apontando para o estado marcado.

Uma **release** (no GitHub) é a tag com uma página pública em volta: um título, notas do que mudou (o changelog), e links. É a forma de dizer "esta é uma entrega que vale a pena olhar", separada do fluxo de commits do dia a dia.

Para o V01, a tag é `v0.1.0-intrastack-basic`. O `v0.1.0` comunica honestidade: é a **primeira** entrega (`0.1.0`, não `1.0.0`), de fundamentos. Não vamos entrar em versionamento avançado aqui — basta entender que um número baixo e honesto diz "começo", e que isso é exatamente o que você quer comunicar.

### Conceito-chave 3 — Changelog: o que mudou, em poucas linhas

Um **changelog** é o resumo do que a entrega contém, em linguagem que outra pessoa entende. Para o IntraStack, ele não precisa listar cada commit — precisa contar, em poucas linhas, o que foi construído do C01 ao C12.

Um changelog honesto descreve **capacidades reais**, não aspirações:

- ✅ "Página HTML semântica, responsiva, com interação e formulário validado no cliente."
- ❌ "Sistema de gestão de equipe com API." (não há sistema nem API)

O changelog é a primeira coisa que aparece na release. Se ele exagera, repete o erro do post; se ele é honesto e específico, ancora a entrega na realidade.

### Conceito-chave 4 — A release também é um link público que precisa ser verificado (INC-V01-024)

Esta é a continuação direta da lição do C12, num lugar novo. No C12 você aprendeu que "deploy termina quando o link é verificado". A release tem **vários** links: o de demo, possivelmente o de download, links no README. Cada um é um link público.

O INC-V01-024 é colar um link de demo no changelog e nunca abri-lo. O avaliador clica, encontra 404, e o fechamento do volume — o ponto mais visível da entrega — aponta para algo quebrado.

A regra: antes de considerar a release pronta, **abra todos os links dela em aba anônima** (ou clone limpo). Cada link que você publica é uma promessa de que ali tem algo. Link quebrado na entrega final é a pior hora para descobrir que você não conferiu.

### Conceito-chave 5 — Honestidade no fechamento: nem inflar, nem encolher (INC-V01-023)

O INC-V01-023 é o post que chama o estudo de produção. Mas honestidade no fechamento tem dois lados, e os dois importam:

- **Não inflar:** não chame de "produção", "escalável", "seguro", "API", "sistema". Não use `v1.0.0` nem badge de build/deploy/coverage que não existe. Não prometa o que o repositório não entrega.
- **Não encolher:** você **construiu** algo real. Uma página semântica, responsiva, com interação, formulário validado, dados tratados com cuidado, segredos fora do repositório, deploy verificado. Dizer "ah, não é nada, é só um exercício besta" também é desonesto — para baixo.

O ponto certo: **descrever exatamente o que é.** "Demo estática de estudo de fundamentos, reproduzível e verificável, construída do zero." Isso não é nem foguete nem desculpa. É a verdade — e a verdade bem contada é o que um avaliador experiente respeita.

### Conceito-chave 6 — A ponte para o V02 é um convite, não uma promessa

Fechar bem inclui apontar para onde o trabalho vai — sem fingir que já chegou. O V02 transforma o IntraStack básico numa aplicação frontend profissional, com React, Next.js e TypeScript. Mas isso é o **próximo passo**, não algo que você já fez.

A diferença na prática:

- ✅ "O próximo passo é reconstruir essa base como app frontend profissional, com React e TypeScript." (convite honesto)
- ❌ "Em breve com React, Next.js, autenticação e backend completo!" (promessa que vira dívida)

A ponte para o V02 é uma frase de direção, leve. Ela mostra que você sabe para onde está indo, sem antecipar conteúdo que ainda não existe.

## Construindo o fechamento em etapas

O fechamento acontece em seis etapas. O checklist vem **antes** de mexer nos artefatos finais, e a tag vem **depois** do commit final de propósito: você marca a versão somente quando README, changelog, post e diário já representam o estado que será publicado.

```text
checklist final  ->  changelog/README/post  ->  commit final  ->  tag/release  ->  links verificados  ->  ponte V02
```

### Etapa 1 — Rodar o checklist final (antes de marcar nada)

Antes de criar a tag, reabra o `docs/publication-checklist.md` do C12 e percorra-o inteiro mais uma vez. A entrega está completa? Link verificado em aba anônima, CSS e imagens carregando, README com todas as seções, nenhum segredo publicado. Marcar uma versão de algo que não está pronto só congela o problema.

### Etapa 2 — Preparar os artefatos finais

Escreva o `CHANGELOG.md` (próxima seção), revise o README final, prepare o post em `assets/linkedin/post-fechamento-v01.md` e registre a entrada final do diário técnico. Abra o README como se fosse a primeira vez, com olhos de avaliador externo. Confira: o problema está claro? A stack está correta (HTML, CSS, JS sem framework, dados mockados)? A seção "como rodar" funciona? As limitações estão visíveis? Os links abrem?

No README e no post, inclua também a ponte para o V02: a base do V01 vira aplicação frontend profissional. Uma frase. Convite, não promessa.

### Etapa 3 — Revisar e commitar o fechamento

Antes do commit, rode `git diff --cached` e revise o que vai ficar público: changelog, README, post, diário e qualquer imagem de LinkedIn. Só depois crie o commit de fechamento.

### Etapa 4 — Criar a tag/release

Com o commit final pronto, marque a versão:

```bash
git status                       # árvore limpa, commit final feito
git tag v0.1.0-intrastack-basic  # marca o ponto final do V01
git push origin v0.1.0-intrastack-basic
```

No GitHub, crie a release a partir dessa tag, cole o changelog nas notas e adicione o link de demo **testado**. (Se você não publicou demo no C12, a release aponta para o README com a instrução de execução local — também é uma evidência válida.)

### Etapa 5 — Verificar os links da release

Abra todos os links da release em aba anônima: demo, README, downloads. Se algo retornar 404, corrija antes de divulgar. A tag pode existir; o fechamento ainda não está pronto enquanto o link público principal estiver quebrado.

### Etapa 6 — Apontar a ponte para o V02

Com a release funcionando, a ponte para o V02 deixa de ser promessa solta e vira continuidade natural: o próximo volume transforma a base estática em aplicação frontend profissional. Uma frase basta.

## CHANGELOG.md

Este é o entregável de documentação do capítulo: um resumo curto e honesto da primeira entrega. Crie o arquivo na raiz do projeto.

```markdown
# Changelog — IntraStack Básico

Todas as entregas relevantes deste projeto de estudo são registradas aqui.

## v0.1.0-intrastack-basic — Primeira entrega de fundamentos (V01)

Projeto de **estudo / fundamentos**: portal de onboarding fictício, demo estática,
construído do zero ao longo do Volume 1 da Stackovia Learning Series.

### O que foi construído
- Estrutura de projeto e organização local via terminal (C01–C03).
- Versionamento com Git, repositório, README e Pull Request (C04–C05).
- Página HTML semântica (C06) e CSS responsivo, sem framework (C07).
- Interação com JavaScript no navegador (C08).
- Carregamento de dados mockados com tratamento de erro (C09).
- Formulário com validação no cliente e feedback honesto (C10).
- Revisão de segurança: segredos fora do repositório, inputs tratados (C11).
- Publicação estática verificável e checklist de portfólio (C12).

### Limitações
- Sem backend, banco de dados ou autenticação.
- Sem Docker, CI/CD, SLA ou monitoramento.
- Dados de equipe são mockados; o formulário simula o envio.
- Validação no cliente é orientação, não segurança.

### Próximo passo
- V02: reconstruir esta base como aplicação frontend profissional
  (React, Next.js, TypeScript).

Rótulo de maturidade: **Estudo / Fundamentos**.
```

Repare no tom: o changelog descreve **o que foi feito**, capítulo a capítulo, sem inventar capacidades. As limitações vêm logo depois das conquistas — não escondidas no rodapé. É o mesmo princípio do README do C12, agora como registro marcado da versão.

## O que pode dar errado?

### 1. O post exagera a maturidade do projeto (INC-V01-023)

Chamar a demo estática de "produção", "sistema", "API", "escalável" ou "seguro". O repositório desmente o post no primeiro clique.

**Como evitar:** descreva exatamente o que é — "demo estática de estudo de fundamentos". Compare o post com o README antes de publicar: cada afirmação do post precisa ter correspondência no repositório.

### 2. A release aponta para um link quebrado (INC-V01-024)

O link de demo no changelog ou nas notas da release retorna 404 — URL errada, subcaminho faltando, ou pasta errada publicada.

**Como evitar:** abra **todos** os links da release em aba anônima antes de considerá-la pronta. A release é um link público como qualquer outro.

### 3. O README omite as limitações

O README lista só as conquistas e esconde o que o projeto não faz. Para quem avalia, isso parece exagero por omissão.

**Como evitar:** seção de limitações visível, logo após a descrição. Sem backend, sem produção, sem escala — dito claramente.

### 4. O próximo passo vira promessa de produto

"Em breve com backend, autenticação e deploy completo!" Próximo passo honesto é direção, não compromisso público com prazo ou escopo.

**Como evitar:** uma frase de convite ("o V02 transforma essa base em app frontend profissional"), sem "em breve", sem lista de features prometidas.

### 5. A tag é criada antes de revisar

Marcar `v0.1.0` de um projeto que ainda tem link quebrado, README desatualizado ou segredo a caminho. A tag congela o problema num ponto público.

**Como evitar:** checklist final **antes** da tag (Etapa 1). Marque a versão só depois de confirmar que a entrega se sustenta.

## Debugging guiado

O "bug" deste capítulo não é de código — é de **fechamento**. O processo de depuração é revisar a entrega final com olhos de quem vai avaliá-la.

### Passo 1 — Abrir todos os links da release, de fora

Em aba anônima (ou clone limpo), abra cada link da release: demo, README, qualquer link de download. Cada 404 é um problema a corrigir antes de divulgar. Este é o passo que pega o INC-V01-024.

### Passo 2 — Ler o README como um avaliador externo

Finja que você nunca viu o projeto. O problema está claro? Você consegue rodar seguindo o "como rodar"? As limitações são honestas? Se travar em algum ponto, é ali que o avaliador também vai travar.

### Passo 3 — Comparar o post com a evidência real

Coloque o rascunho do post ao lado do README e da release. Cada afirmação do post tem prova no repositório? "Formulário funcional" — ele simula ou envia de verdade? "API" — existe API ou é mock? Toda promessa sem prova precisa ser reescrita. Este é o passo que pega o INC-V01-023.

### Passo 4 — Conferir a tag

`git tag` lista as tags criadas. Confirme que `v0.1.0-intrastack-basic` existe, que foi enviada para o remoto (`git push origin v0.1.0-intrastack-basic`), e que a release no GitHub aponta para ela.

### Passo 5 — Reler o changelog em voz alta

Ler em voz alta expõe o exagero que o olho deixa passar. Se alguma linha soa como propaganda ("solução completa", "pronto para produção"), reescreva para descrever o que realmente foi feito.

## Code Review do Mestre Py

O Mestre Py revisaria o fechamento do volume com estas perguntas:

**Aprovaria sem comentário:**
- Release `v0.1.0-intrastack-basic` criada, com todos os links testados em aba anônima.
- Changelog honesto, descrevendo o que foi construído e as limitações.
- README final com problema, solução, stack, como rodar, prints, limitações e próximo passo.
- Post de fechamento proporcional, com cada afirmação confirmada pelo repositório.
- Rótulo "Estudo / Fundamentos" e ponte leve para o V02.

**Pediria ajuste:**
- Post otimista demais: "Você construiu algo bom de verdade. Mas 'pronto para produção' não é verdade. Descreve o que é: demo de estudo. Fica mais forte, não mais fraco."
- README sem retrospectiva: "Fecha a história. De onde você saiu, onde chegou. Quem lê quer entender a jornada."
- Próximo passo vago demais ou prometendo demais: "Uma frase. Para onde vai, sem prometer que já chegou."

**Reprovaria:**
- Link de demo na release com 404. "Você cometeu de novo o erro do C12, no lugar mais visível da entrega. Abre todo link de fora antes de fechar."
- Post chamando o projeto de "produção", "sistema" ou "API". "Isso o repositório desmente em dez segundos. Não vale o risco."
- Tag `v1.0.0` ou rótulo "versão final de produção" num projeto de fundamentos.
- Qualquer segredo, dado real ou print sensível na release ou no post.

**Resumo do Code Review:** "Fechar bem é a habilidade mais subestimada de quem está começando. Não infle: o projeto não é produção, e dizer que é só prejudica você. Não encolha: você construiu uma base real, do terminal ao deploy verificado, e isso merece ser mostrado. O ponto certo é descrever exatamente o que é — demo estática de estudo, reproduzível, honesta. Marque a versão com um número honesto (`v0.1.0`), abra todos os links de fora antes de fechar, e aponte o próximo passo como convite, não como promessa. Release boa é aquela que outra pessoa consegue conferir. Tag não é o fim; o fim é quando o link da tag funciona."

## Mãos à Obra

Execute as tarefas na ordem. Nenhuma envolve escrever código novo — só fechar, marcar e contar.

---

**Tarefa 1 — Rodar o checklist final**

Reabra `docs/publication-checklist.md` (do C12) e percorra-o inteiro. Confirme: link verificado, CSS e imagens carregando, README completo, nenhum segredo publicado. Corrija o que não passar **antes** de marcar a versão.

---

**Tarefa 2 — Escrever o `CHANGELOG.md`**

Crie o `CHANGELOG.md` na raiz do projeto com o conteúdo da seção anterior. Descreva o que foi construído (C01–C12) e as limitações. Sem exagero, sem capacidade inventada.

---

**Tarefa 3 — Revisar o README final**

Releia o README como avaliador externo. Garanta: problema, solução, stack, como rodar, screenshots, diagrama, limitações, próximo passo. Adicione uma breve retrospectiva (do terminal ao deploy estático), se ainda não houver.

---

**Tarefa 4 — Preparar o post de fechamento**

Escreva o post (próxima seção) e salve em `assets/linkedin/post-fechamento-v01.md`, com a imagem/diagrama que vai acompanhá-lo. Compare cada afirmação do post com o repositório (Passo 3 do debugging). Este é o post real — publique quando quiser.

---

**Tarefa 5 — Atualizar o diário técnico (entrada final do V01)**

```markdown
## [DATA] — C13: fechamento do Volume 1

Fechei o IntraStack básico. Meu primeiro rascunho de post chamava o projeto de
"pronto para produção" — não é: é uma demo estática de estudo. Reescrevi para
descrever o que realmente construí. Criei a release v0.1.0-intrastack-basic e quase
publiquei com um link de demo quebrado (404) no changelog; abri todos os links de
fora antes de fechar. Aprendi que fechar bem é nem inflar nem encolher: descrever
exatamente o que é. Do terminal ao deploy verificado, do zero a um projeto que outra
pessoa consegue conferir. Próximo passo: transformar essa base em app frontend
profissional no V02.
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 6 — Revisar o diff e commitar o fechamento**

```bash
git add CHANGELOG.md README.md assets/linkedin/ docs/diario-tecnico.md docs/publication-checklist.md
git diff --cached
git commit -m "docs(release): close V01 with changelog, final README and LinkedIn post"
```

(Se `docs/publication-checklist.md` não mudou, ele simplesmente não entra no commit. O ponto é revisar tudo que vai ficar público — a última revisão de segurança do C11, agora também sobre o post e os assets de LinkedIn.)

---

**Tarefa 7 — Criar a tag/release**

```bash
git status                       # confirme que o commit final está feito e a árvore está limpa
git tag v0.1.0-intrastack-basic
git push origin v0.1.0-intrastack-basic
```

No GitHub, crie a release a partir da tag, cole o changelog nas notas e adicione o link de demo **testado em aba anônima** (ou o link do README com a instrução local). A tag deve apontar para o commit criado na Tarefa 6.

---

**Tarefa 8 — Abrir todos os links da release, de fora**

Em aba anônima, abra cada link da release: demo, README, downloads. Qualquer 404, corrija a URL e atualize a release. Só considere o volume fechado quando todos abrirem.

## Critérios de aceitação

- [ ] A release/tag `v0.1.0-intrastack-basic` existe (ou está preparada) e aponta para o estado final da entrega.
- [ ] `CHANGELOG.md` criado, honesto, com o que foi construído e as limitações.
- [ ] README final completo para o V01: problema, solução, stack, como rodar, prints, diagrama, limitações, próximo passo.
- [ ] Commit de fechamento realizado antes da tag/release.
- [ ] Todos os links da release foram abertos em aba anônima e funcionam (nenhum 404).
- [ ] Post de fechamento é proporcional: cada afirmação tem correspondência no repositório.
- [ ] Limitações e próximos passos estão claros; a ponte para o V02 não antecipa conteúdo.
- [ ] Nenhum segredo, dado real ou print sensível na release, no changelog ou no post.
- [ ] A tag aponta para o commit final do V01, não para um estado anterior.

## Checklist de segurança

- [ ] `git diff --cached` revisado antes do push (nenhum segredo, `.env` ou dado real — incluindo os assets de LinkedIn).
- [ ] Nenhum link público da release ou do post expõe arquivo, sistema ou dado que não deveria estar lá.
- [ ] Nenhum print ou imagem do post mostra e-mail real, token ou tela interna.
- [ ] Sem promessa de segurança, produção ou disponibilidade no changelog, na release ou no post.

## Entrega de portfólio

### Entregas obrigatórias do C13

1. `CHANGELOG.md` honesto.
2. README final revisado, com retrospectiva e próximo passo.
3. Post de fechamento em `assets/linkedin/post-fechamento-v01.md`.
4. Entrada final no `docs/diario-tecnico.md`.
5. Commit de fechamento do volume.
6. Release/tag `v0.1.0-intrastack-basic` apontando para o commit final, com todos os links testados.

### Screenshots ou diagramas esperados

A imagem ou diagrama que acompanha o post de LinkedIn, usando **evidências reais** já reunidas no C12 (home desktop/mobile, formulário, diagrama request/response). Nada novo precisa ser criado — só selecionado e conferido.

### Evidências esperadas

A release pública (ou preparada) com changelog, e o checklist final aplicado sobre todos os links.

### Limitações que devem aparecer

- Projeto de fundamentos; sem produção real.
- Sem backend, sem autenticação, sem banco de dados.
- Sem escala, sem Docker, sem CI/CD, sem SLA.
- Demo estática de estudo.

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Diferente dos capítulos anteriores, este é o post **real** de fechamento. O Volume 1 está concluído — você pode publicá-lo quando quiser. A única regra é a de sempre: proporcional, com limitação e próximo passo.*

---

**Gancho honesto:** "Fechei meu primeiro projeto de fundamentos com uma entrega pequena, reproduzível e honesta."

**Contexto:** Construí o IntraStack Básico, um portal de onboarding fictício e estático, do zero — começando sem saber criar uma pasta pelo terminal.

**A jornada:** Do terminal e do Git (C01–C05) ao HTML semântico, CSS responsivo, JavaScript, dados mockados e formulário validado (C06–C10). Depois revisão de segurança (C11) e publicação estática verificável (C12). Agora, release `v0.1.0` e fechamento.

**O que aprendi de mais valioso:** não foi uma tecnologia específica — foi a diferença entre "funciona na minha máquina" e uma entrega que **outra pessoa consegue conferir**. E a fechar com honestidade: descrever exatamente o que o projeto é, nem inflando nem encolhendo.

**Limitação honesta:** É **estudo / fundamentos**. Demo estática — sem backend, banco, autenticação, Docker ou CI/CD. Não é produção.

**Próximo passo:** transformar essa base em uma aplicação frontend profissional no Volume 2, com React, Next.js e TypeScript.

**Links:** [repositório] · [release v0.1.0-intrastack-basic] · [demo testada em aba anônima, se houver]

---

## Perguntas de revisão

1. O capítulo define fechamento profissional como a combinação de quatro coisas. Quais são, e o que acontece com o fechamento quando uma delas falta?

2. Por que a tag escolhida é `v0.1.0-intrastack-basic` e não `v1.0.0`? O que o número da versão comunica sobre a maturidade do projeto?

3. O INC-V01-024 trata de uma release com link quebrado. Por que esse erro é especialmente grave no fechamento, e qual passo do debugging guiado o previne?

4. O capítulo diz que honestidade no fechamento tem dois lados: "não inflar" e "não encolher". O que significa "encolher" uma entrega, e por que isso também é desonesto?

5. Qual a diferença, na prática, entre uma ponte para o V02 que é "convite" e uma que é "promessa"? Dê um exemplo de cada.

6. Antes de criar a tag, o capítulo manda rodar o checklist final. Por que a ordem (checklist → tag) importa? O que acontece se você marcar a versão antes de revisar?

7. Compare o Trecho A e o Trecho B do "Exemplo antes do conceito". Liste três afirmações do Trecho A que o repositório desmentiria, e como o Trecho B as corrige.

## Próximo passo

Este é o fim do Volume 1. Você fechou o IntraStack básico do jeito certo: uma release marcada (`v0.1.0-intrastack-basic`), um changelog honesto, um README que conta a jornada inteira, e um post proporcional — sem inflar, sem encolher, descrevendo exatamente o que o projeto é.

Vale parar e olhar para trás. Você entrou no V01 sem saber criar uma pasta pelo terminal. Sai com um projeto versionado no Git, com HTML semântico, CSS responsivo, interação em JavaScript, dados tratados com cuidado, um formulário honesto, uma revisão de segurança, um deploy verificável e uma release marcada. Mais do que cada tecnologia, você aprendeu a trabalhar com método: escopo antes de código, evidência antes de anúncio, honestidade antes de exagero. Essa é a base que sustenta tudo o que vem.

O **Volume 2** pega exatamente este IntraStack e o transforma em uma aplicação frontend profissional — onde o HTML e o CSS escritos à mão dão lugar a componentes em React, a interação manual em JavaScript vira estado gerenciado, e o TypeScript entra para deixar o código mais seguro. A base honesta que você construiu aqui é o ponto de partida.

Por agora, o trabalho está fechado, marcado e verificável. É exatamente assim que se encerra uma primeira entrega.
