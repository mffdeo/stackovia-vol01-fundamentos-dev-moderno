---
title: "Capítulo 09 — HTTP, request/response e dados mockados"
status: Preview
volume: 1
capitulo: 9
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 09 — HTTP, request/response e dados mockados

## Abertura

O IntraStack reagia a cliques (C08). O time gostou do botão de mostrar/ocultar e pediu o próximo passo: "Dá pra a página listar a equipe automaticamente, em vez de a gente editar o HTML toda vez que alguém entra ou sai?"

Você não tem backend — e nem deveria ter ainda. Mas dá para simular. Você criou um arquivo com a lista da equipe, escreveu um `fetch` para carregá-lo, montou a renderização e abriu a página com dois cliques no explorador de arquivos, como sempre fez.

A seção "Equipe" apareceu na tela. Vazia.

Nenhum nome. Nenhuma mensagem. Nenhum erro visível na página — só um espaço em branco onde deveria estar a lista. Você recarregou. Continuou vazio. O HTML do `fetch` estava lá, o arquivo de dados estava lá, e mesmo assim a tela não mostrava nada nem explicava por quê.

O Mestre Py, quando você mostrou, foi direto:

"Tela vazia sem mensagem é o pior tipo de bug: o usuário não sabe se está carregando, se deu erro ou se a equipe está mesmo vazia. Abre o Network e o Console. E me diz: como você abriu essa página?"

A última pergunta parecia fora de lugar. Mas era exatamente o centro do problema.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Simular dados sem criar backend (C09) |
| Tarefa | Carregar uma lista de equipe mockada com `fetch` e tratar carregamento, sucesso e erro |
| Definição de pronto | Os dados mockados carregam, há estado de erro visível, e o README declara honestamente que não existe API real |

O tamanho desta sprint é o de um capítulo. Cada leitor avança no próprio ritmo; o que importa é terminar com uma página que carrega dados, **trata a falha com uma mensagem** e não finge ter um backend que não existe.

## Problema de negócio

Um portal de onboarding que exige editar HTML à mão para cada mudança de equipe não escala nem para uma equipe pequena. O caminho natural é separar os **dados** (quem está na equipe) da **apresentação** (como a lista aparece). Em produção, isso é uma API. No V01, é um arquivo de dados mockado — e está tudo bem, desde que você seja honesto sobre o que ele é.

Há dois riscos aqui, e os dois são de credibilidade, não de sintaxe:

1. **Falha silenciosa.** Se o `fetch` falha e a página não diz nada, quem usa não sabe se o sistema quebrou ou se a lista está realmente vazia. Erro sem mensagem vira adivinhação.
2. **Promessa falsa.** Se o README descreve dados mockados como "dados da equipe em produção", o portfólio promete uma maturidade que o projeto não tem. Isso compromete a credibilidade no momento em que alguém olha de perto.

Este capítulo trata os dois: carregar dados de forma que a falha seja visível, e documentar a limitação sem exagero.

## O que será construído neste capítulo

Ao final deste capítulo, o IntraStack básico terá:

- `src/data/equipe.json` — um arquivo de dados mockado com integrantes fictícios.
- `src/app.js` ampliado: uma função que carrega o JSON com `fetch`, renderiza a lista em caso de sucesso e mostra uma mensagem em caso de erro — passando por três estados (carregando, sucesso, erro).
- `src/index.html` com uma região da equipe que começa em "carregando" e é preenchida pelo JavaScript.
- O diagrama `diagrams/request-response.md` atualizado com o fluxo `browser → fetch → JSON → renderização → fallback de erro`.
- Uma seção "Dados mockados" no `README.md` declarando que **não há API real** e que os dados são fictícios.
- Entrada no diário técnico.
- Commit `feat(js): load mocked team data`.

O que **não** entra: backend real, FastAPI, banco de dados, autenticação, CORS em profundidade, estado de servidor. Tudo isso vem do V03 em diante. Aqui você aprende request/response **no browser**, com dados que moram no próprio projeto — sem fingir que isso é produção.

## Cena/tensão de abertura

Antes de fazer funcionar, entenda por que a tela ficou vazia. Este era o `fetch` da primeira tentativa:

```js
// primeira tentativa — carrega, mas falha em silêncio
fetch("data/equipe.json")
  .then((resposta) => resposta.json())
  .then((equipe) => renderizarEquipe(equipe));
```

