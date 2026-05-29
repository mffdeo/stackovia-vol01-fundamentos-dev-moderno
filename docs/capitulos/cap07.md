---
title: "Capítulo 07 — CSS moderno e layout responsivo"
status: Preview
volume: 1
capitulo: 7
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 07 — CSS moderno e layout responsivo

## Abertura

A home do IntraStack tinha estrutura. Depois do C06, o `src/index.html` estava semântico: `header`, `main`, `footer`, headings em ordem, links honestos. Você abriu no seu notebook, viu o texto empilhado de cima a baixo e pensou: "agora é só deixar bonito".

Passou a tarde escrevendo CSS. Largura de 960 pixels no conteúdo, cards lado a lado, um cinza discreto nos avisos. No seu monitor de 1080p, ficou alinhado, espaçado, profissional. Você tirou um print, colou no canal da equipe e mandou o link para o Mestre Py.

A resposta veio de um lugar inesperado: o celular dele.

"Abri no telefone agora, no ônibus. A página tem rolagem horizontal — preciso arrastar de lado pra ler. Os cards de 'Links úteis' saem da tela pela direita e o texto do rodapé tá cinza claro demais, quase não dá pra ler na luz do dia. No seu monitor deve estar lindo. No aparelho que metade da equipe vai usar pra abrir isso, tá quebrado."

Você abriu o DevTools, ativou o modo dispositivo, escolheu um viewport de celular. E lá estava: a barra de rolagem horizontal que você nunca tinha visto, porque nunca tinha testado fora da sua própria tela.

Este capítulo resolve isso — e ensina a não repetir o erro.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | Tornar a home legível em telas comuns (C07) |
| Tarefa | Aplicar CSS moderno e responsivo à home do IntraStack, sem framework |
| Definição de pronto | Home com espaçamento consistente, contraste legível e sem rolagem horizontal em desktop e mobile, com screenshots das duas larguras |

O tamanho desta sprint é o de um capítulo. Cada leitor avança no próprio ritmo; o que importa é terminar com uma home que se leia bem no notebook **e** no celular, com a evidência (screenshots) das duas situações.

## Problema de negócio

Quem entra no IntraStack pode abrir o portal de qualquer lugar: notebook no escritório, celular no transporte, tablet em casa. Se a página só funciona na largura exata do monitor de quem a construiu, ela não é confiável — é um protótipo que parece pronto.

Uma home que cria rolagem horizontal no celular ou esconde informação atrás de contraste fraco gera dois custos práticos: o conteúdo deixa de cumprir sua função (orientar quem chega) e o projeto perde credibilidade no momento em que mais precisa dela — quando alguém abre pela primeira vez. Pior: como print de portfólio, uma página quebrada no mobile passa a mensagem oposta da que você quer.

Não é sobre fazer a página sofisticada. É sobre fazer uma página que continue legível quando sai do seu monitor.

## O que será construído neste capítulo

Ao final deste capítulo, o IntraStack básico terá:

- `src/styles.css` — uma folha de estilo própria, conectada ao `index.html`, construída em cinco etapas: base tipográfica, largura máxima, escala de espaçamento, layout das seções e media query.
- `src/index.html` ajustado para carregar o CSS (uma linha de `<link>` no `head`) e, se necessário, pequenos agrupamentos para o layout.
- `assets/screenshots/home-desktop.png` e `assets/screenshots/home-mobile.png` — a evidência de que a página foi testada em duas larguras.
- `docs/notas-css.md` — as decisões de layout e espaçamento documentadas.
- Entrada no diário técnico registrando o que aprendeu sobre responsividade e contraste.
- Commit `feat(css): add responsive layout`.

O que **não** entra: Tailwind, shadcn/ui, CSS-in-JS, pré-processadores, animações avançadas, design system completo. CSS simples e legível agora; ferramentas e sistema visual vêm no V02. O objetivo é uma base que aguente o conteúdo em telas reais.

## Cena/tensão de abertura

Antes de escrever o CSS certo, olhe o CSS que quebrou.

Este foi o `src/styles.css` da primeira tentativa — o que ficou bom no monitor do autor:

```css
/* src/styles.css — primeira tentativa (NÃO é o que você vai criar) */
body {
  font-family: Arial;
  width: 960px;          /* largura fixa */
}

header {
  width: 960px;
}

#links-uteis ul {
  display: flex;         /* cards lado a lado, sem quebra */
}

#links-uteis li {
  width: 300px;          /* 3 itens de 300px = 900px fixos */
  margin: 7px;
  padding: 13px;
}

#equipe li {
  margin: 22px;          /* espaçamento diferente do de cima */
  padding: 5px;
}

footer small {
  color: #cccccc;        /* cinza claro sobre fundo branco */
}
```

