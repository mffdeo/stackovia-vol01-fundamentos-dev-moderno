---
title: "Capítulo 10 — Formulário, validação simples e erros comuns"
status: Preview
volume: 1
capitulo: 10
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 10 — Formulário, validação simples e erros comuns

## Abertura

A home do IntraStack já mostrava a equipe carregada de um arquivo (C09). O time veio com o próximo pedido: "Quem chega no onboarding às vezes tem dúvida. Dá pra ter um campo de contato, simples, pra pessoa mandar nome, e-mail e uma mensagem?"

Você montou rápido. Três campos, um botão "Enviar", e um JavaScript que, ao clicar, mostrava "Mensagem enviada com sucesso!". Abriu no browser, clicou em Enviar **sem preencher nada** — só para ver o visual.

"Mensagem enviada com sucesso!"

Tela verde, check, tudo certo. Exceto que você não tinha digitado uma única letra. Nome vazio, e-mail vazio, mensagem vazia — e o formulário garantiu, com confiança, que estava tudo enviado.

Você mostrou ao Mestre Py, meio orgulhoso do feedback visual. Ele clicou em Enviar com os campos vazios, depois digitou "asdf" no campo de e-mail e enviou de novo. Os dois deram "sucesso".

"Seu formulário está mentindo", ele disse. "Ele diz 'enviado com sucesso' para um nome que não existe e um e-mail que não é e-mail. E, antes que você pergunte: não, isso aqui não envia nada pra lugar nenhum ainda — não tem backend. Mas mesmo um formulário que não envia precisa ser honesto sobre o que recebeu. Feedback honesto começa antes do backend existir."

Este capítulo faz o formulário parar de mentir.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Criar contato de onboarding com feedback honesto (C10) |
| Tarefa | Implementar um formulário simples com validação no cliente e mensagens de erro/sucesso claras |
| Definição de pronto | Campos obrigatórios e e-mail são validados, erros são específicos, o sucesso não finge envio real, e a limitação está no README |

O tamanho desta sprint é o de um capítulo. Cada leitor avança no próprio ritmo; o que importa é terminar com um formulário que **orienta** quem preenche — aponta o que está errado, confirma quando está certo — e que é honesto sobre não ter backend.

## Problema de negócio

Um formulário é o primeiro ponto em que o **usuário** entrega dados ao sistema — e o primeiro lugar onde a qualidade percebida do produto é testada. Um formulário que aceita qualquer coisa e diz "sucesso" cria uma falsa sensação de qualidade: parece pronto, mas não cumpre o básico.

Há dois custos práticos:

1. **Confiança quebrada.** Se o usuário envia um formulário achando que deu certo, mas o nome ficou vazio ou o e-mail estava errado, ele perde a chance de corrigir — e o "contato" nunca chega de forma útil. Pior num portfólio: quem testa percebe na hora que o formulário não valida nada.
2. **Falsa promessa de segurança.** É tentador achar que "validei no JavaScript, então está seguro". Não está. Validação no cliente é **conforto e orientação**, não segurança. Quem controla o browser pode burlar qualquer validação client-side. Segurança real só existe no servidor — que vem no V03.

Este capítulo entrega o feedback honesto (validar e orientar) e deixa explícito o limite (cliente não é segurança), sem prometer o que o V01 não tem.

## O que será construído neste capítulo

Ao final deste capítulo, o IntraStack básico terá:

- Uma seção (ou página `src/contato.html`) de contato de onboarding com três campos: nome, e-mail e mensagem.
- Validação no cliente em `src/app.js`: campos obrigatórios não podem ficar vazios, e o e-mail precisa ter um formato plausível.
- Mensagens de erro **específicas** por campo (não um "preencha tudo" genérico) e um estado de sucesso que deixa claro que **não há envio real**.
- Regras de CSS para os estados de erro e sucesso (`src/styles.css`).
- Uma seção no `README.md` explicando como testar e declarando os limites (sem backend, validação de cliente não é segurança).
- Entrada no diário técnico.
- Commit `feat(form): add simple validation`.

O que **não** entra: autenticação, login real, backend, banco de dados, validação no servidor, JWT/OAuth/sessão/cookies. Nada disso existe no V01. O sucesso do formulário é **simulado e rotulado como tal** — ninguém é levado a achar que os dados foram para algum lugar.