Dois problemas se combinaram para produzir a tela em branco.

**Problema 1 — a página foi aberta via `file://`.** Você abriu o `index.html` com dois cliques no explorador. O endereço na barra do navegador começa com `file:///...`. Por segurança, a maioria dos navegadores **bloqueia** `fetch` quando a página é servida por `file://` — a requisição falha antes mesmo de procurar o arquivo. No console, algo como:

```text
Access to fetch at 'file:///.../data/equipe.json' from origin 'null'
has been blocked by CORS policy
```

**Problema 2 — não há tratamento de erro.** Mesmo que o caminho estivesse certo, o código não tem nenhum `catch`. Quando a promessa do `fetch` falha, o erro vai para o console — e a função `renderizarEquipe` simplesmente nunca é chamada. A seção fica como estava: vazia, sem aviso.

Os dois juntos são o INC-V01-015: a lista fica vazia, o usuário não recebe nenhuma mensagem, e quem desenvolve não sabe onde olhar. A correção tem duas partes — abrir a página por um servidor (não `file://`) e tratar os três estados da requisição. É isso que o capítulo constrói.

## Exemplo antes do conceito

Dois carregamentos, uma comparação. Os dois buscam o mesmo arquivo; só um conta a verdade ao usuário quando algo dá errado.

**Trecho A — o carregamento que falha em silêncio:**

```js
fetch("data/equipe.json")
  .then((resposta) => resposta.json())
  .then((equipe) => renderizarEquipe(equipe));
```

Se tudo der certo, funciona. Mas se o arquivo não existe, ou o caminho está errado, ou a página foi aberta via `file://`, o resultado é uma tela vazia e um erro escondido no console. Quem usa a página não tem ideia do que aconteceu.

**Trecho B — o carregamento honesto:**

```js
async function carregarEquipe() {
  const lista = document.querySelector("#lista-equipe");
  lista.textContent = "Carregando equipe...";

  try {
    const resposta = await fetch("data/equipe.json");

    if (!resposta.ok) {
      throw new Error(`HTTP ${resposta.status}`);
    }

    const equipe = await resposta.json();
    renderizarEquipe(equipe);
  } catch (erro) {
    lista.textContent = "Não foi possível carregar a equipe. Tente novamente mais tarde.";
    console.error("Falha ao carregar equipe:", erro);
  }
}
```

As diferenças não são "mais código por enredo". Cada parte resolve um problema do Trecho A:

- A página começa dizendo **"Carregando equipe..."** — o usuário sabe que algo está em andamento.
- O `if (!resposta.ok)` checa o **status HTTP**. Um detalhe que pega quase todo iniciante: o `fetch` **não** considera um 404 ou 500 como erro. A promessa "dá certo" mesmo quando o servidor responde "não encontrei". Só checando `resposta.ok` você transforma um 404 em uma falha de verdade.
- O `try/catch` captura qualquer falha — rede fora, arquivo ausente, JSON inválido — e mostra uma **mensagem ao usuário**, além de registrar o detalhe técnico no console para você depurar.

O Trecho B trata os três estados que toda requisição tem: carregando, sucesso e erro. Agora vamos nomear os conceitos.

## Conceitos essenciais

### Conceito-chave 1 — Request e response: a conversa do C02, agora em código

No C02 você viu, no plano conceitual, como o navegador faz um pedido (request) e recebe uma resposta (response) com um status. Aqui isso vira código: `fetch` é a forma de o seu JavaScript fazer um request e receber um response, sem recarregar a página inteira.

A ideia central: a página já está aberta, e o JavaScript busca **só os dados** que faltam, em segundo plano. O usuário não vê uma página recarregar — vê a lista aparecer.

No V01, o "servidor" é o próprio projeto entregando um arquivo `.json`. O mecanismo de request/response é exatamente o mesmo que você usará contra uma API real no V03 — só muda quem responde.

### Conceito-chave 2 — `fetch` e a promessa

`fetch(url)` dispara a requisição e devolve uma **Promise** — um objeto que representa "uma resposta que vai chegar (ou falhar) no futuro". A requisição é assíncrona: o navegador não congela esperando; ele continua, e avisa quando a resposta chega.

Há duas formas de lidar com a Promise. A mais legível para o V01 é `async/await`:

```js
const resposta = await fetch("data/equipe.json");
```

