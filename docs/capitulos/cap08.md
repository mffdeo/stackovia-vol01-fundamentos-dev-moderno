---
title: "Capítulo 08 — JavaScript básico aplicado ao IntraStack"
status: Preview
volume: 1
capitulo: 8
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 08 — JavaScript básico aplicado ao IntraStack

## Abertura

A home do IntraStack tinha estrutura (C06) e aparência (C07). Lia bem no notebook e no celular. Você mandou o link para o time, e a primeira resposta não foi do Mestre Py — foi de alguém do suporte.

"Ficou boa. Mas a seção de 'Links úteis' ocupa muito espaço no celular. Dava pra ter um botão 'Mostrar/ocultar' pra deixar a página mais limpa quando a pessoa não precisa dos links?"

Pedido pequeno, justo. Você adicionou um botão no HTML, escreveu seu primeiro JavaScript de verdade — `querySelector`, um clique, esconder a seção — abriu no browser e clicou.

Nada aconteceu.

Sem erro visível na página. O botão simplesmente não fazia nada. Você clicou de novo, mais forte, como se a força do clique fosse o problema. Continuou nada.

Foi aí que o Mestre Py entrou na conversa, com a pergunta que ele sempre faz quando algo "não funciona":

"Você abriu o console? O que ele diz? E antes de culpar o JavaScript: tem certeza de que o elemento que seu código procura existe na página?"

Você abriu o console do navegador pela primeira vez. Lá estava, em vermelho, a mensagem que você vai aprender a ler neste capítulo — e que vai te dizer exatamente o que estava errado.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Adicionar interação mínima e depurável (C08) |
| Tarefa | Implementar um botão "Mostrar/ocultar" na home do IntraStack com JavaScript básico, sem framework |
| Definição de pronto | O clique funciona, há feedback visual claro, o console fica sem erro e o código é pequeno e revisável |

O tamanho desta sprint é o de um capítulo. Cada leitor avança no próprio ritmo; o que importa é terminar com uma interação que funciona **e** que você consegue depurar quando quebra — porque ela vai quebrar pelo menos uma vez no caminho.

## Problema de negócio

A home está legível, mas é estática: ela só mostra conteúdo, não responde a nada. Para um portal de onboarding, isso é aceitável no começo — mas a primeira melhoria que qualquer usuário pede é controle: mostrar/ocultar, abrir/fechar, marcar como lido.

O risco aqui não é técnico, é de proporção. JavaScript é a porta de entrada para complexidade infinita: frameworks, estado global, build tools. Um iniciante que adiciona React para fazer um botão funcionar está resolvendo um problema de R$ 1 com uma ferramenta de R$ 1000 — e perde a chance de entender o que está realmente acontecendo.

O objetivo deste capítulo é o oposto: adicionar interação real com a menor quantidade possível de JavaScript, de forma que você entenda cada linha e consiga depurar quando algo falhar. Interação mínima, legível e sua.

## O que será construído neste capítulo

Ao final deste capítulo, o IntraStack básico terá:

- `src/app.js` — um arquivo de JavaScript próprio, conectado ao HTML, com uma função pequena e nomeada que controla a interação.
- Um botão "Mostrar/ocultar links" na home que esconde e revela a seção de Links úteis ao ser clicado.
- Uma mensagem de status que muda conforme o estado ("Links visíveis" / "Links ocultos") — feedback claro para o usuário.
- Uma classe CSS (`.oculto`) em `src/styles.css` que controla a visibilidade de forma declarativa.
- `src/index.html` ajustado: o botão, a região de status e o `<script>` carregado na posição certa.
- `docs/notas-js.md` com as decisões e o passo a passo de como testar a interação manualmente.
- Entrada no diário técnico.
- Commit `feat(js): add basic interaction`.

O que **não** entra: React, Vue, qualquer framework, TypeScript, bundler (Webpack/Vite), gerenciamento de estado, testes automatizados de frontend, consumo de API. Tudo isso vem nos volumes seguintes. Aqui é JavaScript puro, rodando direto no browser, sem Node nem npm.