## Cena/tensão de abertura

Antes de validar, olhe o formulário que mentia. Era este o handler da primeira tentativa:

```js
// primeira tentativa — diz "sucesso" para qualquer coisa
const form = document.querySelector("#form-contato");
const statusForm = document.querySelector("#status-form");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  statusForm.textContent = "Mensagem enviada com sucesso!";
});
```

O problema não é de sintaxe — o código roda. O problema é que ele **não olha para o que o usuário digitou**. Ele intercepta o envio (`preventDefault`, para a página não recarregar) e vai direto para "sucesso", sem checar nada.

O resultado são dois incidentes ao mesmo tempo:

- **Nome e e-mail vazios viram "sucesso"** (INC-V01-017): o formulário dá feedback positivo para entrada inválida. O usuário acredita que enviou algo útil.
- **`asdf` é aceito como e-mail** (INC-V01-018): o campo aceita qualquer coisa e não explica o que está errado. O usuário não sabe o que corrigir.

E há um detalhe honesto que o Mestre Py já apontou: mesmo o "sucesso" é mentira dupla, porque não existe envio — não há backend. A correção tem duas frentes: **validar antes de confirmar** (e mostrar erro específico quando falhar) e **rotular o sucesso como simulado**. É o que o capítulo constrói.

## Exemplo antes do conceito

Dois envios, uma comparação. Os dois reagem ao clique em "Enviar"; só um conta a verdade.

**Trecho A — o formulário que mente:**

```js
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  statusForm.textContent = "Mensagem enviada com sucesso!";
});
```

Clique com tudo vazio: "sucesso". Digite "asdf" no e-mail: "sucesso". O formulário nunca olha para os dados.

**Trecho B — o formulário honesto:**

```js
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  limparErros();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  let valido = true;

  if (nome === "") {
    mostrarErro("nome", "Informe seu nome.");
    valido = false;
  }

  if (!emailPlausivel(email)) {
    mostrarErro("email", "Informe um e-mail válido, como nome@exemplo.com.");
    valido = false;
  }

  if (mensagem === "") {
    mostrarErro("mensagem", "Escreva sua mensagem.");
    valido = false;
  }

  if (valido) {
    statusForm.textContent = "Tudo certo! (Simulação — este formulário ainda não envia dados a nenhum servidor.)";
  }
});
```

(`form` e `statusForm` são declarados uma vez no topo do arquivo, como você vai ver na Etapa 3.)

As diferenças são todas sobre honestidade:

- O `.trim()` remove espaços das pontas — um campo com só espaços conta como vazio, não como preenchido.
- Cada campo tem sua **própria** mensagem de erro, dizendo exatamente o que corrigir. Nada de "preencha tudo".
- O sucesso só aparece se **tudo** for válido (`valido` continua `true`).
- E a mensagem de sucesso é explícita: **é uma simulação, não há envio real.**

Agora vamos nomear os conceitos.

## Conceitos essenciais

### Conceito-chave 1 — O formulário e o evento `submit`

Um `<form>` tem um comportamento padrão: ao ser enviado, ele recarrega a página (ou navega para outra URL). No V01, sem backend, isso não faz sentido — você quer tratar o envio no próprio JavaScript.

Por isso o evento certo é `submit` (no formulário), não `click` (no botão):

```js
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  // ... validação ...
});
```

`evento.preventDefault()` cancela o comportamento padrão de recarregar. Usar `submit` (em vez de `click` no botão) é melhor porque captura também o envio pelo teclado (Enter num campo) — um cuidado de acessibilidade que vem de graça.

### Conceito-chave 2 — `required` no HTML: a primeira linha (que não basta)

O HTML tem validação embutida. Marcar um campo com `required` faz o navegador recusar o envio se ele estiver vazio:

```html
<input type="text" id="nome" name="nome" required>
<input type="email" id="email" name="email" required>
```

`type="email"` também faz o navegador checar um formato mínimo. Isso é útil e você deve usar — mas tem dois limites:

- A aparência e o texto das mensagens nativas variam de navegador e você não controla.
- E, principalmente: **o usuário pode remover o `required` pelo DevTools** ou enviar a requisição por fora. A validação nativa é conveniência, não garantia.

