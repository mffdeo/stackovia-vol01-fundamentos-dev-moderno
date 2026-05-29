---
title: "Capítulo 12 — Publicação estática e checklist de portfólio"
status: Preview
volume: 1
capitulo: 12
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 12 — Publicação estática e checklist de portfólio

## Abertura

O IntraStack estava completo e revisado. HTML semântico, CSS responsivo, interação, dados mockados, formulário honesto, e a revisão de segurança do C11 — nenhum segredo a caminho do repositório. Você publicou a pasta numa plataforma de hosting estático, copiou o link e mandou para o Mestre Py com um "tá no ar".

A resposta veio em segundos, e não era um elogio:

"Abri o link. A página carregou… sem nenhum estilo. Texto cru, empilhado, e duas imagens quebradas com aquele ícone de foto rasgada. No seu print estava lindo. No link que você me mandou, está quebrado. Você testou esse link, ou só testou na sua máquina?"

Você abriu o link num navegador anônimo, fora do seu ambiente. Ele estava certo. O CSS não tinha carregado, os screenshots da home não apareciam. Localmente, tudo perfeito; no ar, um esqueleto.

"Isso aqui", disse o Mestre Py, "é a diferença entre 'subir arquivos' e 'publicar'. Deploy não termina quando o upload acaba. Termina quando você abre o link, de fora, e confirma que funciona. Um link de portfólio que leva para uma demo quebrada é pior do que não ter link nenhum — ele mostra que você não verificou. Vamos consertar, e vamos criar um checklist pra isso nunca mais te pegar de surpresa."

Este capítulo torna a entrega do IntraStack **verificável por outra pessoa** — que é o que transforma um projeto em portfólio.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Tornar a entrega verificável por outra pessoa (C12) |
| Tarefa | Preparar a publicação estática (ou execução local reproduzível), conferir assets e link, e fechar o checklist de portfólio |
| Definição de pronto | Link público funcionando (ou instrução local clara), README com prints e limitações, e `docs/publication-checklist.md` preenchido |

O tamanho desta sprint é o de um capítulo. Cada leitor avança no próprio ritmo; o que importa é que, no fim, **alguém que não é você** consiga abrir, entender e verificar a entrega — com o estilo carregando, os assets no lugar e a evidência à mão.

## Problema de negócio

Um projeto que só funciona na sua máquina não é portfólio — é uma promessa não verificável. Portfólio tem valor quando outra pessoa (um recrutador, um colega, um futuro empregador) consegue, em poucos minutos, abrir a entrega, entender o que ela faz e confirmar que funciona.

Dois custos práticos quando isso falha:

1. **Link quebrado custa mais que link ausente.** Uma demo que abre sem CSS ou com imagens quebradas comunica o oposto do que você queria: "esta pessoa não testou o próprio trabalho". É uma impressão difícil de reverter.
2. **Evidência improvisada não convence.** Um post ou README sem prints, sem diagrama, sem nada verificável depende de o leitor acreditar na sua palavra. Evidência (screenshots, diagrama, link testado) é o que torna a entrega concreta.

Este capítulo fecha esses dois pontos: publicar de forma que funcione fora da sua máquina, e reunir a evidência que faltava — com honestidade sobre o que é (uma demo estática de estudo) e o que não é (produção).

## O que será construído neste capítulo

Ao final deste capítulo, o IntraStack básico terá:

- A entrega **verificável**: ou um link público de hosting estático que funciona fora da sua máquina, ou — se você não puder/quiser publicar — uma instrução local reproduzível que qualquer pessoa consegue seguir.
- Os caminhos de assets conferidos, de modo que CSS e imagens carreguem no ambiente publicado, não só no local.
- Um `README.md` final com as seções completas: problema, solução, stack, como rodar, screenshots, diagrama, limitações e próximos passos.
- Os screenshots reais (`assets/screenshots/home-desktop.png`, `home-mobile.png` e do formulário) e o diagrama (`diagrams/request-response.md`) no lugar.
- `docs/publication-checklist.md` — o checklist de publicação que você vai poder reusar em todo projeto futuro.
- Entrada no diário técnico.
- Commit `docs(publish): add publication checklist and final README`.