## Cena/tensão de abertura

Antes de fazer funcionar, olhe o código que falhou. Foi este o `src/app.js` da primeira tentativa:

```js
// src/app.js — primeira tentativa (NÃO funciona)
const botao = document.querySelector(".btn-toggle");

botao.addEventListener("click", function () {
  const secao = document.querySelector("#links-uteis");
  secao.classList.toggle("oculto");
});
```

E o `<script>` estava no `<head>` do HTML:

```html
<head>
  <meta charset="UTF-8">
  <title>IntraStack Básico</title>
  <link rel="stylesheet" href="styles.css">
  <script src="app.js"></script>   <!-- carregado cedo demais -->
</head>
```

Esse código tem dois problemas, e os dois aparecem no console. O primeiro, o que travou tudo:

```text
Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
    at app.js:4
```

Traduzindo: na linha 4 (a do `botao.addEventListener`), o código tentou chamar `addEventListener` em `botao`, mas `botao` era `null` — não existia. Por quê? Duas causas possíveis, e este capítulo trata as duas:

1. **O seletor aponta para algo que não existe.** O código procura `.btn-toggle`, mas no HTML o botão tinha a classe `.botao-menu` (ou nenhuma classe ainda). `querySelector` não encontra nada e devolve `null`. É o INC-V01-013.
2. **O script rodou antes de o HTML existir.** Mesmo que o seletor estivesse certo, com o `<script>` no `<head>` o navegador executa o JavaScript **antes** de montar o `<body>`. Quando o código procura o botão, o botão ainda não foi criado. `querySelector` devolve `null` de novo. É o INC-V01-014.

Os dois erros produzem exatamente o mesmo sintoma — `null` — mas têm causas diferentes. Aprender a distinguir os dois é metade deste capítulo.

## Exemplo antes do conceito

Dois cliques, uma comparação. Os dois tentam reagir a um clique no botão; só um funciona.

**Trecho A — o clique que não responde:**

```js
const botao = document.querySelector(".btn-toggle");
botao.addEventListener("click", esconderLinks);
```

Você clica no botão na página. Nada acontece — ou pior, a página inteira de JavaScript para de funcionar. No console: `Uncaught TypeError: Cannot read properties of null`. A linha existe, a sintaxe está certa, mas `botao` é `null`. O JavaScript está correto; o problema é que ele está falando com um elemento que não está lá.

**Trecho B — o clique que funciona:**

```js
const botao = document.querySelector("#btn-toggle");

if (botao) {
  botao.addEventListener("click", alternarLinks);
}
```

Duas mudanças fizeram a diferença:

- O seletor `#btn-toggle` corresponde **exatamente** a um elemento que existe no HTML (`<button id="btn-toggle">`). O `querySelector` encontra o botão e devolve o elemento, não `null`.
- O `if (botao)` é uma rede de segurança: só adiciona o listener se o botão realmente existir. Se um dia o HTML mudar e o botão sumir, o código não quebra a página inteira — ele simplesmente não faz nada, em silêncio.

E, fora do JavaScript, uma terceira correção: o `<script>` foi movido para o final do `<body>` (ou ganhou `defer`), de modo que o HTML já existe quando o código roda.

A diferença entre o Trecho A e o Trecho B não é "saber mais JavaScript". É garantir que o código fale com um elemento que existe, no momento em que ele existe. Agora vamos nomear os conceitos.

## Conceitos essenciais

### Conceito-chave 1 — DOM: a página como uma árvore de objetos

Quando o navegador carrega o `index.html`, ele não guarda o texto do arquivo — ele constrói uma representação em memória chamada **DOM** (Document Object Model). O DOM é a página transformada numa árvore de objetos, onde cada tag (`header`, `nav`, `section`, `button`) vira um nó que o JavaScript pode ler e modificar.

A ideia central: o HTML é o estado inicial; o DOM é o estado vivo. Quando seu JavaScript "esconde uma seção", ele não reescreve o arquivo `.html` — ele altera o objeto correspondente no DOM, e o navegador re-renderiza a tela.