`await` diz: "espere esta Promise resolver e me dê o resultado antes de continuar". Para usar `await`, a função precisa ser marcada como `async` — é o par que aparece em `async function carregarEquipe()`. Você vai usar `async/await` na menor dose útil; o objetivo não é dominar concorrência, é carregar um arquivo e ler a resposta de forma clara.

### Conceito-chave 3 — `resposta.ok` e o status: o erro que não é erro

Esta é a armadilha mais comum do `fetch`, e vale repetir: **uma resposta 404 ou 500 não rejeita a Promise.** Para o `fetch`, "o servidor respondeu" já é sucesso — mesmo que a resposta seja "não encontrei".

Por isso a checagem explícita:

```js
if (!resposta.ok) {
  throw new Error(`HTTP ${resposta.status}`);
}
```

- `resposta.status` é o número do status HTTP (200, 404, 500...) que você viu no C02.
- `resposta.ok` é um atalho: `true` para status na faixa 200–299, `false` para o resto.
- Se a resposta não está ok, você **lança** um erro com `throw`, que cai no `catch`.

Sem essa checagem, um 404 passaria batido e o código tentaria interpretar a página de erro como JSON — gerando um erro confuso mais adiante, longe da causa real.

### Conceito-chave 4 — JSON: o formato dos dados

JSON (JavaScript Object Notation) é um formato de texto para representar dados estruturados. É o que o `fetch` vai buscar e o que uma API real devolveria.

Um `equipe.json` simples:

```json
[
  { "nome": "Ana Silva (exemplo)", "papel": "Desenvolvimento backend" },
  { "nome": "Carlos Mendes (exemplo)", "papel": "Desenvolvimento frontend" },
  { "nome": "Mestre Py (exemplo)", "papel": "Mentoria técnica" }
]
```

Regras práticas que evitam o erro de "JSON inválido": chaves e textos sempre entre **aspas duplas** (não simples), **sem vírgula** depois do último item, e nada de comentários (JSON puro não aceita `//`). Um único erro de sintaxe faz o `resposta.json()` falhar inteiro — e cair no seu `catch`.

`await resposta.json()` lê o corpo da resposta e o converte de texto para um array/objeto JavaScript que você pode percorrer.

### Conceito-chave 5 — Os três estados de uma requisição

Toda busca de dados tem três estados, e uma interface honesta mostra cada um:

- **Carregando:** a requisição saiu, a resposta ainda não chegou. Mostre algo ("Carregando equipe...") para o usuário não achar que travou.
- **Sucesso:** os dados chegaram e foram renderizados.
- **Erro:** algo falhou. Mostre uma mensagem clara e acionável, não uma tela vazia.

O erro do Trecho A foi tratar só o estado de sucesso e assumir que ele sempre aconteceria. Software de verdade assume o contrário: a rede falha, o arquivo some, a resposta vem errada. Tratar o erro não é pessimismo — é a diferença entre um protótipo e algo confiável.

### Conceito-chave 6 — `file://` vs servidor local

A pergunta do Mestre Py — "como você abriu a página?" — aponta para a causa mais traiçoeira deste capítulo.

Abrir o `index.html` com dois cliques usa o protocolo `file://`. Para HTML e CSS, funciona. Mas o `fetch` é bloqueado em `file://` por segurança do navegador — ele trata cada arquivo local como uma origem isolada e recusa a requisição.

A solução no V01 é servir a pasta por um servidor estático simples. Se você tem Python instalado:

```bash
# na pasta src/ (onde está o index.html)
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador. Agora a página é servida por `http://`, e o `fetch` funciona.

Importante para o escopo do V01: isso **não** é criar um backend. O `http.server` só entrega os arquivos da pasta como estão — ele não tem lógica, banco nem API. É um servidor de arquivos estáticos, usado aqui só para evitar a armadilha do `file://`. Backend de verdade é assunto do V03.

### Conceito-chave 7 — Renderizar com cuidado: `textContent`, de novo

Para montar a lista na página, você vai criar elementos e preencher o texto deles. Mantenha o cuidado que começou no C08: os nomes e papéis vêm do JSON, então use `textContent`, não `innerHTML`.