O que **não** entra: deploy full stack, Docker, AWS, CI/CD, DNS próprio, monitoramento, rollback profissional. Nada de cloud ou pipeline. A publicação aqui é **estática e opcional** — e o capítulo sempre oferece o caminho local para quem não tem conta em plataforma de hosting. Deploy de verdade, com infraestrutura, é trilha do V06 em diante.

## Cena/tensão de abertura

Antes de consertar, entenda por que o link quebrou. No seu projeto, o HTML carregava o CSS assim:

```html
<link rel="stylesheet" href="/src/styles.css">
```

Localmente, abrindo a partir da pasta certa, esse caminho **absoluto** (começando com `/`) resolvia. Mas no hosting, a base do site era diferente — o site ficou publicado em `usuario.github.io/intrastack/`, não na raiz `usuario.github.io/`. Aí o navegador foi buscar o CSS em `usuario.github.io/src/styles.css` (a partir da raiz do domínio), e não em `usuario.github.io/intrastack/src/styles.css`. Resultado: **404 no CSS**, página sem estilo. As imagens, com o mesmo tipo de caminho absoluto, quebraram igual.

É o INC-V01-021: o site abre localmente, mas no link público o CSS e as imagens não carregam, porque os **caminhos** não batem com a base onde o site foi publicado.

A correção é a mesma lição do C03, agora num contexto novo: usar **caminhos relativos** que funcionam independente da base. E, mais importante que a correção pontual, o hábito que o Mestre Py cobrou: **abrir o link publicado, de fora, e verificar** — antes de chamar de "no ar". É o que o checklist deste capítulo garante.

## Exemplo antes do conceito

Duas formas de entregar o mesmo projeto, uma comparação. As duas "estão prontas"; só uma é verificável por outra pessoa.

**Trecho A — "funciona na minha máquina":**

> "Terminei o IntraStack! Ficou ótimo. Print abaixo."
>
> (post com um screenshot, sem link, ou com um link que abre uma página sem estilo)

Quem lê não tem como confirmar nada. O print pode ser de qualquer coisa; o link, se existe, está quebrado. A entrega depende de confiança, não de evidência.

**Trecho B — entrega verificável:**

> "IntraStack Básico — portal de onboarding estático (projeto de estudo).
>
> 🔗 Demo: `https://usuario.github.io/intrastack/` (testado em aba anônima)
> 📦 Código: `github.com/usuario/intrastack` (README com como rodar, prints e limitações)
>
> Stack: HTML semântico, CSS responsivo, JS sem framework, dados mockados.
> Limitações: sem backend, sem banco; é uma demo estática de fundamentos."

A diferença não é marketing — é **verificabilidade**:

- O link foi **testado fora do ambiente do autor** (aba anônima) e funciona.
- O README deixa qualquer pessoa rodar e entender, com prints e limitações.
- A honestidade está explícita: é uma demo estática de estudo, não produção.

Quem recebe o Trecho B consegue, em dois minutos, abrir, ver funcionando e julgar o trabalho pelo que ele é. Agora vamos nomear os conceitos.

## Conceitos essenciais

### Conceito-chave 1 — Publicar é tornar verificável, não só subir arquivos

A definição que orienta o capítulo: **publicar** não é o ato de fazer upload — é o estado em que outra pessoa consegue abrir, entender e confirmar a entrega. Upload é meio; verificabilidade é o objetivo.

Por isso "deploy não termina quando o upload acaba; termina quando o link é verificado". Subir os arquivos e nunca abrir o link de fora é como enviar uma carta sem conferir o endereço: você fez o gesto, mas não garantiu a chegada.

No V01, isso se traduz em duas exigências simples: o link público funciona fora da sua máquina, **ou** a instrução local permite que qualquer pessoa reproduza a entrega.

### Conceito-chave 2 — Hosting estático: o que é e o que não é

Um **hosting estático** entrega arquivos prontos (HTML, CSS, JS, imagens) exatamente como estão, sem executar nada do lado do servidor. É o tipo de publicação adequado ao IntraStack, que é 100% estático.

O que ele **é**: simples, gratuito em várias plataformas, suficiente para mostrar um projeto de frontend.