O objeto `document` é a porta de entrada para essa árvore. Tudo que você faz com a página passa por ele.

### Conceito-chave 2 — `querySelector`: encontrar um elemento

Para mexer num elemento, primeiro você precisa encontrá-lo no DOM. A ferramenta para isso é `document.querySelector()`, que recebe um seletor CSS — o mesmo tipo de seletor que você usou no C07 — e devolve o **primeiro** elemento que combina:

```js
document.querySelector("#btn-toggle");   // por id
document.querySelector(".card");          // por classe (o primeiro)
document.querySelector("nav a");          // por seletor descendente
```

O ponto que causa mais bug para iniciantes: **se nada for encontrado, `querySelector` devolve `null`** — não dá erro na hora. O erro só aparece quando você tenta usar esse `null` como se fosse um elemento (`null.addEventListener(...)`). Por isso o sintoma do INC-V01-013 é um `TypeError` apontando para a linha onde você *usa* o elemento, não para a linha onde você o *procura*.

Regra prática para o V01: prefira `id` para o elemento que o JavaScript vai controlar. `id` é único e deixa a intenção clara — "este é o botão que o script usa".

### Conceito-chave 3 — Evento e listener: reagir a uma ação

Um **evento** é algo que acontece na página: um clique, uma tecla pressionada, o mouse passando por cima. O navegador dispara eventos o tempo todo; seu código escolhe quais quer ouvir.

Para reagir a um evento, você registra um **listener** (ouvinte) com `addEventListener`:

```js
botao.addEventListener("click", alternarLinks);
```

Lê-se: "quando o `botao` receber um `click`, chame a função `alternarLinks`". Três partes:

- `botao` — o elemento que você está observando.
- `"click"` — o nome do evento (entre aspas).
- `alternarLinks` — a função que roda quando o evento acontece. **Sem parênteses** aqui: você está passando a função, não chamando-a. `alternarLinks` passa a referência; `alternarLinks()` executaria na hora e passaria o resultado — um erro comum.

### Conceito-chave 4 — Handler: a função que faz a mudança

A função chamada pelo listener é o **handler** (manipulador). É onde a mudança no DOM acontece. Para o V01, mantenha o handler pequeno, com nome que diz o que ele faz:

```js
function alternarLinks() {
  const secao = document.querySelector("#links-uteis");
  secao.classList.toggle("oculto");
}
```

`classList.toggle("oculto")` adiciona a classe `oculto` se ela não estiver lá, e remove se estiver. Combinado com uma regra CSS (`.oculto { display: none; }`), isso esconde e revela a seção a cada clique. Note a divisão de trabalho: o **JavaScript decide** quando a classe entra ou sai; o **CSS decide** o que a classe faz visualmente. Você não escreve `secao.style.display = "none"` no JS — deixa a aparência no CSS, onde ela pertence.

### Conceito-chave 5 — `textContent` vs `innerHTML`: o cuidado que começa aqui

Para mudar o texto de um elemento, há duas propriedades, e a escolha entre elas é a primeira lição de segurança de frontend da série:

- **`textContent`** trata o que você atribui como **texto puro**. Se você fizer `el.textContent = "<b>oi</b>"`, a tela mostra literalmente os caracteres `<b>oi</b>`.
- **`innerHTML`** trata o que você atribui como **HTML**, que o navegador interpreta e renderiza. `el.innerHTML = "<b>oi</b>"` deixa a palavra "oi" em negrito.

`innerHTML` parece mais poderoso, e é — mas é também perigoso. Se você um dia colocar dentro de `innerHTML` um texto vindo do usuário (um nome digitado, um comentário, um parâmetro da URL), e esse texto contiver `<script>...</script>` ou um atributo malicioso, o navegador vai **executar** esse código. Esse é o mecanismo de um ataque chamado **XSS** (Cross-Site Scripting), que você vai estudar a fundo no C11 e no V11.