Três coisas estão erradas aqui, e cada uma corresponde a um problema real que o Mestre Py apontou:

1. **`width: 960px` fixo no `body` e no `header`.** Numa tela menor que 960 pixels — qualquer celular — o conteúdo não cabe. O browser cria rolagem horizontal para mostrar o que sobra. É o INC-V01-010: funciona no monitor, quebra no aparelho.
2. **Espaçamentos avulsos: `7px`, `13px`, `22px`, `5px`.** Cada bloco recebeu um valor escolhido na hora, "no olho". A página parece improvisada mesmo com o conteúdo certo, e qualquer ajuste futuro vira tentativa e erro. É o INC-V01-011.
3. **`color: #cccccc` no rodapé.** Cinza muito claro sobre fundo branco. No monitor com brilho alto e ambiente escuro, dá pra ler. No celular sob luz do dia, some. É o INC-V01-012.

Os três erros têm a mesma raiz: cada decisão foi tomada olhando só para uma tela, num único ambiente. CSS bom é CSS que sobrevive fora do contexto de quem o escreveu.

## Exemplo antes do conceito

Dois trechos, uma comparação. Os dois centralizam o conteúdo e limitam a largura — mas só um continua funcionando no celular.

**Trecho A — largura fixa:**

```css
.conteudo {
  width: 960px;
  margin: 0 auto;
}
```

Por que alguém escreve isso? Porque no monitor do autor `960px` "fica num tamanho bom". O `margin: 0 auto` centraliza. Visualmente, resolve. Mas `width: 960px` é uma ordem absoluta: o bloco terá 960 pixels **sempre**, mesmo numa tela de 360 pixels de largura. O que não cabe vira rolagem horizontal.

**Trecho B — largura máxima fluida:**

```css
.conteudo {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
}
```

A diferença é uma palavra: `max-width` no lugar de `width`. A leitura muda completamente:

- `max-width: 960px` diz "ocupe até 960 pixels, mas nunca mais que isso". Numa tela larga, o conteúdo para em 960 e fica centralizado. Numa tela de 360 pixels, o bloco encolhe para caber — sem rolagem horizontal.
- `padding: 0 16px` garante um respiro nas laterais quando a tela é estreita, pra o texto não encostar na borda.

`width` fixa o tamanho. `max-width` define um limite e deixa o conteúdo se adaptar abaixo dele. Essa única troca elimina a maior parte dos problemas de layout em tela pequena.

Agora que você viu a diferença, vamos nomear os conceitos.

## Conceitos essenciais

### Conceito-chave 1 — Como o CSS chega até o HTML

CSS (Cascading Style Sheets) é a linguagem que descreve como o HTML deve aparecer. O HTML diz o que cada coisa é; o CSS diz como ela se apresenta.

Há três formas de aplicar CSS, e só uma é recomendada para o projeto:

- **Inline** (`<p style="color: red">`): estilo direto no elemento. Mistura estrutura e aparência, não reaproveita nada. Evite.
- **Interno** (`<style>` dentro do `<head>`): aceitável para teste rápido, mas o estilo fica preso a um arquivo HTML.
- **Externo** (arquivo `.css` separado, ligado por `<link>`): a forma profissional. Um arquivo de estilo, reutilizável, versionável, fácil de revisar.

Você vai usar a forma externa. No `<head>` do `index.html`:

```html
<link rel="stylesheet" href="styles.css">
```

Como `styles.css` está na mesma pasta `src/` que o `index.html`, o caminho relativo é só o nome do arquivo. (É o mesmo raciocínio de caminho relativo do C03.)

### Conceito-chave 2 — Seletores: dizer a quem o estilo se aplica

Uma regra de CSS tem duas partes: o **seletor** (a quem se aplica) e o **bloco de declarações** (o que muda).

```css
seletor {
  propriedade: valor;
}
```

Os seletores que bastam para o V01:

| Seletor | Aplica-se a | Exemplo |
|---|---|---|
| de tag | todos os elementos daquela tag | `p { ... }` |
| de classe | elementos com `class="nome"` | `.card { ... }` |
| de id | o elemento com `id="nome"` (único) | `#equipe { ... }` |
| descendente | elementos dentro de outro | `main p { ... }` |

A regra prática: prefira **tag** e **classe**. Use `id` para layout só quando o elemento já tem um `id` por motivo de âncora (como as `section` da home do C06). Não invente uma hierarquia complicada de seletores — no V01, simples e legível vence.

### Conceito-chave 3 — Box model: todo elemento é uma caixa