O que ele **não é**: produção. Não há backend rodando, não há banco, não há lógica de servidor, não há SLA. Um hosting estático serve o `index.html` e os assets — nada além disso. Confundir isso com "coloquei em produção" é o tipo de exagero que o C11 já alertou.

> **Caminho local (sempre disponível):** se você não tem conta em nenhuma plataforma de hosting, ou prefere não publicar agora, a entrega continua válida. Basta o README explicar como rodar localmente (servir a pasta `src/` com `python3 -m http.server`, como no C09) e incluir os prints. O checklist deste capítulo funciona nos dois caminhos.

### Conceito-chave 3 — Caminhos relativos vs absolutos no deploy (INC-V01-021)

Esta é a causa técnica mais comum de "funciona local, quebra no ar". Recapitulando o C03, agora no contexto de publicação:

- **Caminho absoluto** (`/src/styles.css`): começa na **raiz do domínio**. Se o site está publicado num subcaminho (`usuario.github.io/intrastack/`), o `/src/...` aponta para `usuario.github.io/src/...` — fora do seu projeto. Quebra.
- **Caminho relativo** (`styles.css` ou `./styles.css`): começa a partir **da página atual**. Funciona independente de o site estar na raiz ou num subcaminho.

A regra para o V01: **prefira caminhos relativos** para CSS, JS e qualquer imagem que a página realmente exiba. Se o `index.html` está em `src/` junto com `styles.css` e `app.js`, os caminhos são simplesmente `styles.css` e `app.js` — e é a pasta `src/` que você publica/serve.

Um cuidado relacionado: os **screenshots** em `assets/screenshots/` são evidência de portfólio **referenciada no README** (a partir da raiz do projeto, como `assets/screenshots/home-desktop.png`), e aparecem na página do repositório no GitHub. Eles **não** são embutidos na home nem precisam estar no site publicado — `assets/` é irmão de `src/`, então uma página em `src/` que tentasse `../assets/...` apontaria para fora da pasta publicada e quebraria no deploy. Mantenha os prints como evidência do README, não como conteúdo da página.

Caminho relativo é o que sobrevive à mudança de base entre a sua máquina e o hosting.

### Conceito-chave 4 — Verificar fora do seu ambiente

O erro da abertura não foi só o caminho — foi não ter **testado fora**. Localmente, com cache do navegador e arquivos na máquina, tudo carrega. O ambiente publicado é diferente: base distinta, sem os seus arquivos locais, sem o seu cache.

A verificação honesta de um deploy estático:

1. Abra o link público numa **aba anônima** (sem cache, sem login) — ou em outro navegador/dispositivo.
2. Confira que o **CSS carregou** (a página tem estilo).
3. Confira que as **imagens aparecem** (sem ícone de foto quebrada).
4. **Clique nos links e teste a interação** — o botão do C08, o formulário do C10.
5. Abra o **DevTools → Network** e procure por requisições com status **404** (vermelho): cada 404 é um asset que não subiu ou tem caminho errado.

Só depois desses cinco passos o link pode ser chamado de "no ar".

### Conceito-chave 5 — Evidência de portfólio não se improvisa (INC-V01-022)

O INC-V01-022 é deixar o portfólio para o último minuto: na hora de postar, faltam print, diagrama, release. O post acaba dependendo de texto genérico, e um projeto correto **parece** pouco verificável.

A evidência mínima do IntraStack, que você foi construindo ao longo do volume:

- **Screenshots:** home no desktop e no mobile (C07), e o formulário com erro e sucesso (C10).
- **Diagrama:** o fluxo request/response (C02, atualizado no C09).
- **README:** problema, solução, stack, como rodar, limitações.
- **Link ou instrução local** verificável.

A lição do Mestre Py: "Evidência não se improvisa no último minuto." Ela se acumula a cada capítulo — e este capítulo só reúne e confere o que já existe.

### Conceito-chave 6 — Honestidade na publicação

Mesma régua dos capítulos anteriores, agora no ato de mostrar o trabalho. Ao publicar e postar, não:

- chame uma demo estática de "em produção" ou "no ar para usuários";
- coloque um badge de "build passing", "100% coverage" ou "deploy" que você não tem;
- prometa disponibilidade ("sempre online", "alta disponibilidade") que um hosting estático gratuito não garante.