A regra para o V01 é simples e protege você desde já: **se o conteúdo é texto, use `textContent`.** Só use `innerHTML` quando você realmente precisa montar HTML e tem certeza absoluta de que o conteúdo é seguro (escrito por você, não vindo de fora). No nosso botão, a mensagem de status é texto — então é `textContent`.

### Conceito-chave 6 — Ordem de carregamento: código certo, momento errado

O navegador lê o HTML de cima para baixo. Quando encontra um `<script>`, por padrão ele **para**, baixa e executa o script, e só depois continua montando o resto da página.

Isso cria o INC-V01-014: se o `<script>` está no `<head>`, ele roda **antes** de o `<body>` existir. Quando o código faz `querySelector("#btn-toggle")`, o botão ainda não foi criado — e o resultado é `null`, mesmo com o seletor correto.

Há duas formas honestas de resolver no V01:

**Opção 1 — script no final do `<body>`:** coloque o `<script src="app.js"></script>` como última coisa antes de `</body>`. Quando ele roda, todo o HTML acima já existe.

**Opção 2 — atributo `defer`:** mantenha o script no `<head>`, mas com `defer`:

```html
<script src="app.js" defer></script>
```

`defer` diz ao navegador: "baixe o script agora, mas só execute depois que o HTML estiver pronto". É a forma mais moderna e a que vamos usar.

A lição do Mestre Py para esse caso: "Código certo no momento errado também falha." Um seletor perfeito não adianta se o elemento ainda não nasceu quando o código procura por ele.

## Construindo a interação em etapas

Você vai montar a interação em quatro etapas, abrindo o browser (e o console) depois de cada uma. O fluxo que estamos implementando:

```text
clique no botão  ->  listener ouve "click"  ->  handler alternarLinks()
   ->  classList.toggle("oculto") na seção  ->  CSS aplica display:none/block
   ->  textContent atualiza a mensagem de status (feedback visual)
```

### Etapa 1 — HTML: o botão, o status e o script na posição certa

No `index.html`, dentro do `<section id="boas-vindas">` (ou logo após o `nav`), adicione o botão e a região de status. E mova o `<script>` para o final do `body` ou use `defer`.

```html
<!-- dentro de <section id="boas-vindas"> -->
<button id="btn-toggle" type="button">Ocultar links úteis</button>
<p id="status-links" role="status">Links visíveis</p>
```

```html
<!-- opção defer, no <head> -->
<script src="app.js" defer></script>
```

Detalhes que valem explicar:

- `type="button"` impede que o botão tente enviar um formulário (comportamento padrão de `<button>` dentro de `<form>`). Hábito seguro desde já.
- `role="status"` sinaliza para leitores de tela que aquele parágrafo comunica uma mudança de estado. Pequeno cuidado de acessibilidade, proporcional ao V01.

### Etapa 2 — CSS: a classe que esconde

No `styles.css`, adicione a classe que o JavaScript vai ligar e desligar:

```css
.oculto {
  display: none;
}
```

Uma linha. O CSS não sabe nada sobre cliques — ele só define o que `oculto` significa visualmente. Quem decide quando aplicar é o JavaScript.

### Etapa 3 — JavaScript: o handler e o listener

Crie o `src/app.js`:

```js
// src/app.js — interação da home do IntraStack

const botao = document.querySelector("#btn-toggle");
const secao = document.querySelector("#links-uteis");
const status = document.querySelector("#status-links");

function alternarLinks() {
  const estaOculto = secao.classList.toggle("oculto");

  if (estaOculto) {
    botao.textContent = "Mostrar links úteis";
    status.textContent = "Links ocultos";
  } else {
    botao.textContent = "Ocultar links úteis";
    status.textContent = "Links visíveis";
  }
}

if (botao && secao && status) {
  botao.addEventListener("click", alternarLinks);
}
```

O que cada parte faz:

- As três primeiras linhas encontram os elementos uma vez e guardam em constantes com nomes claros.
- `classList.toggle("oculto")` devolve `true` se a classe ficou ativa (seção escondida) e `false` se foi removida (seção visível). Guardamos isso em `estaOculto` para decidir os textos.
- O handler atualiza **dois** feedbacks: o texto do próprio botão (que agora oferece a ação oposta) e a mensagem de status. Os dois usam `textContent`, porque são texto.
- O `if (botao && secao && status)` só registra o listener se os três elementos existirem. É a rede de segurança contra o `null` do INC-V01-013: se algum seletor não encontrar nada, o código não quebra a página — apenas não liga a interação.

### Etapa 4 — Testar no browser e no console

Abra o `index.html` no browser. Você deve ver o botão "Ocultar links úteis" e o texto "Links visíveis".

Clique. A seção de links deve sumir, o botão deve virar "Mostrar links úteis" e o status deve dizer "Links ocultos". Clique de novo: tudo volta. Abra o console (F12) e confirme que **não há nenhuma mensagem em vermelho**. Console limpo é parte da definição de pronto.

## O que pode dar errado?

### 1. Seletor que não encontra nada (INC-V01-013)

O sintoma é o `TypeError: Cannot read properties of null`. A causa é quase sempre uma divergência entre o seletor no JavaScript e o que existe no HTML: você escreveu `.btn-toggle` (classe) mas o HTML usa `id="btn-toggle"`; ou digitou `#btnToggle` com maiúscula e o HTML tem `btn-toggle`; ou o elemento foi renomeado e o JS ficou para trás.

**Como evitar:** copie o seletor a partir do HTML, não de memória. Lembre que `#` é id e `.` é classe — trocar os dois é o erro mais comum. E use o `if (elemento)` como rede de segurança.

### 2. Script rodando antes do DOM (INC-V01-014)

Mesmo com o seletor certo, se o `<script>` roda antes do HTML existir, `querySelector` devolve `null`. O sintoma é idêntico ao erro anterior — o que torna esse bug confuso.

**Como evitar:** use `defer` no `<script>` ou coloque-o no final do `<body>`. Se o erro de `null` persiste mesmo com o seletor visivelmente correto, suspeite da ordem de carregamento.

### 3. Classe CSS divergente

O JavaScript adiciona a classe `oculto`, mas o CSS define `.ocultar` (nome diferente). O `toggle` funciona — a classe entra e sai — mas nada muda visualmente, porque não existe regra CSS para aquele nome.

**Como evitar:** o nome da classe no `toggle()` do JS e no seletor do CSS precisa ser **idêntico**. Confira os dois lado a lado.

### 4. Função passada com parênteses

Escrever `addEventListener("click", alternarLinks())` (com parênteses) executa a função **imediatamente**, no carregamento, e passa o resultado (`undefined`) como listener. O clique nunca dispara nada.

**Como evitar:** ao passar a função para o `addEventListener`, escreva o nome **sem** parênteses: `alternarLinks`.

### 5. `innerHTML` onde bastava `textContent`

Usar `innerHTML` para escrever uma mensagem de texto não dá erro — mas cria o hábito errado. No dia em que esse texto vier do usuário, vira porta para XSS.

**Como evitar:** se é texto, é `textContent`. Reserve `innerHTML` para quando você realmente monta HTML e o conteúdo é confiável.

## Debugging guiado

### Passo 1 — Abrir o console e ler a mensagem

Abra o browser, pressione `F12` (ou `Ctrl+Shift+I` / `Cmd+Option+I`) e vá na aba **Console**. Recarregue a página.

Se houver erro, ele aparece em vermelho, com o arquivo e a linha: `app.js:4`. Clique na linha — o navegador leva você direto ao ponto do código. A mensagem `Cannot read properties of null (reading 'addEventListener')` diz que algo que deveria ser um elemento é `null`.

### Passo 2 — Confirmar se o elemento existe

Antes de culpar o JavaScript, faça a pergunta do Mestre Py: o elemento existe? Teste direto no console:

```js
document.querySelector("#btn-toggle");
```

- Se devolver `null`: o seletor não encontra nada. Vá para o Passo 3.
- Se devolver `<button id="btn-toggle">...`: o elemento existe e o seletor está certo. O problema provavelmente é ordem de carregamento — vá para o Passo 4.