```js
function renderizarEquipe(equipe) {
  const lista = document.querySelector("#lista-equipe");
  lista.textContent = "";              // limpa o "Carregando..."

  const ul = document.createElement("ul");

  equipe.forEach((pessoa) => {
    const li = document.createElement("li");
    li.textContent = `${pessoa.nome} — ${pessoa.papel}`;
    ul.appendChild(li);
  });

  lista.appendChild(ul);
}
```

Aqui os dados são fictícios e escritos por você, então o risco é baixo. Mas o hábito importa: no dia em que esses dados vierem de uma API alimentada por usuários, `textContent` é o que impede que um nome contendo `<script>` seja executado. Construir a lista com `createElement` + `textContent` é seguro por padrão.

## Construindo o carregamento em etapas

Você vai montar em quatro etapas, testando no navegador (servido por `http://`, não `file://`) depois de cada uma. O fluxo:

```text
Browser  ->  fetch("data/equipe.json")  ->  resposta (status)
   ->  resposta.ok?  --não-->  catch  ->  mensagem de erro na tela
   ->  resposta.json()  ->  renderizarEquipe()  ->  lista na tela
```

### Etapa 1 — Os dados mockados

Crie `src/data/equipe.json` com integrantes fictícios:

```json
[
  { "nome": "Ana Silva (exemplo)", "papel": "Desenvolvimento backend" },
  { "nome": "Carlos Mendes (exemplo)", "papel": "Desenvolvimento frontend" },
  { "nome": "Mestre Py (exemplo)", "papel": "Mentoria técnica" }
]
```

Todos os nomes são marcados como exemplo. Nada de e-mail, telefone, documento ou qualquer dado que pareça real — esses dados vão para um repositório público.

### Etapa 2 — A região da equipe no HTML

No `index.html`, a seção de equipe (que no C06 tinha uma lista fixa) agora tem um contêiner que o JavaScript vai preencher:

```html
<section id="equipe">
  <h2>Equipe</h2>
  <div id="lista-equipe">Carregando equipe...</div>
  <p><em>Dados fictícios para fins didáticos. Não há API real neste projeto.</em></p>
</section>
```

O texto inicial "Carregando equipe..." é o estado de carregamento já no HTML — se o JavaScript falhar em rodar, pelo menos não fica uma caixa vazia.

### Etapa 3 — O `fetch` com os três estados

No `src/app.js`, adicione a função `carregarEquipe` (o Trecho B) e a `renderizarEquipe` (a do Conceito-chave 7). Chame `carregarEquipe()` quando a página carregar:

```js
carregarEquipe();
```

Como o `<script>` já usa `defer` (do C08), ele roda depois que o HTML existe — então o `#lista-equipe` estará lá quando o código procurar por ele.

### Etapa 4 — Servir e testar os dois caminhos

Suba o servidor estático e abra por `http://`:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Teste o **sucesso**: a lista deve aparecer com os três integrantes. Depois teste o **erro** de propósito: renomeie temporariamente `equipe.json` para `equipe-x.json` e recarregue. A página deve mostrar "Não foi possível carregar a equipe...", e o console deve registrar o erro com o status. Desfaça a renomeação ao final.

## O que pode dar errado?

### 1. Abrir via `file://` (INC-V01-015)

O sintoma é o `fetch` falhando com erro de CORS/origem `null`, mesmo com o arquivo no lugar certo. A causa é abrir o `index.html` com dois cliques.

**Como evitar:** sirva a pasta com `python3 -m http.server` e acesse por `http://localhost:8000`. Se o `fetch` falha sem motivo aparente, a primeira pergunta é: o endereço começa com `file://` ou `http://`?

### 2. Caminho relativo errado

`fetch("data/equipe.json")` é relativo à página (à URL), não ao arquivo `app.js`. Se a estrutura de pastas não bate, o resultado é 404.

**Como evitar:** confira na aba Network qual URL o `fetch` realmente pediu e compare com onde o arquivo está. Lembre da lição de caminhos relativos do C03.

### 3. Não checar `resposta.ok`

Sem o `if (!resposta.ok)`, um 404 passa como se fosse sucesso, e o código tenta ler uma página de erro como JSON — gerando um erro confuso em `resposta.json()`, longe da causa real.

**Como evitar:** sempre cheque `resposta.ok` (ou `resposta.status`) antes de chamar `resposta.json()`.

### 4. JSON inválido

Uma vírgula a mais no fim, aspas simples no lugar de duplas, ou um comentário `//` fazem o `resposta.json()` falhar inteiro.