Descreva o que é: uma **demo estática de um projeto de estudo de fundamentos**, com link verificável e limitações declaradas. Isso é mais forte num portfólio do que qualquer exagero — porque é verdade, e quem entende percebe a diferença.

## Construindo a publicação em etapas

A publicação acontece em quatro etapas. A primeira conserta os caminhos; as duas seguintes publicam e verificam; a última reúne a evidência.

```text
local  ->  caminhos relativos  ->  repo  ->  hosting estático (opcional)  ->  checklist  ->  link verificável
```

### Etapa 1 — Conferir e relativizar os caminhos

No `src/index.html`, garanta que CSS, JS e imagens usam caminhos **relativos**:

```html
<!-- relativo: funciona local e em subcaminho de hosting -->
<link rel="stylesheet" href="styles.css">
<script src="app.js" defer></script>
```

Se você encontrar caminhos começando com `/` (absolutos), troque por relativos. Esse único ajuste resolve a maior parte dos "quebrou no ar". (Os screenshots não entram aqui: eles são evidência do README, não conteúdo da home — ver Conceito-chave 3.)

### Etapa 2 — Publicar (opcional) ou preparar o caminho local

**Se for publicar:** use uma plataforma de hosting estático simples (por exemplo, GitHub Pages a partir do repositório, ou outra de sua preferência). O fluxo geral: apontar a plataforma para a pasta que contém o `index.html`, publicar, e anotar a URL gerada.

**Se não for publicar:** documente no README como rodar localmente:

```markdown
## Como rodar localmente

1. Clone o repositório.
2. Entre na pasta `src/`.
3. Sirva os arquivos: `python3 -m http.server 8000`
4. Abra `http://localhost:8000` no navegador.
```

Os dois caminhos são entregas válidas. O que não vale é um link que você nunca testou.

### Etapa 3 — Verificar fora do seu ambiente

Aplique os cinco passos do Conceito-chave 4: aba anônima, CSS, imagens, interação, Network sem 404. Se publicou, teste o link público; se optou pelo local, peça a alguém (ou use outro dispositivo) para seguir a instrução de execução local e confirmar que funciona.

### Etapa 4 — Reunir a evidência e criar o checklist

Confira que os screenshots e o diagrama estão no repositório e referenciados no README. Depois crie o `docs/publication-checklist.md` (próxima seção) e percorra-o inteiro antes de considerar a entrega publicada.

## docs/publication-checklist.md

Este é o entregável reutilizável do capítulo: um checklist que serve para o IntraStack e para qualquer projeto futuro.

```markdown
# Checklist de publicação — IntraStack básico (V01)

## Caminhos e assets
- [ ] CSS, JS e imagens usam caminhos relativos (não começam com `/`).
- [ ] CSS carrega no ambiente publicado (página tem estilo).
- [ ] Todas as imagens aparecem (sem ícone quebrado).

## Verificação fora do ambiente local
- [ ] Link público aberto em aba anônima (ou a instrução local foi reproduzida por outra pessoa/dispositivo).
- [ ] Interação testada no ar: botão (C08) e formulário (C10) funcionam.
- [ ] DevTools → Network sem requisições 404.

## README e evidência
- [ ] README tem: problema, solução, stack, como rodar, screenshots, diagrama, limitações, próximos passos.
- [ ] Screenshots presentes: home desktop, home mobile, formulário (erro e sucesso).
- [ ] Diagrama request/response presente.
- [ ] Link de demo (se houver) ou instrução local clara.

## Segurança e honestidade (do C11)
- [ ] Nenhum segredo, `.env` ou dado real foi publicado (`git diff` revisado).
- [ ] Nenhum screenshot expõe dado sensível.
- [ ] Sem badge falso (build/coverage/deploy que não existe).
- [ ] Sem promessa de produção, "no ar para usuários" ou alta disponibilidade.