### Passo 3 — Comparar o seletor com o HTML

Abra a aba **Elements** do DevTools e localize o botão. Confira:

- É `id` ou `class`? (`#` no JS para id, `.` para classe.)
- O nome bate exatamente? (maiúsculas, hífens, acentos contam.)

Corrija o seletor no `app.js` para corresponder ao HTML. Recarregue e teste de novo.

### Passo 4 — Verificar a ordem de carregamento

Se o elemento existe quando você testa no console (depois que a página carregou) mas o código falha no carregamento, o script está rodando cedo demais.

Confira a tag `<script>`: ela está no `<head>` sem `defer`? Mova para o final do `<body>` ou adicione `defer`. Recarregue.

### Passo 5 — Confirmar a classe e o feedback

Com o erro de `null` resolvido, clique no botão e observe a aba **Elements**: a classe `oculto` deve aparecer e desaparecer no `<section id="links-uteis">` a cada clique. Se a classe entra mas nada muda visualmente, o nome da classe no JS e no CSS não batem (volte ao item 3 de "O que pode dar errado?").

## Code Review do Mestre Py

O Mestre Py leria o `app.js` com estas perguntas:

**Aprovaria sem comentário:**
- Seletores por `id` para os elementos que o script controla.
- Elementos buscados uma vez e guardados em constantes com nomes claros.
- Handler pequeno, com nome que descreve a ação (`alternarLinks`).
- `classList.toggle` em vez de manipular `style` direto no JS.
- `textContent` para a mensagem de status e o texto do botão.
- `if (botao && secao && status)` como rede de segurança.
- `<script>` com `defer` (ou no final do `body`).

**Pediria ajuste:**
- Nome vago: "`function f1()` não diz nada. Como esse nome se lê em voz alta daqui a três meses? Renomeia pro que ele faz."
- Feedback ausente: "A seção some, mas o botão continua dizendo 'Ocultar'. O usuário precisa saber qual é o estado atual. Atualiza o texto do botão e o status."
- `style.display` no JS: "Por que decidir aparência no JavaScript? Joga a classe e deixa o CSS dizer o que ela significa."

**Reprovaria:**
- `innerHTML` com conteúdo que pode vir do usuário: "Isso é porta de XSS. Se é texto, é `textContent`. Sem exceção no V01."
- Código sem nenhuma checagem de `null`, quebrando a página inteira quando um seletor erra.
- Função gigante misturando seleção, lógica e três responsabilidades diferentes num só bloco.

**Resumo do Code Review:** "JavaScript no V01 é sobre conectar uma ação a uma mudança visível, de forma que você entenda e consiga depurar. Antes de culpar o código, pergunte se o elemento existe e se o script rodou no momento certo. Mantenha o handler pequeno, nomeie tudo pelo que faz, deixe a aparência no CSS e use `textContent` para texto. Não é pouco — é o suficiente. Framework é conversa do V02."

## Mãos à Obra

Execute as tarefas na ordem. Abra o browser e o console depois de cada etapa.

---

**Tarefa 1 — Adicionar o botão e o status ao HTML**

Dentro de `<section id="boas-vindas">`, adicione:

```html
<button id="btn-toggle" type="button">Ocultar links úteis</button>
<p id="status-links" role="status">Links visíveis</p>
```

Abra no browser e confirme que o botão e o texto aparecem (ainda sem reagir ao clique).

---

**Tarefa 2 — Adicionar a classe `.oculto` ao CSS**

No `styles.css`:

```css
.oculto {
  display: none;
}
```

---

**Tarefa 3 — Conectar o script com `defer`**

No `<head>` do `index.html`, após o `<link>` do CSS:

```html
<script src="app.js" defer></script>
```

---

**Tarefa 4 — Criar o `src/app.js`**

Escreva o código da Etapa 3 (seleção dos três elementos, handler `alternarLinks`, listener com a checagem `if`).

---

**Tarefa 5 — Testar a interação**

Abra a página e clique no botão:

- A seção "Links úteis" some e volta a cada clique.
- O texto do botão alterna entre "Ocultar links úteis" e "Mostrar links úteis".
- O status alterna entre "Links visíveis" e "Links ocultos".

---

**Tarefa 6 — Confirmar console limpo**

Abra o console (F12). Recarregue. **Nenhuma mensagem em vermelho.** Console limpo faz parte da definição de pronto.

---

**Tarefa 7 — Provocar e corrigir o bug (exercício de debugging)**

Para sentir o INC-V01-013 na prática: troque temporariamente `#btn-toggle` por `#btn-toggel` (com typo) no `app.js`, recarregue e leia o erro no console. Depois corrija. Esse exercício é proposital — você vai reconhecer esse erro muitas vezes na carreira.

---

**Tarefa 8 — Criar `docs/notas-js.md`**

```markdown
# Notas — JavaScript da home do IntraStack

## O que foi implementado
- Botão "Mostrar/ocultar links úteis" com feedback de estado.
- `src/app.js` conectado via `<script defer>`.
- Classe `.oculto` no CSS controla a visibilidade; o JS apenas alterna a classe.

## Como testar manualmente
1. Abrir `src/index.html` no browser.
2. Clicar no botão: a seção de links some; o botão e o status mudam de texto.
3. Clicar de novo: a seção volta.
4. Abrir o console (F12) e confirmar que não há erro.

## Decisões
- Seletores por `id` para os elementos controlados pelo script.
- `textContent` (não `innerHTML`) para texto — evita risco de XSS.
- Aparência no CSS (`.oculto`), comportamento no JS.
- Checagem `if (elemento)` antes de adicionar listener.

## Limitações
- Sem framework, sem estado complexo, sem TypeScript.
- Sem testes automatizados (manual por enquanto).
- Sem consumo de API — dados e fetch vêm no C09.

## Próximo passo
- C09 busca dados mockados com fetch e trata estados de erro.
```

---

**Tarefa 9 — Atualizar o diário técnico**