Cada elemento na página é uma caixa retangular com quatro camadas, de dentro para fora:

```text
┌─────────────────────────────┐  ← margin (espaço externo, separa de outras caixas)
│  ┌───────────────────────┐  │  ← border (a borda da caixa)
│  │  ┌─────────────────┐  │  │  ← padding (espaço interno, entre borda e conteúdo)
│  │  │   conteúdo      │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

- **`margin`**: empurra a caixa para longe das vizinhas. Espaço **fora**.
- **`border`**: a linha da borda.
- **`padding`**: afasta o conteúdo da borda. Espaço **dentro**.

Um detalhe que evita muita dor de cabeça: por padrão, `width` mede só o conteúdo, e `padding` e `border` são somados **por fora**. Isso faz uma caixa de `width: 300px` com `padding: 20px` ocupar 340px reais — e estourar contas de layout. A correção padrão, aplicada uma vez no topo do arquivo:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

Com `box-sizing: border-box`, `width` passa a incluir padding e borda. O que você pede é o que você vê. Use sempre.

### Conceito-chave 4 — Layout fluido: `max-width` em vez de `width`

Este é o conceito central do capítulo, e você já viu o exemplo. Recapitulando a regra:

- Para **limitar** a largura de um bloco (conteúdo central, container), use `max-width`. O bloco encolhe abaixo do limite quando a tela é estreita.
- Evite `width` em pixels fixos para blocos de layout. Largura fixa é a causa número um de rolagem horizontal no celular.
- Quando precisar que um elemento ocupe o espaço disponível, use `width: 100%` (relativo ao pai) em vez de um número fixo.

O layout fluido é o oposto do layout rígido: em vez de dizer "este bloco tem exatamente X pixels", você diz "este bloco ocupa o espaço disponível, até no máximo X".

### Conceito-chave 5 — Flexbox para alinhar em linha, com quebra

Flexbox é o jeito moderno de alinhar elementos numa linha (ou coluna) e distribuir espaço entre eles. Para o V01, você precisa de uma fração pequena dele.

Aplicado a um container, `display: flex` coloca os filhos lado a lado:

```css
.lista-cards {
  display: flex;
  flex-wrap: wrap;   /* permite quebrar para a linha de baixo */
  gap: 16px;         /* espaço entre os itens, sem usar margin */
}
```

Duas propriedades fazem o trabalho pesado da responsividade aqui:

- **`flex-wrap: wrap`**: sem isso, os itens tentam ficar todos na mesma linha e encolhem ou estouram. Com `wrap`, quando não cabem, descem para a próxima linha. É o que evita os cards saindo da tela no celular.
- **`gap`**: cria espaço entre os itens sem você ter que calcular margens. Substitui o `margin` avulso e mantém consistência.

Você não precisa de Grid, nem de `justify-content` avançado, nem de `align-items` complexo para o V01. `flex` + `flex-wrap: wrap` + `gap` resolve a home.

### Conceito-chave 6 — Escala de espaçamento: pare de chutar valores

O INC-V01-011 acontece quando cada bloco recebe um espaçamento escolhido na hora: `7px` aqui, `22px` ali, `13px` acolá. A página fica visualmente desorganizada e impossível de manter.

A solução é uma **escala**: um pequeno conjunto de valores que você reutiliza em vez de inventar números. Para o V01, uma escala baseada em 8 pixels é suficiente:

```text
4px   →  espaço mínimo (entre rótulo e ícone, por exemplo)
8px   →  espaço pequeno
16px  →  espaço padrão (o mais usado)
24px  →  espaço entre blocos relacionados
32px  →  espaço entre seções
```

A regra: quando for definir um `margin`, `padding` ou `gap`, escolha um valor **da escala**, não um número aleatório. Se você só usa `8px`, `16px`, `24px` e `32px`, a página inteira respira no mesmo ritmo — e qualquer ajuste futuro é previsível.

### Conceito-chave 7 — Contraste: legibilidade não é estética

O INC-V01-012 é o contraste fraco: texto cinza claro (`#cccccc`) sobre fundo branco. No monitor de quem escolheu a cor, parecia "discreto e elegante". Para quem lê no celular sob luz do dia, é informação que some.

A regra prática para o V01 (sem entrar em WCAG completo, que fica para o V02):

- Texto principal: cor escura sobre fundo claro. Um cinza-escuro como `#1f2937` sobre branco é confortável e menos agressivo que preto puro.
- Texto secundário (rodapé, legendas): pode ser mais claro, mas **não tão claro que custe esforço para ler**. `#6b7280` (cinza médio) ainda é legível; `#cccccc` não é.
- Nunca dependa **só** da cor para passar informação. Um aviso importante deve ter também um rótulo textual ("Aviso:", "Atenção:"), não só uma cor diferente.