## Maturidade
- [ ] Rótulo "Estudo / Fundamentos" presente.
- [ ] Limitações declaradas (sem backend, banco, Docker, CI/CD, SLA).
```

A seção "Segurança e honestidade" reaproveita o trabalho do C11: a publicação é o último ponto onde um segredo poderia escapar, então a revisão entra no checklist.

## O que pode dar errado?

### 1. CSS/imagens não carregam no link público (INC-V01-021)

Funciona local, quebra no ar: a causa quase sempre é caminho absoluto (`/src/...`) que não bate com a base do hosting.

**Como evitar:** caminhos relativos; verificar em aba anônima; DevTools → Network para caçar 404.

### 2. Link de demo retorna 404

O link aponta para um endereço que não existe — pasta errada publicada, ou URL copiada errada.

**Como evitar:** abra o link você mesmo, de fora, antes de divulgar. Se a plataforma publica um subcaminho, confirme a URL completa.

### 3. README não explica como rodar

Quem clona não sabe por onde começar. O projeto correto parece inacessível.

**Como evitar:** a seção "Como rodar" com passos numerados, testada por você do zero (ou por outra pessoa).

### 4. Print desatualizado ou ausente (INC-V01-022)

O screenshot mostra uma versão antiga, ou não existe. A evidência não corresponde ao que está no ar.

**Como evitar:** recapture os prints da versão final, antes de postar. Evidência não se improvisa.

### 5. Segredo ou dado sensível publicado junto

Na pressa de publicar, um arquivo que não deveria subir vai junto (revisão do C11).

**Como evitar:** `git diff` antes do push; checklist de segurança incluído na publicação.

## Debugging guiado

### Passo 1 — Abrir o link em aba anônima

Abra o link público numa janela anônima (sem cache nem login). É a forma mais próxima de ver o que outra pessoa vê. Se a página aparece sem estilo, vá ao Passo 2.

### Passo 2 — Network: caçar os 404

Abra DevTools → aba **Network** e recarregue. Procure linhas em vermelho (status 404):

- `styles.css` com 404 → caminho do CSS errado para a base do hosting.
- `home-desktop.png` com 404 → caminho da imagem errado, ou o arquivo não subiu.

Clique na linha 404 e veja a **Request URL**: ela mostra onde o navegador procurou. Compare com onde o arquivo realmente está.

### Passo 3 — Comparar a URL pedida com a base do site

Se o site está em `usuario.github.io/intrastack/` mas o CSS foi pedido em `usuario.github.io/styles.css`, o caminho era absoluto. Troque por relativo (`styles.css`) e publique de novo.

### Passo 4 — Confirmar que os assets subiram

Na aba Files do repositório/hosting, confirme que `styles.css`, `app.js`, os screenshots e os dados (`data/equipe.json`) estão lá. Um arquivo que não subiu dá 404 mesmo com o caminho certo.

### Passo 5 — Reverificar tudo após o ajuste

Depois de qualquer correção, **recomece a verificação do zero** em aba anônima: CSS, imagens, interação, Network limpo. Deploy só está pronto quando essa passada inteira está verde.

## Code Review do Mestre Py

O Mestre Py revisaria o link e o repositório com estas perguntas:

**Aprovaria sem comentário:**
- Link público testado em aba anônima, com CSS e imagens carregando.
- Caminhos relativos em todo o HTML.
- README com problema, solução, stack, como rodar, prints, diagrama, limitações.
- Screenshots e diagrama presentes e atualizados.
- Checklist de publicação preenchido, incluindo a parte de segurança.
- Rótulo "Estudo / Fundamentos" e limitações declaradas.

**Pediria ajuste:**
- Link não testado de fora: "Você abriu isso em aba anônima? Não? Então você não sabe se funciona. Testa antes de me mandar."
- README sem "como rodar": "Eu cloneei e não sei o que fazer. Põe os passos."
- Print desatualizado: "Esse print é da versão antiga. Recaptura."

**Reprovaria:**
- Link de portfólio que abre demo quebrada (sem CSS / com imagem 404).
- Badge de build/deploy/coverage que não existe.
- Post ou README chamando a demo estática de "produção" ou prometendo disponibilidade.
- Qualquer segredo ou dado sensível publicado.

**Resumo do Code Review:** "Publicar é tornar verificável, não subir arquivo. Abre o link de fora, em aba anônima, e confirma: estilo carrega, imagem aparece, botão e formulário funcionam, Network sem 404. README que deixa qualquer um rodar, evidência que já existia desde os capítulos anteriores, e honestidade sobre ser uma demo de estudo. Link de portfólio quebrado é pior que link nenhum — ele prova que você não verificou. Deploy termina quando o link é verificado, não quando o upload acaba."

## Mãos à Obra

Execute as tarefas na ordem.

---

**Tarefa 1 — Relativizar os caminhos**

No `src/index.html`, confira CSS, JS e qualquer imagem que a página exiba. Troque qualquer caminho absoluto (`/...`) por relativo (`styles.css`, `app.js`). (Os screenshots ficam no README, não no HTML — Conceito-chave 3.)

---

**Tarefa 2 — Escolher o caminho de entrega**

Decida: publicar em hosting estático **ou** documentar a execução local. Os dois são válidos. Se publicar, anote a URL gerada.

---

**Tarefa 3 — Verificar fora do ambiente**

Aba anônima (ou outro dispositivo). Confira: CSS carrega, imagens aparecem, botão (C08) e formulário (C10) funcionam, e DevTools → Network sem 404.

---

**Tarefa 4 — Conferir a evidência**

Garanta que estão no repositório e referenciados no README: `assets/screenshots/home-desktop.png`, `home-mobile.png`, um print do formulário, e `diagrams/request-response.md`. Recapture prints desatualizados.

---

**Tarefa 5 — Fechar o README final**

O README deve ter, em ordem: problema, solução, stack, como rodar, screenshots, diagrama, limitações e próximos passos. Exemplo de seção de limitações:

```markdown
## Limitações e maturidade