**Como evitar:** valide o JSON (o próprio navegador acusa no console; editores destacam o erro). Aspas duplas sempre, sem vírgula final, sem comentários.

### 5. Vender o mock como produção (INC-V01-016)

Escrever no README "lista da equipe em produção" ou "integração com dados reais" descreve uma maturidade que o projeto não tem. É o tipo de exagero que destrói credibilidade quando alguém abre o código e vê um `.json` estático.

**Como evitar:** declare explicitamente que os dados são mockados e que não há API real. Honestidade técnica é parte da entrega.

## Debugging guiado

### Passo 1 — Abrir o Console e ler o erro

Com a página aberta, pressione `F12` e vá na aba **Console**. Se o `fetch` falhou, o erro aparece ali. Leia a mensagem inteira:

- "blocked by CORS policy" + origem `null` → você está em `file://`. Vá para o Passo 2.
- `404 (Not Found)` → caminho errado ou arquivo ausente. Vá para o Passo 3.
- `Unexpected token ... in JSON` → o arquivo carregou, mas o JSON é inválido. Vá para o Passo 4.

### Passo 2 — Conferir o protocolo da página

Olhe a barra de endereço. Começa com `file://`? Então o `fetch` está bloqueado. Suba `python3 -m http.server 8000` na pasta `src/` (onde está o `index.html`) e acesse `http://localhost:8000`. Recarregue e teste de novo.

### Passo 3 — Inspecionar a aba Network

Abra a aba **Network** do DevTools e recarregue. Procure a linha de `equipe.json`:

- **Status 200** e a lista não aparece → o problema é na renderização, não no fetch. Confira o `#lista-equipe` e a `renderizarEquipe`.
- **Status 404** → clique na linha e veja a URL exata que foi pedida (coluna "Request URL"). Compare com a localização real do arquivo e corrija o caminho.

### Passo 4 — Validar o JSON

Se o erro é de parsing, abra o `equipe.json` e procure: aspas simples, vírgula após o último item, comentário, chave sem aspas. Corrija e recarregue. Em caso de dúvida, cole o conteúdo num validador de JSON.

### Passo 5 — Forçar o estado de erro

Com tudo funcionando, provoque o erro de propósito (renomeie o arquivo) e confirme que a **mensagem de erro aparece na tela**, não só no console. Esse é o teste que separa o Trecho A do Trecho B: o usuário precisa ser avisado. Desfaça a alteração depois.

## Code Review do Mestre Py

O Mestre Py leria o `carregarEquipe` e o README com estas perguntas:

**Aprovaria sem comentário:**
- `try/catch` cobrindo a requisição inteira.
- Checagem de `resposta.ok` antes de `resposta.json()`.
- Os três estados visíveis: carregando, sucesso e erro.
- Mensagem de erro clara para o usuário **e** `console.error` para o desenvolvedor.
- Dados fictícios, marcados como exemplo, sem PII.
- Renderização com `createElement` + `textContent`.
- README declarando que não há API real.

**Pediria ajuste:**
- Erro só no console: "O console é pra você, não pro usuário. Se falhou, a tela precisa dizer algo."
- Sem checagem de status: "Você está tratando 404 como sucesso. Cheque `resposta.ok`, senão o erro aparece no lugar errado."
- README vago: "'Dados da equipe' dá a entender que é real. Escreve 'dados mockados, sem API real'. Dado falso pode ensinar; promessa falsa atrapalha."

**Reprovaria:**
- Tela vazia sem nenhuma mensagem quando o fetch falha (o INC-V01-015 não resolvido).
- Dados com nome, e-mail ou telefone que pareçam reais.
- README ou post que chame o mock de "produção" ou "dados reais de usuários" (INC-V01-016).
- `innerHTML` recebendo o conteúdo do JSON sem necessidade.

**Resumo do Code Review:** "Buscar dados é fácil; o que separa amador de profissional é tratar o que acontece quando a busca falha. Mostre os três estados, cheque o status, e — fora do código — seja honesto sobre o que esses dados são. Um `.json` na pasta não é um backend, e tudo bem: ele ensina request/response sem você mentir no portfólio. Erro sem mensagem vira adivinhação; mock vendido como produção vira problema de credibilidade."

## Mãos à Obra

Execute as tarefas na ordem. Teste sempre com a página servida por `http://`, nunca por `file://`.