O teste do Mestre Py: "Se você precisa apertar os olhos para ler, o usuário também precisa. Design que cobra esforço para ler está cobrando do usuário."

## Construindo o CSS em cinco etapas

Você não vai escrever o `styles.css` inteiro de uma vez. Vai construir em cinco blocos, abrindo o browser depois de cada um. Essa ordem importa: cada etapa só faz sentido depois da anterior.

```text
1. base tipográfica   → texto legível, box-sizing, cor de fundo
2. largura máxima      → conteúdo centralizado, sem esticar demais
3. escala de espaçamento → respiro consistente entre seções
4. layout das seções   → cards/listas com flex + wrap + gap
5. media query         → ajustes finos para tela pequena
```

A seguir, o `src/styles.css` completo, anotado etapa por etapa. Você pode escrever direto a versão final, mas leia os comentários para entender cada decisão.

```css
/* src/styles.css — IntraStack básico (C07) */

/* ===== Etapa 1: base tipográfica ===== */
*, *::before, *::after {
  box-sizing: border-box;        /* width passa a incluir padding e borda */
}

body {
  margin: 0;                     /* remove a margem padrão do browser */
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;              /* respiro entre linhas, melhora a leitura */
  color: #1f2937;                /* cinza-escuro: bom contraste, menos duro que preto */
  background-color: #ffffff;
}

/* ===== Etapa 2: largura máxima e centralização ===== */
header,
main,
footer {
  max-width: 960px;              /* limite, não largura fixa */
  margin: 0 auto;                /* centraliza horizontalmente */
  padding: 0 16px;               /* respiro lateral em telas estreitas */
}

/* ===== Etapa 3: escala de espaçamento ===== */
main section {
  margin-bottom: 32px;           /* espaço entre seções (escala) */
}

h1, h2 {
  margin-bottom: 16px;           /* espaço padrão abaixo dos títulos */
}

p {
  margin-bottom: 16px;
}

header {
  padding-top: 24px;
  padding-bottom: 24px;
}

/* ===== Etapa 4: layout das seções ===== */
nav ul {
  list-style: none;              /* tira os marcadores da navegação */
  padding: 0;
  display: flex;
  flex-wrap: wrap;               /* links quebram de linha em vez de estourar */
  gap: 16px;                     /* espaço consistente entre os links */
}

#links-uteis ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;               /* cards descem de linha quando não cabem */
  gap: 16px;
}

#links-uteis li {
  flex: 1 1 240px;               /* cresce/encolhe, base de 240px por card */
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

a {
  color: #1d4ed8;                /* azul com bom contraste sobre branco */
}

/* ===== Etapa 5: contraste e ajustes finos ===== */
footer {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  padding-bottom: 32px;
  color: #6b7280;                /* cinza médio: secundário, mas ainda legível */
}

footer small {
  color: #6b7280;                /* NUNCA #cccccc: some sob luz do dia */
}

/* ===== Media query: ajustes para tela pequena ===== */
@media (max-width: 600px) {
  header,
  main,
  footer {
    padding-left: 8px;
    padding-right: 8px;          /* respiro lateral menor no celular — valor da escala (8) */
  }

  main section {
    margin-bottom: 24px;         /* seções um pouco mais próximas em tela pequena */
  }
}
```

Algumas decisões que valem explicar:

**`font-family: system-ui, ...`:** usa a fonte do próprio sistema operacional do usuário (San Francisco no Mac, Segoe UI no Windows, Roboto no Android). Carrega instantânea, não depende de baixar fonte externa, e fica nativa em cada dispositivo. Para o V01, é a escolha mais simples e robusta. (Tipografia customizada com `@font-face` é assunto do V02.)

**`max-width: 960px` no `header`, `main` e `footer`:** em vez de um container extra, aplicamos o limite diretamente nos três landmarks semânticos que o C06 criou. O conteúdo nunca passa de 960px numa tela larga e encolhe sem rolagem numa tela estreita.

**`flex: 1 1 240px` nos cards:** lê-se "pode crescer, pode encolher, largura-base de 240px". Numa tela larga, três cards de ~300px ficam lado a lado; numa tela de celular, eles caem um embaixo do outro automaticamente, porque 240px não cabe três vezes. Combinado com `flex-wrap: wrap`, é a responsividade dos cards sem nenhuma media query específica para eles.