Projeto de **estudo / fundamentos**. É uma demo estática:

- Sem backend, banco de dados ou autenticação.
- Sem Docker, CI/CD, SLA ou monitoramento.
- Dados de equipe são mockados; o formulário não envia dados (simulação).
- Validação no cliente é orientação, não segurança.

Backend, deploy com infraestrutura e demais temas vêm nos próximos volumes da série.
```

---

**Tarefa 6 — Criar `docs/publication-checklist.md`**

Crie o arquivo com o checklist da seção anterior e percorra-o inteiro, marcando cada item. O que não passar, corrija antes de seguir.

---

**Tarefa 7 — Atualizar o diário técnico**

```markdown
## [DATA] — C12: publicação estática e checklist

Publiquei o IntraStack (ou documentei execução local). Meu primeiro link abriu sem
CSS e com imagens quebradas: os caminhos eram absolutos e não batiam com a base do
hosting. Troquei por caminhos relativos. Aprendi a verificar de fora (aba anônima,
Network sem 404) antes de chamar de "no ar". Reuni prints e diagrama (que já existiam
dos capítulos anteriores) e criei um checklist de publicação reutilizável. Deploy
termina quando o link é verificado, não quando o upload acaba.
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 8 — Commitar**

```bash
git add src/index.html README.md docs/publication-checklist.md docs/diario-tecnico.md
git add assets/screenshots/ diagrams/request-response.md
git commit -m "docs(publish): add publication checklist and final README"
```

(Antes do push, rode `git diff --cached` — última revisão de segurança do C11.)

## Critérios de aceitação

- [ ] CSS, JS e imagens usam caminhos relativos.
- [ ] A entrega é verificável: link público funcionando (testado em aba anônima) **ou** instrução local reproduzível.
- [ ] No ambiente de entrega, CSS carrega, imagens aparecem e a interação funciona.
- [ ] DevTools → Network sem requisições 404 no link público (se houver).
- [ ] README tem problema, solução, stack, como rodar, screenshots, diagrama, limitações e próximos passos.
- [ ] Screenshots (home desktop/mobile, formulário) e diagrama presentes e atualizados.
- [ ] `docs/publication-checklist.md` criado e percorrido.
- [ ] Nenhum segredo ou dado sensível publicado.
- [ ] Rótulo "Estudo / Fundamentos" e limitações claras; sem promessa de produção.
- [ ] Commit `docs(publish): add publication checklist and final README` realizado.

## Checklist de segurança

- [ ] `git diff --cached` revisado antes do push (nenhum segredo, `.env` ou dado real).
- [ ] Nenhum screenshot expõe e-mail real, token ou sistema interno.
- [ ] O link público foi revisado (não expõe arquivo que não deveria estar lá).
- [ ] Nenhuma promessa de produção, disponibilidade ou badge falso.

## Entrega de portfólio

### Entregas obrigatórias do C12