Por isso você combina `required` (conveniência imediata) com validação em JavaScript (mensagens que você controla) — e, no futuro, validação no servidor (a única que conta de verdade).

### Conceito-chave 3 — Validação client-side é orientação, não segurança

Este é o conceito central do capítulo, e ele é tanto técnico quanto ético.

Validar no cliente serve para **orientar o usuário rápido**: apontar o campo errado antes de qualquer ida ao servidor, com mensagem clara. É boa experiência.

Mas validação no cliente **não é segurança**, por uma razão simples: o cliente está sob controle de quem usa o navegador. Qualquer pessoa pode abrir o DevTools, apagar o `required`, editar o seu JavaScript ou enviar dados direto, ignorando todo o seu código. Tudo que roda no browser é sugestão, não barreira.

A regra que você leva deste capítulo: **valide no cliente para ajudar; confie só no servidor para proteger.** No V01 não há servidor, então não prometemos proteção — prometemos orientação honesta. A validação de verdade chega no V03.

### Conceito-chave 4 — Mensagens de erro específicas (INC-V01-018)

Uma mensagem genérica ("Erro. Preencha o formulário.") obriga o usuário a adivinhar o que está errado. Uma mensagem específica resolve:

| Genérica (ruim) | Específica (boa) |
|---|---|
| "Preencha o formulário." | "Informe seu nome." |
| "Dados inválidos." | "Informe um e-mail válido, como nome@exemplo.com." |
| "Erro." | "Escreva sua mensagem." |

A mensagem deve aparecer **perto do campo** que ela descreve, não num bloco geral no topo. E o tom importa: validar não é brigar com o usuário, é orientá-lo. "Informe seu nome." orienta; "Você esqueceu de novo o nome!" não ajuda ninguém.

### Conceito-chave 5 — Validar e-mail "o suficiente"

Validar e-mail perfeitamente é surpreendentemente difícil (a especificação real é enorme). No V01, você não precisa de perfeição — precisa de uma checagem plausível que pegue os erros óbvios:

```js
function emailPlausivel(email) {
  // tem texto, um @, texto, um ponto e texto depois
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

Essa expressão regular (regex) checa o formato mínimo: algo, um `@`, algo, um `.`, algo. Ela rejeita `asdf`, `nome@`, `@exemplo.com` — os erros comuns. Ela **não** garante que o e-mail exista ou receba mensagens (só o servidor, enviando de fato, saberia disso).

Assuma esse limite honestamente: a validação confirma que o **formato** é plausível, não que o e-mail é real. Não prometa mais do que isso.

### Conceito-chave 6 — Input é hostil até prova em contrário: `textContent`, sempre

Aqui o cuidado dos capítulos anteriores vira regra firme. Tudo que o usuário digita é **entrada não confiável**. Se você pegar o nome digitado e jogar na página com `innerHTML`, e alguém digitar `<img src=x onerror=alert(1)>` ou `<script>...`, o navegador pode **executar** isso. É o ataque **XSS** (Cross-Site Scripting), apresentado no C08 e aprofundado no C11/V11.

A defesa no V01 é a mesma de sempre, agora obrigatória: ao exibir qualquer coisa que veio do input, use `textContent`, nunca `innerHTML`.

```js
// errado e perigoso — input vira HTML executável
confirmacao.innerHTML = "Obrigado, " + nome + "!";

// certo — input é tratado como texto puro
confirmacao.textContent = "Obrigado, " + nome + "!";
```

Com `textContent`, um nome contendo `<script>` aparece literalmente como texto na tela — inofensivo. Esse hábito é o que protege você no dia em que o input vier de fato de estranhos.

## Construindo o formulário em etapas

Você vai montar em quatro etapas, testando no navegador depois de cada uma. O fluxo:

```text
input do usuário  ->  submit (preventDefault)  ->  validação por campo
   ->  inválido?  ->  mensagem de erro específica no campo
   ->  tudo válido?  ->  mensagem de sucesso (rotulada como simulação)