**A media query `@media (max-width: 600px)`:** só entra em ação em telas de até 600 pixels. Aqui ela faz ajustes finos (menos respiro lateral, seções mais próximas) — não reconstrói o layout. Isso é proposital: como o layout já é fluido por `max-width` e `flex-wrap`, a media query corrige detalhes, não salva um layout quebrado. Esse é o sinal de um CSS responsivo bem feito: a media query é tempero, não estrutura.

**Por que `600px`?** É um breakpoint comum para separar "telas de celular" de "telas maiores". Não há número mágico — o critério é onde o seu layout começa a ficar apertado. Você descobre isso testando no DevTools, não decorando valores.

## O que pode dar errado?

### 1. Rolagem horizontal no celular (INC-V01-010)

O sintoma clássico: a página tem uma barra de rolagem na horizontal, e você precisa arrastar de lado para ver o conteúdo da direita. Quase sempre a causa é uma largura fixa (`width: 960px`) ou um elemento que estoura o container (uma imagem sem `max-width`, um bloco com `width: 100%` mais padding sem `box-sizing: border-box`).

**Como evitar:** use `max-width` em vez de `width` nos blocos de layout; aplique `box-sizing: border-box` no topo; teste no DevTools em viewport de celular **antes** de considerar pronto.

### 2. Espaçamento improvisado (INC-V01-011)

Quando cada `margin` e `padding` recebe um número diferente escolhido no olho, a página parece desalinhada mesmo com o conteúdo certo, e qualquer ajuste vira tentativa e erro.

**Como evitar:** use a escala (`8 / 16 / 24 / 32`). Antes de digitar um valor de espaçamento, pergunte: "esse número está na escala?" Se não estiver, provavelmente você está chutando.

### 3. Contraste fraco (INC-V01-012)

Texto cinza-claro sobre fundo branco parece elegante no monitor de quem escolheu, mas some para quem lê em outra tela ou sob outra luz.

**Como evitar:** texto principal escuro sobre fundo claro; texto secundário no máximo até um cinza médio legível (`#6b7280`); nunca `#cccccc` ou mais claro para texto que precisa ser lido. Teste: leia a página com o brilho da tela baixo.

### 4. CSS que só funciona numa largura

Você ajusta tudo olhando para o seu monitor, fica perfeito, e nunca redimensiona a janela. O layout está "calibrado" para uma largura só.

**Como evitar:** durante a construção, arraste a borda da janela do browser para estreitá-la e veja o layout reagir. Se ele quebra antes de chegar ao tamanho de um celular, há largura fixa em algum lugar.

### 5. Valores mágicos e `!important`

Quando o CSS não faz o que você quer, a tentação é jogar números arbitrários (`margin-top: 37px`) ou `!important` para forçar. Isso resolve na hora e cria um problema permanente: ninguém entende de onde veio o número, e o `!important` torna o próximo ajuste ainda mais difícil.

**Como evitar:** se precisa de `!important` para algo simples, normalmente há um seletor conflitante que é melhor entender do que sobrescrever. No V01, com CSS pequeno, você quase nunca precisa dele.

## Debugging guiado

### Passo 1 — Abrir o DevTools e o modo dispositivo

Abra o `src/index.html` no browser. Pressione `F12` (ou `Ctrl+Shift+I` / `Cmd+Option+I`) para abrir o DevTools.

Procure o ícone de dispositivo (um celular/tablet, geralmente no canto superior esquerdo do painel; atalho `Ctrl+Shift+M` / `Cmd+Shift+M`). Ele liga o modo de simulação de viewport: você pode escolher larguras de celular, tablet e desktop, ou arrastar para uma largura qualquer.

### Passo 2 — Procurar rolagem horizontal

No modo dispositivo, escolha uma largura de celular (por exemplo, 375px). Olhe se aparece uma barra de rolagem na parte de baixo da área da página.

Se aparecer: há algo mais largo que a tela. Para encontrar o culpado, um truque rápido — adicione temporariamente no console do DevTools ou no topo do CSS:

```css
* { outline: 1px solid red; }
```

Cada elemento ganha um contorno vermelho. O elemento que ultrapassa a borda direita da tela é o que está causando a rolagem. Remova o `outline` depois de achar.

### Passo 3 — Identificar largura fixa

Encontrado o elemento que estoura, clique nele no painel "Elements" do DevTools e olhe o painel de estilos à direita. Procure por `width:` com valor em pixels.

A correção quase sempre é trocar `width: NNNpx` por `max-width: NNNpx`, ou remover a largura fixa e deixar o elemento fluir. Edite no próprio DevTools para testar na hora — depois leve a mudança para o arquivo `styles.css`.

### Passo 4 — Conferir os espaçamentos contra a escala