```markdown
## [DATA] — C08: primeira interação com JavaScript

Adicionei um botão de mostrar/ocultar à home. Meu primeiro JS "não funcionava":
o console acusava TypeError de null. Aprendi que querySelector devolve null quando
não acha o elemento, e que o erro pode ser seletor errado OU script rodando antes
do DOM. Resolvi com seletor correto + defer. Usei textContent (não innerHTML) e
deixei a aparência no CSS via classe .oculto.
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 10 — Commitar**

```bash
git add src/app.js src/index.html src/styles.css docs/notas-js.md docs/diario-tecnico.md
git commit -m "feat(js): add basic interaction"
```

Se quiser um PR dedicado, crie a branch `feat/js-interacao-basica` no mesmo modelo dos capítulos anteriores.

## Critérios de aceitação

- [ ] `src/app.js` existe e está conectado ao HTML com `defer` (ou no final do `body`).
- [ ] O clique no botão mostra/oculta a seção de links.
- [ ] O texto do botão e o status mudam conforme o estado (feedback claro).
- [ ] O console fica sem nenhum erro ao carregar e ao interagir.
- [ ] O código é pequeno e legível: elementos nomeados, handler curto.
- [ ] A visibilidade é controlada por classe CSS (`.oculto`), não por `style` no JS.
- [ ] Não há `innerHTML` recebendo conteúdo dinâmico ou de usuário.
- [ ] `docs/notas-js.md` criado com decisões e o passo a passo de teste manual.
- [ ] Commit `feat(js): add basic interaction` realizado.

## Checklist de segurança

- [ ] Nenhum `innerHTML` recebe texto vindo do usuário, da URL ou de qualquer fonte externa.
- [ ] A mensagem de status e o texto do botão usam `textContent`.
- [ ] O capítulo não trata validação no cliente como segurança completa (validação real vem no backend, V03+).
- [ ] Nenhuma dependência externa é carregada (sem CDN de script de terceiros).

## Entrega de portfólio

### Entregas obrigatórias do C08

1. `src/app.js` — interação com seleção, evento, handler pequeno e checagem de existência.
2. `src/index.html` e `src/styles.css` atualizados (botão, status, `<script defer>`, classe `.oculto`).
3. `docs/notas-js.md` — decisões e passo a passo de teste manual.
4. Entrada no `docs/diario-tecnico.md`.
5. Commit `feat(js): add basic interaction`.

### Screenshots ou diagramas esperados

Um antes/depois é suficiente: a home com a seção visível e com a seção oculta (dois screenshots), ou o diagrama do fluxo `clique → handler → DOM → feedback`. Opcional, mas recomendado para o README.

### Evidências esperadas

Checklist manual de teste (clicar, ver o toggle, confirmar console limpo), registrado no `docs/notas-js.md` ou na descrição do PR.

### Limitações que devem aparecer

- Sem framework: React e similares vêm no V02.
- Sem TypeScript, sem bundler, sem estado complexo.
- Sem consumo de API: dados externos e `fetch` vêm no C09.
- Validação de cliente não é segurança: o controle real é no servidor (V03+).

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Este esboco é para uso futuro, quando você quiser compartilhar o aprendizado. Não publique agora — o projeto ainda está em construção.*

---

**Gancho:** "Meu primeiro JavaScript útil foi pequeno — e mesmo assim quebrou na primeira tentativa."

**Contexto:** Estou construindo o IntraStack Básico, um portal de onboarding fictício, para aprender desenvolvimento web do zero.

**Problema:** Adicionei um botão de mostrar/ocultar. Clicava e nada acontecia. O console acusava `TypeError: Cannot read properties of null`.

**O que aprendi:** `querySelector` devolve `null` quando não encontra o elemento — e o erro pode ter duas causas com o mesmo sintoma: seletor errado, ou script rodando antes de o HTML existir. Resolvi com o seletor certo + `defer`. Aprendi também a usar `textContent` em vez de `innerHTML` para texto (primeiro cuidado contra XSS) e a deixar a aparência no CSS, com o JS só alternando uma classe.

**Limitação honesta:** Sem framework, sem TypeScript, sem estado complexo. JavaScript puro, projeto de estudo em andamento.

**Próximo passo:** C09 — buscar dados com `fetch` e tratar erros de rede.

**Link:** [quando pronto: link do commit ou da página publicada]

---

## Perguntas de revisão

1. O que `document.querySelector("#btn-toggle")` devolve quando não existe nenhum elemento com esse id? Por que o erro só aparece na linha em que você *usa* o resultado, e não na linha em que você o *procura*?

2. O INC-V01-013 e o INC-V01-014 produzem o mesmo sintoma (`null`), mas têm causas diferentes. Quais são as duas causas e como você distingue uma da outra no console?

3. Qual é a diferença entre passar `alternarLinks` e `alternarLinks()` para o `addEventListener`? O que acontece em cada caso?

4. Por que controlar a visibilidade com uma classe CSS (`.oculto`) é melhor do que escrever `secao.style.display = "none"` direto no JavaScript?

5. Quando você deve usar `textContent` e quando `innerHTML`? Qual risco de segurança o uso indevido de `innerHTML` pode introduzir?

6. O que o atributo `defer` faz no `<script>`? Em que situação a ausência dele causaria um bug, mesmo com o seletor correto?

7. Por que o `if (botao && secao && status)` antes do `addEventListener` é uma boa prática, mesmo quando você tem certeza de que os elementos existem?

## Próximo passo

A home do IntraStack deixou de ser só um documento: ela reage ao usuário. Um clique controla o que aparece, com feedback claro e sem nenhum framework — e, mais importante, você sabe depurar a interação quando ela quebra, porque ela quebrou e você consertou.

O **Capítulo 09** dá o próximo salto: em vez de só mexer no que já está na página, você vai **buscar dados de fora** com `fetch`. Vai carregar uma lista de links a partir de um arquivo de dados mockado, e — principalmente — vai aprender a tratar o que acontece quando a busca falha: rede fora, arquivo ausente, resposta inesperada.

A página para de assumir que tudo sempre dá certo. E é aí que ela começa a parecer software de verdade.