```

### Etapa 1 — O HTML do formulário

Crie a seção de contato (na home ou em `src/contato.html`). Cada campo tem um `label`, o `input`/`textarea`, e um espaço para a mensagem de erro daquele campo:

```html
<section id="contato">
  <h2>Fale com o onboarding</h2>

  <form id="form-contato" novalidate>
    <div class="campo">
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome" required>
      <span class="erro" id="erro-nome" role="alert"></span>
    </div>

    <div class="campo">
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email" required>
      <span class="erro" id="erro-email" role="alert"></span>
    </div>

    <div class="campo">
      <label for="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem" required></textarea>
      <span class="erro" id="erro-mensagem" role="alert"></span>
    </div>

    <button type="submit">Enviar</button>
    <p id="status-form" role="status"></p>
  </form>

  <p><em>Este formulário é uma simulação de estudo. Não envia dados a nenhum servidor.</em></p>
</section>
```

Detalhes:

- Cada `input` tem um `label` ligado por `for`/`id` — clicar no rótulo foca o campo, e leitores de tela anunciam o campo corretamente.
- `required` está nos campos (conveniência nativa), mas o `<form>` tem `novalidate`: isso desliga as mensagens nativas do navegador para que as **suas** mensagens (controladas, em português, perto do campo) sejam as que aparecem. As duas camadas coexistem; `novalidate` só decide quem fala com o usuário.
- Cada campo tem um `<span class="erro" role="alert">` vazio, onde a mensagem específica vai aparecer. `role="alert"` faz leitores de tela anunciarem o erro assim que ele surge.

### Etapa 2 — O CSS dos estados

No `styles.css`, regras simples para erro e sucesso:

```css
.campo {
  margin-bottom: 16px;
}

.erro {
  color: #b91c1c;       /* vermelho com contraste adequado sobre branco */
  font-size: 0.9rem;
  display: block;
  margin-top: 4px;
}

input.invalido,
textarea.invalido {
  border: 1px solid #b91c1c;
}

#status-form {
  color: #166534;       /* verde escuro, legível */
  font-weight: bold;
}
```

Repare que o erro não depende só da cor: há o texto da mensagem e a borda no campo. Cor sozinha exclui quem não a distingue — o sinal precisa ser redundante (o cuidado de contraste do C07).

### Etapa 3 — A validação em JavaScript

No `src/app.js`, comece declarando os elementos que o handler vai usar, depois adicione as funções auxiliares e o handler de `submit` (o Trecho B):

```js
const form = document.querySelector("#form-contato");
const statusForm = document.querySelector("#status-form");