Leia o `styles.css` e localize todos os valores de `margin`, `padding` e `gap`. Cada um deveria ser `4`, `8`, `16`, `24` ou `32`.

Se encontrar um `7px`, `13px`, `22px` ou similar: é resíduo de chute. Troque pelo valor mais próximo da escala. A página fica mais consistente e você passa a confiar nos números.

### Passo 5 — Testar o contraste

Com a página aberta, baixe o brilho da tela ou abra o seletor de cores do DevTools sobre o texto do rodapé. Procure por qualquer cor de texto mais clara que `#6b7280`.

Um teste simples e honesto: tire um screenshot, abra num editor de imagem e converta para escala de cinza. Se algum texto desaparecer no cinza, o contraste depende demais da cor — ajuste para uma cor mais escura.

## Code Review do Mestre Py

O Mestre Py leria o `styles.css` e a home no celular com três perguntas:

**Aprovaria sem comentário:**
- `box-sizing: border-box` aplicado no topo.
- `max-width` (não `width` fixo) nos blocos de layout.
- Espaçamentos seguindo a escala (`8 / 16 / 24 / 32`).
- `flex-wrap: wrap` e `gap` nos cards e na navegação.
- Texto principal escuro; secundário em cinza ainda legível.
- Screenshots de desktop e mobile no repositório.

**Pediria ajuste:**
- Espaçamento fora da escala: "Por que `13px` aqui e `7px` ali? Escolhe da escala — `8`, `16`, `24`. Consistência é manutenção preventiva." (INC-V01-011)
- Contraste fraco: "Esse cinza do rodapé eu não leio no celular ao sol. Escurece pra pelo menos `#6b7280`." (INC-V01-012)
- `width` fixo em pixel num bloco de layout: "Troca por `max-width`. Senão quebra na primeira tela menor que esse número."

**Reprovaria:**
- Página com rolagem horizontal no celular: "Não testou no mobile. 'Funciona na minha tela' não é critério de qualidade." (INC-V01-010)
- CSS calibrado para uma única largura, sem nenhuma adaptação.
- Texto importante distinguido **só** por cor, sem rótulo textual.

**Resumo do Code Review:** "CSS bom é CSS que sobrevive fora do seu monitor. Eu não preciso que a página seja bonita no V01 — preciso que ela seja legível no notebook, no celular e sob luz ruim, com espaçamento que não pareça improvisado. `max-width` em vez de `width`, uma escala de espaçamento, contraste honesto e um teste real no DevTools. Isso é o suficiente. Tailwind e design system são conversa do V02."

## Mãos à Obra

Execute as tarefas na ordem. Para cada etapa de CSS, abra o browser e confira o resultado antes de seguir.

---

**Tarefa 1 — Conectar o CSS ao HTML**

No `<head>` do `src/index.html`, adicione a linha de `<link>` logo após o `<title>`:

```html
<title>IntraStack Básico — Portal de Onboarding</title>
<link rel="stylesheet" href="styles.css">
```

Crie o arquivo `src/styles.css` vazio por enquanto e abra o `index.html` no browser. Nada muda visualmente ainda — mas se você adicionar `body { background: #f5f5f5; }` ao CSS e a cor de fundo mudar, a conexão está funcionando. (Remova esse teste depois.)

---

**Tarefa 2 — Etapa 1: base tipográfica**

Escreva o bloco da Etapa 1 (do `box-sizing` até o `body`). Abra no browser: o texto deve ficar com mais respiro entre linhas e a cor um cinza-escuro em vez de preto puro.

---

**Tarefa 3 — Etapa 2: largura máxima**

Adicione o bloco da Etapa 2 (`max-width` no `header`, `main`, `footer`). Abra no browser numa janela larga: o conteúdo agora para no centro, sem esticar de ponta a ponta. Arraste a janela para estreitar — o conteúdo encolhe sem rolagem horizontal.

---

**Tarefa 4 — Etapa 3: escala de espaçamento**

Adicione o bloco da Etapa 3. As seções e títulos ganham respiro consistente. Confira que todos os valores são da escala (`16`, `24`, `32`).

---

**Tarefa 5 — Etapa 4: layout das seções**

Adicione o bloco da Etapa 4 (`flex`, `flex-wrap`, `gap`, os cards de `#links-uteis`). Abra no browser: a navegação fica em linha, os cards ficam lado a lado em tela larga.

---

**Tarefa 6 — Etapa 5 + media query**

Adicione o bloco da Etapa 5 (contraste do rodapé) e a media query. Confira que o rodapé está legível e que, em tela estreita, o respiro lateral diminui um pouco.

---

**Tarefa 7 — Testar no DevTools (desktop e mobile)**