---

**Tarefa 1 — Criar `src/data/equipe.json`**

Crie a pasta `src/data/` e o arquivo `equipe.json` com os três integrantes fictícios do Conceito-chave 4 / Etapa 1. Confira que todos têm "(exemplo)" e que não há nenhum dado real.

---

**Tarefa 2 — Ajustar a seção de equipe no HTML**

Substitua o conteúdo de `<section id="equipe">` pelo contêiner `#lista-equipe` com o texto "Carregando equipe..." e a nota de dados fictícios (Etapa 2).

---

**Tarefa 3 — Escrever `carregarEquipe` e `renderizarEquipe`**

No `src/app.js`, adicione as duas funções (Trecho B + Conceito-chave 7) e a chamada `carregarEquipe()`.

---

**Tarefa 4 — Subir o servidor e testar o sucesso**

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000`. A lista da equipe deve aparecer com os três integrantes.

---

**Tarefa 5 — Testar o erro de propósito**

Renomeie `equipe.json` para `equipe-x.json` e recarregue. A tela deve mostrar a mensagem de erro; o console deve registrar o detalhe com o status. Depois desfaça a renomeação.

---

**Tarefa 6 — Confirmar Network e Console limpos no sucesso**

Com o arquivo no nome certo, recarregue. Na aba Network, `equipe.json` deve aparecer com status 200. No Console, nenhum erro em vermelho.

---

**Tarefa 7 — Atualizar o diagrama request/response**

Edite `diagrams/request-response.md` (criado no C02) adicionando o fluxo deste capítulo:

```text
Browser
  -> fetch("data/equipe.json")
  -> resposta (status 200 / 404 / erro de rede)
  -> resposta.ok? --não--> catch --> mensagem de erro na tela
  -> resposta.json() --> renderizarEquipe() --> lista na tela
```

---

**Tarefa 8 — Adicionar a seção "Dados mockados" ao README**

```markdown
## Dados mockados

A lista de equipe é carregada de `src/data/equipe.json`, um arquivo **mockado**
(dados fictícios) para fins de estudo. **Não há API real, banco de dados nem backend**
neste projeto — isso é introduzido nos volumes seguintes da série.

Para testar localmente, sirva a pasta `src/` por um servidor estático
(`python3 -m http.server 8000`) e acesse `http://localhost:8000`.
O `fetch` não funciona ao abrir o arquivo direto via `file://`.
```

---

**Tarefa 9 — Atualizar o diário técnico**

```markdown
## [DATA] — C09: fetch e dados mockados

Carreguei a lista de equipe de um JSON mockado com fetch. Meu primeiro fetch
falhava em silêncio: a tela ficava vazia. Descobri duas causas — eu tinha aberto
via file:// (fetch bloqueado) e não tinha tratamento de erro. Aprendi que fetch
não trata 404 como erro (precisa checar resposta.ok), que async/await deixa o
código legível, e que mostrar os três estados (carregando/sucesso/erro) é o que
torna a página honesta. Servi com python3 -m http.server.
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 10 — Commitar**

```bash
git add src/data/equipe.json src/app.js src/index.html README.md docs/diario-tecnico.md diagrams/request-response.md
git commit -m "feat(js): load mocked team data"
```

## Critérios de aceitação

- [ ] `src/data/equipe.json` existe, com dados fictícios e sem nenhuma PII real.
- [ ] `fetch` carrega os dados e a lista aparece quando servida por `http://`.
- [ ] Há estado de **carregando** e estado de **erro** visíveis na tela (não só no console).
- [ ] O código checa `resposta.ok` antes de `resposta.json()` e usa `try/catch`.
- [ ] A renderização usa `createElement` + `textContent` (sem `innerHTML` para dados).
- [ ] O `diagrams/request-response.md` foi atualizado com o fluxo do fetch.
- [ ] O README tem uma seção "Dados mockados" declarando que **não há API real**.
- [ ] Commit `feat(js): load mocked team data` realizado.

## Checklist de segurança

- [ ] Os dados mockados não contêm PII real (nome real, e-mail, telefone, documento).
- [ ] A renderização dos dados usa `textContent`, não `innerHTML`.
- [ ] O README/post **não** descreve os dados mockados como reais ou "em produção".
- [ ] Nenhuma dependência externa ou script de terceiros é carregado.