function emailPlausivel(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mostrarErro(campo, mensagem) {
  const input = document.querySelector(`#${campo}`);
  const erro = document.querySelector(`#erro-${campo}`);
  input.classList.add("invalido");
  erro.textContent = mensagem;     // textContent: nunca innerHTML
}

function limparErros() {
  document.querySelectorAll(".erro").forEach((el) => (el.textContent = ""));
  document.querySelectorAll(".invalido").forEach((el) => el.classList.remove("invalido"));
  statusForm.textContent = "";
}
```

Note o nome `statusForm`, não `status`: `status` é uma propriedade global do navegador (`window.status`), e usá-la faria a atribuição falhar **em silêncio** — a mensagem nunca apareceria, sem nenhum erro no console. Nomear o elemento de forma própria evita essa armadilha.

`limparErros()` é chamado no início de cada envio para zerar o estado anterior — sem isso, mensagens antigas ficariam grudadas na tela mesmo depois de corrigidas.

### Etapa 4 — Testar os casos

Abra no navegador e teste cada caso, conferindo a mensagem e o console (sem erros):

| Caso | Resultado esperado |
|---|---|
| Tudo vazio | Três erros específicos, um por campo. Sem "sucesso". |
| Só o nome preenchido | Erros em e-mail e mensagem. |
| E-mail = `asdf` | Erro no e-mail: formato inválido. |
| Nome com só espaços | Erro no nome (graças ao `.trim()`). |
| Tudo válido | Mensagem de sucesso **rotulada como simulação**. |
| Nome = `<script>oi</script>` | Se você ecoar o nome, ele aparece como texto literal, não executa. |

## O que pode dar errado?

### 1. Sucesso falso com campos vazios (INC-V01-017)

O sintoma da abertura: clicar em Enviar sem preencher e receber "sucesso". A causa é não validar antes de confirmar.

**Como evitar:** valide cada campo obrigatório e só mostre sucesso se **todos** passarem. Use uma variável `valido` que vira `false` ao primeiro erro.

### 2. Mensagem genérica (INC-V01-018)

"Erro. Preencha o formulário." obriga o usuário a adivinhar qual campo está errado.

**Como evitar:** uma mensagem por campo, perto do campo, dizendo exatamente o que corrigir.

### 3. Campo com só espaços passando como preenchido

`"   "` não é vazio para o JavaScript, mas é vazio para um humano. Sem `.trim()`, espaços em branco passam na validação.

**Como evitar:** aplique `.trim()` ao ler o valor e cheque contra `""`.

### 4. Input renderizado como HTML (XSS)

Ecoar o nome digitado com `innerHTML` permite que `<script>` ou `<img onerror=...>` seja executado.

**Como evitar:** `textContent` para qualquer coisa vinda do input. Sem exceção.

### 5. Fingir envio real sem backend

Mostrar "Mensagem enviada!" sem dizer que não há envio engana quem testa — e exagera a maturidade do projeto no portfólio.

**Como evitar:** a mensagem de sucesso declara que é simulação; o README repete o limite. Honestidade técnica.

## Debugging guiado

### Passo 1 — Testar o caso vazio primeiro

Antes de qualquer coisa, clique em Enviar com tudo vazio. Esse é o teste que pega o INC-V01-017. Se aparecer "sucesso", a validação não está rodando — confira se o handler está no evento `submit` e se a variável `valido` está sendo respeitada.

### Passo 2 — Conferir o console

Abra o console (F12). Um erro de `null` em `mostrarErro` geralmente significa que um `id` no HTML não bate com o seletor (`#erro-nome` etc.) — a mesma lição de seletor do C08. Corrija o `id`.

### Passo 3 — Testar o e-mail inválido

Digite `asdf`, depois `nome@`, depois `nome@exemplo.com`. Os dois primeiros devem dar erro; o último deve passar. Se `asdf` passa, revise a regex de `emailPlausivel`.

### Passo 4 — Testar entrada hostil

Digite `<script>alert(1)</script>` no nome e envie (com os outros campos válidos). Se você exibe o nome em algum lugar, ele deve aparecer como **texto literal**. Se um alerta aparecer, você está usando `innerHTML` em algum ponto — troque por `textContent`.

### Passo 5 — Confirmar que o sucesso é honesto

Preencha tudo corretamente e envie. A mensagem de sucesso deve deixar claro que é uma simulação. Se ela diz só "enviado com sucesso", ajuste o texto — não há envio.

## Code Review do Mestre Py

O Mestre Py leria o handler e o README com estas perguntas:

**Aprovaria sem comentário:**
- Validação no evento `submit` com `preventDefault`.
- `.trim()` nos valores antes de checar vazio.
- Uma mensagem de erro específica por campo, perto do campo.
- Sucesso só quando tudo é válido.
- Mensagem de sucesso rotulada como simulação.
- `textContent` para tudo que vem do input.
- README declarando que não há envio nem backend.

**Pediria ajuste:**
- Mensagem genérica: "'Preencha o formulário' não diz qual campo. Aponta o campo. Validar é orientar, não brigar." (INC-V01-018)
- Sucesso sem rótulo: "Você está dizendo 'enviado'. Enviado pra onde? Não tem servidor. Diz que é simulação."
- Validar só `required` nativo: "Tá bom como conveniência, mas suas mensagens você controla. Combina os dois."

**Reprovaria:**
- "Sucesso" com campos vazios (INC-V01-017 não resolvido).
- `innerHTML` recebendo o que o usuário digitou.
- README ou post sugerindo que o formulário "recebe contatos" ou "salva mensagens".
- Qualquer afirmação de que a validação no cliente "protege" ou "é segura".

**Resumo do Code Review:** "Um formulário honesto faz duas coisas: orienta quem preenche, com erro específico por campo, e não mente sobre o que aconteceu. Validação no cliente é para o usuário, não para o atacante — quem quer burlar, burla pelo DevTools. Então valide para ajudar, trate input como hostil (`textContent`, sempre), e seja claro que não há envio real. Segurança de verdade é no servidor, e isso é V03. Feedback honesto começa antes do backend existir."

## Mãos à Obra

Execute as tarefas na ordem. Teste cada caso no navegador.

---

**Tarefa 1 — Criar a seção/página de contato**

Adicione o `<section id="contato">` com o formulário da Etapa 1 (na home ou em `src/contato.html`). Confira que os três campos, os `label`, os `<span class="erro">` e o `<p id="status-form">` aparecem.

---

**Tarefa 2 — Adicionar o CSS dos estados**

No `styles.css`, adicione as regras da Etapa 2 (`.erro`, `.invalido`, `#status-form`). Confirme que a cor de erro tem bom contraste.

---

**Tarefa 3 — Escrever a validação**

No `src/app.js`, adicione `emailPlausivel`, `mostrarErro`, `limparErros` e o handler de `submit` (Trecho B).

---

**Tarefa 4 — Testar a tabela de casos**

Percorra a tabela da Etapa 4: vazio, parcial, e-mail inválido, só espaços, tudo válido, entrada hostil. Confirme a mensagem correta em cada caso e o console sem erros.

---

**Tarefa 5 — Confirmar o rótulo de simulação**

Releia a mensagem de sucesso e a nota abaixo do formulário. As duas devem deixar claro que não há envio real. Ajuste se necessário.

---

**Tarefa 6 — Adicionar a seção "Formulário de contato" ao README**

```markdown
## Formulário de contato

A home tem um formulário de contato de onboarding (nome, e-mail, mensagem) com
**validação no cliente**: campos obrigatórios e formato de e-mail são checados,
com mensagens de erro específicas por campo.

**Limitações (importante):**
- **Não há envio real nem backend.** O "sucesso" é uma simulação de estudo; nenhum
  dado é enviado, salvo ou processado.
- **Validação no cliente não é segurança.** Ela orienta o usuário, mas pode ser
  burlada pelo DevTools. Validação real é no servidor — assunto dos volumes futuros.

Para testar: abra a home e tente enviar com campos vazios, e-mail inválido e dados válidos.
```

---

**Tarefa 7 — Capturar os screenshots**

Salve dois prints: um com os erros visíveis (envio inválido) e um com o sucesso (envio válido, rótulo de simulação à vista).

---

**Tarefa 8 — Atualizar o diário técnico**

```markdown
## [DATA] — C10: formulário e validação

Criei um formulário de contato. Minha primeira versão dizia "sucesso" mesmo com
tudo vazio e aceitava "asdf" como e-mail. Aprendi a validar no evento submit (com
preventDefault), a usar .trim() para não aceitar só espaços, e a dar mensagens
específicas por campo. O mais importante: validação no cliente é orientação, não
segurança — dá pra burlar pelo DevTools. Usei textContent para o input (cuidado com
XSS) e deixei explícito que o envio é simulado (sem backend).
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 9 — Commitar**

```bash
git add src/contato.html src/index.html src/app.js src/styles.css README.md docs/diario-tecnico.md
git commit -m "feat(form): add simple validation"
```

(Inclua só os arquivos que você realmente alterou.)

## Critérios de aceitação

- [ ] Os campos obrigatórios (nome, e-mail, mensagem) são validados; vazio não passa.
- [ ] Campo com só espaços é tratado como vazio (`.trim()`).
- [ ] E-mail com formato inválido recebe feedback específico.
- [ ] Cada erro aparece perto do campo correspondente, com mensagem específica.
- [ ] O estado de sucesso só aparece quando tudo é válido e **declara que é simulação**.
- [ ] Nenhum dado do input é inserido com `innerHTML` (somente `textContent`).
- [ ] O README declara que não há envio real e que validação de cliente não é segurança.
- [ ] Commit `feat(form): add simple validation` realizado.

## Checklist de segurança

- [ ] Não há envio real de dados nem chamada a servidor.
- [ ] Nenhum dado do formulário é armazenado (sem `localStorage` de dados pessoais, sem nada).
- [ ] O conteúdo digitado é exibido com `textContent`, nunca `innerHTML`.
- [ ] O capítulo deixa explícito que validação no cliente **não** é segurança e pode ser burlada.
- [ ] Nenhuma promessa de proteção contra ataque é feita.

## Entrega de portfólio

### Entregas obrigatórias do C10

1. Formulário de contato (nome, e-mail, mensagem) com `label`, `required` e espaços de erro.
2. Validação em `src/app.js`: obrigatórios, e-mail plausível, mensagens específicas, sucesso só quando válido.
3. CSS dos estados de erro/sucesso em `src/styles.css`.
4. Seção "Formulário de contato" no `README.md` com as limitações.
5. Screenshots de erro e de sucesso.
6. Entrada no `docs/diario-tecnico.md`.
7. Commit `feat(form): add simple validation`.

### Screenshots ou diagramas esperados

Dois prints: um com os erros (envio inválido) e um com o sucesso (rótulo de simulação visível). São a evidência principal deste capítulo.

### Evidências esperadas

Checklist manual da tabela de casos (vazio, parcial, e-mail inválido, válido, entrada hostil), registrado no diário ou no PR.

### Limitações que devem aparecer

- Não há envio real, backend nem armazenamento.
- Validação no cliente é orientação, não segurança — pode ser burlada.
- Validação de e-mail confirma formato plausível, não que o e-mail existe.
- Validação no servidor, autenticação e envio real vêm do V03 em diante.

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Este esboco é para uso futuro, quando você quiser compartilhar o aprendizado. Não publique agora — o projeto ainda está em construção.*

---

**Gancho:** "Meu formulário não envia dados reais — mas já me ensinou a tratar erro com honestidade."

**Contexto:** Estou construindo o IntraStack Básico, um portal de onboarding fictício, para aprender desenvolvimento web do zero.

**Problema:** Minha primeira versão dizia "enviado com sucesso" mesmo com nome vazio e e-mail "asdf". Um formulário que mente sobre o que recebeu.

**O que aprendi:** Validar no evento `submit` (com `preventDefault`), usar `.trim()` para não aceitar só espaços, e dar mensagens **específicas** por campo (validar é orientar, não brigar). E a lição que vale para sempre: **validação no cliente é conforto, não segurança** — qualquer um burla pelo DevTools. Segurança real é no servidor. Tratei o input com `textContent` (cuidado com XSS) e deixei claro que o envio é simulado.

**Limitação honesta:** Sem backend, sem envio, sem armazenamento. Validação de cliente como feedback inicial. Projeto de estudo em andamento.

**Próximo passo:** C11 — revisar segredos, inputs e exposição pública antes de publicar.

**Link:** [quando pronto: link do commit ou da página publicada]

---

## Perguntas de revisão

1. Por que o handler usa o evento `submit` com `evento.preventDefault()` em vez de um `click` no botão? Que vantagem de acessibilidade o `submit` traz?

2. Qual é a diferença entre `required` no HTML e a validação em JavaScript? Por que usar os dois, e por que nenhum dos dois é "segurança"?

3. Um colega diz: "validei tudo no JavaScript, então o formulário está seguro". Onde está o erro desse raciocínio? Como alguém burlaria sua validação?

4. Por que aplicar `.trim()` ao valor antes de checar se está vazio? Que caso isso resolve?

5. Por que exibir o nome digitado com `innerHTML` é perigoso, e o que `textContent` muda? Que tipo de ataque isso previne?

6. O INC-V01-018 fala de mensagens genéricas. Reescreva "Erro: dados inválidos." em mensagens específicas para um formulário de nome, e-mail e mensagem.

7. Por que a mensagem de sucesso deste capítulo precisa dizer que é uma simulação? O que aconteceria com a credibilidade do projeto se ela dissesse apenas "enviado com sucesso"?

## Próximo passo

O formulário parou de mentir. Ele valida cada campo, aponta com precisão o que está errado, só confirma quando os dados fazem sentido — e é honesto ao dizer que não há envio real. Você também tratou o input como hostil, usando `textContent` para não abrir porta a XSS.

Esse último ponto é a ponte para o próximo capítulo. Até aqui, você cuidou de segurança de forma pontual (`textContent` aqui, `rel="noopener"` lá). O **Capítulo 11** junta tudo numa revisão de segurança antes de publicar: o que **não** pode ir para um repositório público (segredos, chaves, dados reais), como revisar input e exposição, e como olhar o próprio projeto com a pergunta "o que aqui não deveria estar visível para o mundo?".

Antes de o IntraStack ir para o ar de verdade, ele precisa passar por essa revisão.