Abra o DevTools, ative o modo dispositivo (`Ctrl+Shift+M` / `Cmd+Shift+M`).

- Em largura de **desktop** (ou janela normal): conteúdo centralizado, cards lado a lado, sem rolagem horizontal.
- Em largura de **celular** (ex.: 375px): conteúdo em coluna única, cards empilhados, **sem** rolagem horizontal, texto do rodapé legível.

Se aparecer rolagem horizontal no celular, volte ao Passo 2 do debugging guiado.

---

**Tarefa 8 — Capturar os screenshots**

Com a página aberta:

- Em largura de desktop, salve um screenshot como `assets/screenshots/home-desktop.png`.
- No modo dispositivo (celular), salve como `assets/screenshots/home-mobile.png`.

No Chrome, você pode usar o menu de três pontos do modo dispositivo → "Capture screenshot" para pegar exatamente a viewport simulada.

---

**Tarefa 9 — Criar `docs/notas-css.md`**

```markdown
# Notas — CSS da home do IntraStack

## Estrutura adotada
- CSS externo (`styles.css`) conectado por `<link>`.
- `box-sizing: border-box` global.
- `max-width: 960px` nos landmarks (header/main/footer), centralizado.
- Layout dos cards com flex + flex-wrap + gap.
- Uma media query (`max-width: 600px`) para ajustes finos.

## Decisões
- `max-width` em vez de `width` fixo: evita rolagem horizontal no mobile.
- Escala de espaçamento 8/16/24/32 — sem valores avulsos.
- Contraste: texto principal #1f2937, secundário #6b7280; nunca #cccccc.
- Fonte do sistema (system-ui) — sem fonte externa no V01.

## Limitações
- Sem framework (Tailwind/shadcn) — vem no V02.
- Sem design system, sem tokens finais.
- Sem acessibilidade profunda (WCAG completo, ARIA) — fica para V02.
- Sem animações.

## Testado em
- Desktop (janela larga) — screenshot home-desktop.png
- Mobile simulado (~375px, DevTools) — screenshot home-mobile.png

## Próximo passo
- C08 adiciona interação básica com JavaScript.
```

---

**Tarefa 10 — Atualizar o diário técnico**

Adicione ao `docs/diario-tecnico.md`:

```markdown
## [DATA] — C07: CSS responsivo

Apliquei CSS à home. Aprendi que `width` fixo era a causa da rolagem horizontal
no celular — troquei por `max-width` e o layout passou a encolher sem quebrar.
Adotei uma escala de espaçamento (8/16/24/32) em vez de chutar números.
Corrigi o contraste do rodapé: o cinza claro sumia sob luz do dia.
Testei no DevTools em desktop e mobile e salvei os dois screenshots.
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 11 — Commitar**

```bash
git add src/styles.css src/index.html docs/notas-css.md docs/diario-tecnico.md assets/screenshots/
git commit -m "feat(css): add responsive layout"
```

`feat` porque é funcionalidade nova; `css` como escopo. Se quiser um PR dedicado, crie uma branch `feat/css-responsivo` no mesmo modelo do C06.

---

**Tarefa 12 — Atualizar o README**

Adicione uma seção curta com os dois prints:

```markdown
## Layout responsivo (C07)

A home do IntraStack agora tem CSS responsivo, sem framework.

| Desktop | Mobile |
|---|---|
| ![Home desktop](assets/screenshots/home-desktop.png) | ![Home mobile](assets/screenshots/home-mobile.png) |

Limitações: layout simples, sem design system. Tailwind e sistema visual vêm no V02.
```

## Critérios de aceitação

- [ ] `src/styles.css` existe e está conectado ao `index.html` por `<link>`.
- [ ] A home é legível em desktop e em mobile (testado no DevTools).
- [ ] Não há rolagem horizontal inesperada em viewport de celular.
- [ ] Os blocos de layout usam `max-width`, não `width` fixo em pixel.
- [ ] `box-sizing: border-box` está aplicado.
- [ ] Os espaçamentos seguem a escala (`8 / 16 / 24 / 32`) — sem valores avulsos.
- [ ] O contraste do texto é legível; nenhum texto usa cor mais clara que `#6b7280`.
- [ ] `assets/screenshots/home-desktop.png` e `home-mobile.png` existem.
- [ ] `docs/notas-css.md` criado com decisões e limitações.
- [ ] Commit `feat(css): add responsive layout` realizado.

## Checklist de segurança