## Entrega de portfólio

### Entregas obrigatórias do C09

1. `src/data/equipe.json` — dados mockados fictícios.
2. `src/app.js` com `carregarEquipe` (três estados) e `renderizarEquipe` segura.
3. `src/index.html` com a região `#lista-equipe`.
4. `diagrams/request-response.md` atualizado.
5. Seção "Dados mockados" no `README.md`.
6. Entrada no `docs/diario-tecnico.md`.
7. Commit `feat(js): load mocked team data`.

### Screenshots ou diagramas esperados

O diagrama request/response atualizado é a evidência principal. Opcionalmente, dois screenshots: a lista carregada (sucesso) e a mensagem de erro (falha provocada).

### Evidências esperadas

Checklist manual de sucesso e erro (lista aparece / mensagem aparece), registrado no diário ou no PR.

### Limitações que devem aparecer

- Não há API real, backend nem banco de dados: os dados são mockados.
- `fetch` exige servir por `http://` (servidor estático), não `file://`.
- Sem autenticação, sem CORS real, sem estado de servidor: tudo isso vem do V03 em diante.

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Este esboco é para uso futuro, quando você quiser compartilhar o aprendizado. Não publique agora — o projeto ainda está em construção.*

---

**Gancho:** "Usei dados mockados para aprender `fetch` sem fingir que já tenho um backend."

**Contexto:** Estou construindo o IntraStack Básico, um portal de onboarding fictício, para aprender desenvolvimento web do zero.

**Problema:** Meu primeiro `fetch` deixava a lista de equipe vazia, sem nenhuma mensagem. Duas causas: eu tinha aberto a página via `file://` (o navegador bloqueia `fetch` nesse caso) e não tinha tratamento de erro.

**O que aprendi:** `fetch` não considera um 404 como erro — você precisa checar `resposta.ok`. `async/await` deixa o código legível. E o mais importante: toda requisição tem três estados (carregando, sucesso, erro), e mostrar o erro na tela é o que separa um protótipo de algo confiável. Servi a pasta com `python3 -m http.server` para evitar a armadilha do `file://`.

**Limitação honesta:** Os dados são **mockados** — não há API real, banco nem backend. Isso vem nos próximos volumes. Projeto de estudo em andamento.

**Próximo passo:** C10 — formulário com validação e UX honesta.

**Link:** [quando pronto: link do commit ou da página publicada]

---

## Perguntas de revisão

1. Por que o `fetch` falha ao abrir a página via `file://`, e qual é a forma recomendada no V01 de servir a pasta para que ele funcione? Isso conta como "criar um backend"? Por quê?

2. Um colega diz: "meu `fetch` não deu erro, mas a lista veio vazia e o console mostra um erro de JSON". O que provavelmente aconteceu, considerando como o `fetch` trata um status 404?

3. Qual é a diferença entre os três estados de uma requisição? O que o Trecho A (sem tratamento) deixava de mostrar ao usuário?

4. Para que serve a checagem `if (!resposta.ok)`? O que acontece se você chamar `resposta.json()` direto numa resposta 404?

5. Por que renderizar a lista com `createElement` + `textContent` é mais seguro do que montar uma string e atribuir a `innerHTML`? Em que cenário futuro essa escolha realmente importa?

6. O INC-V01-016 fala de dados mockados apresentados como reais. Como você descreveria, de forma honesta, a lista de equipe deste capítulo no README e num post de portfólio?

7. Na aba Network, o `equipe.json` aparece com status 200, mas a lista não renderiza na tela. Onde está, provavelmente, o problema — no `fetch` ou na renderização? Como você confirmaria?

## Próximo passo

A página deixou de assumir que tudo dá certo. Ela carrega dados de fora, mostra que está carregando, renderiza a lista quando recebe a resposta e avisa o usuário quando algo falha — e você sabe depurar cada um desses caminhos no Console e no Network. Tudo isso sem um backend, e sem mentir sobre isso no README.

O **Capítulo 10** completa o ciclo de interação: até aqui, os dados sempre vieram de você (o JSON) ou do código. Agora o **usuário** vai digitar. Você vai construir um formulário com validação e uma UX honesta — tratando entrada vazia, dados incompletos e a diferença crucial entre validar no cliente (conforto) e validar de verdade (que só o servidor garante, e que vem no V03).

A página para de só mostrar e começa a receber.