1. Entrega verificável: link público funcionando **ou** instrução local reproduzível.
2. `src/index.html` com caminhos relativos.
3. README final com todas as seções (problema → próximos passos).
4. Screenshots (home desktop/mobile, formulário) e `diagrams/request-response.md`.
5. `docs/publication-checklist.md` preenchido.
6. Entrada no `docs/diario-tecnico.md`.
7. Commit `docs(publish): add publication checklist and final README`.

### Screenshots ou diagramas esperados

Home desktop, home mobile, formulário (erro e sucesso) e o diagrama request/response. São a evidência que torna a entrega verificável — e a maioria já existe desde os capítulos anteriores.

### Evidências esperadas

O `docs/publication-checklist.md` preenchido e o smoke check do link (a verificação em aba anônima), registrados no diário ou no PR.

### Limitações que devem aparecer

- Publicação estática: sem backend, banco, autenticação, Docker, CI/CD, SLA ou monitoramento.
- É uma demo de estudo, não produção.
- Deploy com infraestrutura real vem nos volumes seguintes (V06+).

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Este esboco é para uso futuro, quando você quiser compartilhar o aprendizado. Não publique agora — o projeto fecha no C13.*

---

**Gancho:** "Meu primeiro link público só ficou pronto depois que eu testei fora da minha máquina — e descobri que estava quebrado."

**Contexto:** Estou construindo o IntraStack Básico, um portal de onboarding fictício, para aprender desenvolvimento web do zero.

**Problema:** Publiquei, mandei o link, e a página abriu sem CSS e com imagens quebradas. Localmente funcionava; no ar, não. A causa: caminhos absolutos que não batiam com a base do hosting.

**O que aprendi:** Publicar não é subir arquivo — é tornar a entrega verificável por outra pessoa. Caminhos relativos sobrevivem à mudança de base. E o hábito que vou levar: abrir o link em aba anônima e conferir CSS, imagens, interação e Network (sem 404) **antes** de chamar de "no ar". Deploy termina quando o link é verificado.

**Limitação honesta:** Demo estática de estudo — sem backend, banco, Docker ou CI/CD. Não é produção.

**Próximo passo:** C13 — fechar o release do volume, o post final e a ponte para o V02.

**Link:** [quando pronto: link da demo testado em aba anônima]

---

## Perguntas de revisão

1. O capítulo afirma que "publicar é tornar verificável, não só subir arquivos". O que essa distinção muda na prática, no momento de divulgar um projeto?

2. Por que um caminho absoluto (`/src/styles.css`) pode funcionar localmente e quebrar quando o site é publicado num subcaminho do hosting? Como o caminho relativo resolve isso?

3. Quais são os passos para verificar um deploy estático "de fora"? Por que a aba anônima é importante nessa verificação?

4. Na aba Network do DevTools, você vê `styles.css` com status 404. O que isso indica e quais são as duas causas possíveis?

5. O INC-V01-022 fala de evidência improvisada no último minuto. Que evidências do IntraStack já existiam desde capítulos anteriores, e por que reuni-las agora é diferente de criá-las do zero?

6. Por que um link de portfólio quebrado é descrito como "pior que link nenhum"? Que impressão ele passa?

7. Liste três coisas que, segundo o capítulo, você **não** deve afirmar ao publicar uma demo estática de estudo. Por quê?

## Próximo passo

O IntraStack agora é verificável: o link funciona fora da sua máquina (ou a instrução local permite que qualquer pessoa o rode), os assets carregam, a evidência está reunida e o checklist de publicação fica como ferramenta reutilizável. Mais do que publicar um projeto, você aprendeu a **não confiar no "funciona na minha máquina"** — a verificar de fora antes de divulgar.

Falta uma coisa: **fechar**. O **Capítulo 13** encerra o Volume 1 — o release do IntraStack (uma versão marcada, com notas do que foi construído), o post final de LinkedIn honesto, a retrospectiva do que você aprendeu do terminal ao deploy estático, e a ponte para o Volume 2, onde o frontend ganha React, Next.js e TypeScript.

Você entrou no V01 sem saber criar uma pasta pelo terminal. Sai com um projeto publicado e verificável. O próximo passo é transformar isso em base para ir muito além.