- [ ] O CSS não importa folha de estilo externa de origem desconhecida (`@import url(...)` de terceiros).
- [ ] Nenhuma fonte ou recurso é carregado de domínio suspeito; o capítulo usa fonte do sistema.
- [ ] Os links da página continuam revisados (herdados do C06): `.example` ou marcados como fictícios, com `rel="noopener"` nos que abrem nova aba.
- [ ] Os screenshots não capturam dados reais, abas com informação pessoal ou conteúdo de sistema interno.

## Entrega de portfólio

### Entregas obrigatórias do C07

1. `src/styles.css` — CSS responsivo construído nas cinco etapas, com `max-width`, escala de espaçamento e media query.
2. `src/index.html` atualizado com o `<link>` para o CSS.
3. `assets/screenshots/home-desktop.png` e `assets/screenshots/home-mobile.png` — evidência das duas larguras.
4. `docs/notas-css.md` — decisões de layout, espaçamento e contraste documentadas.
5. Entrada no `docs/diario-tecnico.md`.
6. Commit `feat(css): add responsive layout`.

### Screenshots ou diagramas esperados

Diferente dos capítulos anteriores, aqui os screenshots são **obrigatórios** — eles são a evidência de que a página foi testada em duas larguras. Um print de desktop e um de mobile (simulado no DevTools) são suficientes.

### Evidências esperadas

Checklist de viewports testadas (desktop e mobile), registrado no diário ou na descrição do PR. Opcionalmente, o resultado do teste de contraste em escala de cinza.

### Limitações que devem aparecer

- Sem framework: Tailwind e shadcn/ui vêm no V02.
- Sem design system nem tokens finais.
- Sem acessibilidade profunda (WCAG completo, ARIA verificado): fica para o V02.
- Layout simples, testado em larguras comuns, não em todos os dispositivos.

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Este esboco é para uso futuro, quando você quiser compartilhar o aprendizado. Não publique agora — o projeto ainda está em construção.*

---

**Gancho:** "Minha página funcionava perfeitamente no meu monitor. Até eu abrir no celular e ver a rolagem horizontal."

**Contexto:** Estou construindo o IntraStack Básico — um portal de onboarding fictício para aprender desenvolvimento web do zero.

**Problema:** O CSS estava calibrado para a largura exata do meu notebook. No celular, os cards saíam da tela, dava rolagem horizontal e o texto do rodapé estava cinza claro demais para ler sob luz do dia.

**O que aprendi:** Três trocas resolveram quase tudo — `max-width` no lugar de `width` fixo (fim da rolagem horizontal), uma escala de espaçamento (`8/16/24/32`) no lugar de números chutados, e contraste honesto no texto. E a lição maior: "funciona na minha tela" não é critério de qualidade. Layout responsivo se testa em viewport real, não no monitor de quem escreveu.

**Limitação honesta:** Sem framework, sem design system, sem acessibilidade profunda. CSS simples, projeto de estudo em andamento.

**Próximo passo:** C08 adiciona interação básica com JavaScript.

**Link:** [quando pronto: link do commit ou da página publicada]

---

## Perguntas de revisão

1. Qual é a diferença prática entre `width: 960px` e `max-width: 960px` para um bloco de conteúdo? Em qual situação a diferença aparece?

2. O que `box-sizing: border-box` muda no cálculo do tamanho de um elemento, e por que isso evita erros de layout?

3. Um colega definiu `margin: 7px` numa seção, `13px` em outra e `22px` numa terceira. Que problema isso cria e como você corrigiria usando o conceito deste capítulo?

4. Para que servem `flex-wrap: wrap` e `gap` num container flex? O que aconteceria com os cards de "Links úteis" no celular sem o `flex-wrap: wrap`?

5. Por que `color: #cccccc` para o texto do rodapé é um problema, mesmo que pareça legível no seu monitor? Como você decidiria uma cor melhor?

6. A media query deste capítulo faz apenas ajustes finos, não reconstrói o layout. Por que isso é sinal de um CSS responsivo bem feito, e o que indicaria que a media query está "salvando" um layout quebrado?

7. No DevTools, você encontra rolagem horizontal numa viewport de celular. Descreva o processo para encontrar o elemento culpado e corrigi-lo.

## Próximo passo

A home do IntraStack agora tem estrutura **e** aparência. Ela se lê no notebook e no celular, com espaçamento consistente e contraste honesto — e você tem os screenshots para provar.

O **Capítulo 08** adiciona a primeira camada de interação com JavaScript: comportamento controlado, acionado por evento, sem framework. Você vai aprender a responder a um clique, alterar conteúdo na página e — principalmente — fazer isso sem quebrar a estrutura e o estilo que construiu nos capítulos 06 e 07.

A página deixa de ser só um documento para começar a reagir ao usuário.
