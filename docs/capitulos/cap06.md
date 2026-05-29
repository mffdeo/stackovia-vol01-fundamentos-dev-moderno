---
title: "Capítulo 06 — HTML semântico para a primeira página"
status: Preview
volume: 1
capitulo: 6
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.


# Capítulo 06 — HTML semântico para a primeira página

## Abertura

O repositório estava no ar. README, branch, PR — tudo conforme o C05. Você mandou o link para o Mestre Py com a sensação de que o projeto finalmente parecia profissional.

A resposta chegou rápida.

"Cliquei na home. Abre. Mas não consigo ler o código e entender o que é cada parte. Headings fora de ordem, tudo dentro de `div`, link de 'Equipe' que não vai a lugar nenhum. Visualmente aceitável; estruturalmente, é como uma gaveta onde tudo foi jogado sem divisória. Arruma o HTML antes de a gente continuar."

Você abriu o `src/index.html`. Era o arquivo que existia como placeholder desde o C03. Na época, você tinha criado um esqueleto mínimo para provar que o caminho relativo funcionava — mas o conteúdo nunca tinha recebido atenção real. O que estava ali era basicamente o que a maioria das páginas iniciais de estudo tem: `div` para tudo, um `h3` de boas-vindas porque "parecia menor e mais discreto", um `h1` em outro trecho porque "ficava bem com a fonte padrão", e um link de navegação para `equipe.html` que não existia.

Visualmente? O browser mostrava o conteúdo. Mas o código não comunicava nada — nem para quem lesse, nem para uma ferramenta de acessibilidade, nem para o Mestre Py tentando entender a intenção da página.

Este capítulo resolve isso.

## Card da sprint

| Campo | Valor |
|---|---|
| Cargo narrativo | Estagiário de desenvolvimento web |
| Sprint | HTML semântico para a home do IntraStack (C06) |
| Tarefa | Criar `src/index.html` com estrutura semântica, headings em ordem e links verificáveis |
| Definição de pronto | Página abre no browser, tem `header`, `main` e `footer`, headings em ordem lógica, sem dados reais e sem link quebrado não declarado |

O tamanho desta sprint é o de um capítulo. Cada leitor avança no próprio ritmo; o que importa é terminar com um `src/index.html` que comunica intenção, não só aparência.

## Problema de negócio

O IntraStack básico precisa de uma home que oriente quem chega.

Uma página de onboarding que "funciona" visualmente mas tem estrutura confusa cria dois problemas práticos: fica difícil de manter (qualquer mudança de CSS pode quebrar a hierarquia de conteúdo) e fica difícil de escalar (quando vier o C07, o CSS vai precisar de uma base semântica para funcionar direito). Além disso, headings fora de ordem e links quebrados mostram falta de cuidado — e esse cuidado é o que diferencia um arquivo de estudo de um artefato técnico revisável.

Não é sobre fazer a página bonita agora. É sobre dar uma estrutura que dure.

## O que será construído neste capítulo

Ao final deste capítulo, o IntraStack básico terá:

- `src/index.html` com estrutura semântica completa: `doctype`, `html`, `head`, `body`, `header`, `main`, `footer`.
- Seções de conteúdo com `section` e `article` quando apropriado.
- Headings em ordem lógica do `h1` ao `h3`, usados por significado, não por aparência.
- Links internos honestos: os que existem funcionam; os que ainda não têm destino são marcados explicitamente como placeholders.
- Conteúdo fictício de onboarding — sem dados reais, sem nomes de pessoas reais, sem referências a sistemas internos verdadeiros.
- `docs/notas-html-semantico.md` explicando as decisões de estrutura da home.
- Entrada no diário técnico registrando o que aprendeu sobre headings e semântica.
- Commit `feat(html): add semantic home` no repositório.

O CSS vem no C07. O objetivo deste capítulo é ter uma estrutura que faça sentido lida sem nenhum estilo.

## Cena/tensão de abertura

Antes de construir a versão correta, olhe para o que estava no arquivo.

Este era o `src/index.html` que o Mestre Py viu:

```html
<!-- src/index.html — versão sem semântica (NÃO é o que você vai criar) -->
<!DOCTYPE html>
<html>
<head>
  <title>IntraStack</title>
</head>
<body>
  <div class="topo">
    <div class="nome-site">IntraStack Básico</div>
    <div class="menu">
      <a href="equipe.html">Equipe</a>
      <a href="links.html">Links úteis</a>
    </div>
  </div>

  <h3>Bem-vindo ao portal interno</h3>
  <div>
    <p>Este é o portal de onboarding da equipe de desenvolvimento.</p>
  </div>

  <h1>Próximos passos</h1>
  <div>
    <p>Acesse os links abaixo para começar.</p>
  </div>

  <div class="rodape">
    <p>IntraStack — versão de estudo</p>
  </div>
</body>
</html>
```

O que está errado aqui? Olhando só o resultado no browser, a página parece aceitável. Mas se você ler o código como uma estrutura, vai encontrar quatro problemas:

1. `h3` antes de `h1` — a hierarquia de headings começa no nível três e salta para o nível um. Para quem lê o documento de cima para baixo (inclusive leitores de tela), a ordem não faz sentido.
2. `div` para tudo — cabeçalho, menu, rodapé, seções de conteúdo: tudo é `div`. O código não diz nada sobre o que cada parte representa.
3. Link de "Equipe" aponta para `equipe.html` — esse arquivo não existe. Qualquer clique retorna 404 ou abre uma aba em branco, dependendo do ambiente.
4. Link de "Links úteis" aponta para `links.html` — também inexistente.

Esses problemas parecem pequenos individualmente. Mas juntos formam o que o Mestre Py chamou de "gaveta sem divisória": o conteúdo está lá, mas a estrutura não comunica nada.

## Exemplo antes do conceito

Dois trechos, uma comparação.

**Trecho A — HTML por aparência:**

```html
<h3>Bem-vindo</h3>
<div>
  <p>Portal de onboarding da equipe.</p>
</div>
<h1>Próximos passos</h1>
```

Por que esse trecho foi escrito assim? Provavelmente porque o desenvolvedor abriu o browser e viu que `h3` ficava "num tamanho legal" e `h1` ficava "grande demais no topo mas bom no meio". Decisão visual. O resultado é que a hierarquia da página é definida pela estética, não pelo significado.

**Trecho B — HTML por significado:**

```html
<header>
  <h1>IntraStack Básico</h1>
  <nav>
    <a href="#links-uteis">Links úteis</a>
    <a href="#proximos-passos">Próximos passos</a>
  </nav>
</header>

<main>
  <section id="boas-vindas">
    <h2>Bem-vindo ao portal de onboarding</h2>
    <p>Este portal reúne recursos para quem está começando na equipe de desenvolvimento.</p>
  </section>
</main>
```

A diferença não é só estética. No Trecho B:

- `header` diz que aquele bloco é o cabeçalho da página.
- `h1` é o único título principal — aparece uma vez e nomeia a página.
- `nav` diz que aquele grupo de links é navegação.
- Os links apontam para âncoras internas (`#links-uteis`, `#proximos-passos`) que existem na mesma página — sem promessa de arquivo externo que não existe ainda.
- `main` diz que aquilo é o conteúdo principal.
- `h2` é o título da primeira seção — hierarquia preservada.

Você pode aplicar qualquer CSS depois e a estrutura vai continuar fazendo sentido. Se remover o CSS completamente, a página ainda é legível em sequência.

Agora que você viu a diferença, vamos nomear o conceito.

## Conceitos essenciais

### Conceito-chave 1 — HTML semântico é estrutura de significado

HTML semântico é usar as tags corretas para comunicar o que cada parte da página representa, não só como ela deve aparecer.

As tags semânticas do HTML5 que você vai usar neste capítulo:

| Tag | O que representa |
|---|---|
| `header` | Cabeçalho da página ou de uma seção |
| `nav` | Grupo de links de navegação |
| `main` | Conteúdo principal da página (aparece uma vez por página) |
| `section` | Seção temática do conteúdo |
| `article` | Conteúdo independente (post, card, item de lista) |
| `footer` | Rodapé da página ou de uma seção |
| `h1`–`h6` | Títulos em hierarquia — `h1` é o mais importante |
| `p` | Parágrafo |
| `a` | Link |
| `ul` / `ol` / `li` | Lista não-ordenada, ordenada e item de lista |

A regra de ouro: se você troca um elemento por `div` e o código continua fazendo sentido textualmente, talvez `div` esteja correto. Se você perde a informação de "isso é o cabeçalho" ou "isso é navegação", você perdeu semântica.

`div` e `span` continuam existindo — servem para agrupamento visual quando nenhuma tag semântica se aplica. Mas não são ponto de partida.

### Conceito-chave 2 — Hierarquia de headings

Os headings (`h1` a `h6`) não são sobre tamanho de fonte. São sobre hierarquia de conteúdo.

A regra prática para V01:

- `h1`: título principal da página. Aparece **uma vez**.
- `h2`: título de cada seção principal.
- `h3`: subtítulo dentro de uma seção, quando necessário.

Um heading fora de ordem (`h3` antes de `h1`, ou `h2` pulando para `h4`) cria uma árvore de documento quebrada. Para quem usa leitor de tela, é como ouvir um documento lido fora de ordem. Para o CSS do C07, pode criar inconsistências visuais que são difíceis de depurar.

Dica prática: antes de publicar, leia os headings em sequência como se fosse o índice do documento. Se o índice fizer sentido, a hierarquia está certa.

### Conceito-chave 3 — Link é uma promessa

Um `<a href="equipe.html">Equipe</a>` promete que existe um arquivo chamado `equipe.html` acessível a partir da mesma pasta. Se o arquivo não existe, a promessa é quebrada — retorna 404 ou abre página em branco.

No V01, você tem duas opções honestas para links que ainda não têm destino:

**Opção 1 — Âncora interna:** usar `href="#nome-da-secao"` para rolar até uma seção que já existe na mesma página.

**Opção 2 — Placeholder declarado:** usar `href="#"` com um comentário no código e um texto de link que deixa claro que o destino ainda não existe. Por exemplo:

```html
<!-- placeholder: equipe.html será criada no C08 -->
<a href="#">Equipe (em breve)</a>
```

Não deixe link apontando para arquivo inexistente sem declarar que é temporário. Link quebrado silencioso é bug de navegação — e mais importante, é uma promessa não cumprida para quem testa o projeto.

### Conceito-chave 4 — Conteúdo fictício e seguro

A home do IntraStack vai ter textos de onboarding, links de navegação e talvez uma seção de equipe. Nenhum desses conteúdos deve usar:

- nomes de pessoas reais;
- nomes de empresas ou clientes reais;
- URLs de sistemas internos reais;
- dados que pareçam informação interna verdadeira.

Use nomes genéricos e reconhecíveis como fictícios: "Equipe Alpha", "Ana Silva (exemplo)", "sistema-xpto.example". O leitor deve conseguir distinguir que é conteúdo de estudo, não extração de dados reais.

Isso não é só cuidado de segurança — é honestidade técnica com quem vai ler o código.

### Conceito-chave 5 — Ler o HTML sem CSS

O teste mais rápido de semântica é remover o CSS e ler o resultado.

Se a página ainda comunicar a hierarquia — título principal, seções, navegação, rodapé — a estrutura está certa. Se virar um bloco confuso de texto, a semântica está apoiada demais no CSS para fazer sentido.

No V01, você não tem CSS ainda. Isso é uma vantagem: você vai criar o HTML numa situação onde ele precisa funcionar só com a estrutura. Quando o C07 adicionar CSS, a base vai aguentar.

## Estrutura da home do IntraStack

O wireframe textual que o contrato propõe:

```text
Header
  └── H1 (título do portal)
  └── nav (links de navegação interna)

Main
  ├── section#boas-vindas
  │     └── H2 + parágrafo de boas-vindas
  ├── section#links-uteis
  │     └── H2 + lista de links fictícios
  ├── section#equipe
  │     └── H2 + lista de contatos fictícios
  └── section#proximos-passos
        └── H2 + lista de próximas ações de onboarding

Footer
  └── Nota de rodapé (versão de estudo, sem dado real)
```

Este é o mapa da página. Cada `section` tem um `id` que corresponde a um link no `nav`. Nenhum arquivo externo é prometido — a navegação é toda interna.

Agora a implementação completa do `src/index.html`:

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IntraStack Básico — Portal de Onboarding</title>
</head>
<body>

  <header>
    <h1>IntraStack Básico</h1>
    <nav>
      <ul>
        <li><a href="#boas-vindas">Início</a></li>
        <li><a href="#links-uteis">Links úteis</a></li>
        <li><a href="#equipe">Equipe</a></li>
        <li><a href="#proximos-passos">Próximos passos</a></li>
      </ul>
    </nav>
  </header>

  <main>

    <section id="boas-vindas">
      <h2>Bem-vindo ao portal de onboarding</h2>
      <p>
        Este portal reúne recursos, contatos e orientações para quem está
        começando na equipe de desenvolvimento. Use os links acima para
        navegar pelas seções.
      </p>
      <p>
        <strong>Aviso:</strong> este é um projeto de estudo.
        Todos os nomes, links e contatos abaixo são fictícios.
      </p>
    </section>

    <section id="links-uteis">
      <h2>Links úteis</h2>
      <ul>
        <li>
          <a href="https://docs.example.com" target="_blank" rel="noopener">
            Documentação interna (exemplo — link fictício)
          </a>
        </li>
        <li>
          <a href="https://board.example.com" target="_blank" rel="noopener">
            Board de tarefas (exemplo — link fictício)
          </a>
        </li>
        <li>
          <a href="https://wiki.example.com" target="_blank" rel="noopener">
            Wiki da equipe (exemplo — link fictício)
          </a>
        </li>
      </ul>
      <p>
        <em>
          Estes links usam o domínio <code>.example</code>, reservado pela
          RFC 2606 para documentação e exemplos. Não representam sistemas reais.
        </em>
      </p>
    </section>

    <section id="equipe">
      <h2>Equipe</h2>
      <ul>
        <li>
          <strong>Ana Silva (exemplo)</strong> — Desenvolvimento backend
          &lt;ana@stackovia.example&gt;
        </li>
        <li>
          <strong>Carlos Mendes (exemplo)</strong> — Desenvolvimento frontend
          &lt;carlos@stackovia.example&gt;
        </li>
        <li>
          <strong>Mestre Py (exemplo)</strong> — Mentoria técnica
          &lt;mestre@stackovia.example&gt;
        </li>
      </ul>
      <p>
        <em>Todos os nomes e contatos são fictícios e criados apenas para fins didáticos.</em>
      </p>
    </section>

    <section id="proximos-passos">
      <h2>Próximos passos de onboarding</h2>
      <ol>
        <li>Leia o README do repositório.</li>
        <li>Configure o ambiente local seguindo as instruções em <code>docs/runbook-local.md</code>.</li>
        <li>Abra o <code>src/index.html</code> no browser para confirmar que tudo carrega.</li>
        <li>Apresente-se no canal da equipe (substitua por canal real no seu contexto).</li>
        <li>Marque uma conversa de alinhamento com o seu ponto de contato.</li>
      </ol>
    </section>

  </main>

  <footer>
    <p>IntraStack Básico — projeto de estudo. Versão V01.</p>
    <p>
      <small>
        Conteúdo fictício para fins didáticos.
        Repositório: <a href="https://github.com/exemplo/stackovia-intrastack-basic" target="_blank" rel="noopener">stackovia-intrastack-basic (exemplo)</a>
      </small>
    </p>
  </footer>

</body>
</html>
```

Algumas decisões que valem explicar:

**`lang="pt-BR"` no `<html>`:** diz ao browser e a ferramentas de acessibilidade que o idioma da página é português do Brasil. Sem esse atributo, alguns leitores de tela podem pronunciar o conteúdo em inglês.

**`charset="UTF-8"` e `viewport`:** o charset garante que acentos e caracteres especiais sejam renderizados corretamente. O viewport garante que a página se comporte razoavelmente em telas menores, mesmo sem CSS de responsividade.

**Links externos com `target="_blank" rel="noopener"`:** quando um link abre em nova aba, o atributo `rel="noopener"` impede que a página de destino tenha acesso ao contexto da janela atual — proteção básica contra um ataque chamado reverse tabnapping. Não é necessário para links internos nem para links que não abrem em nova aba.

**`&lt;` e `&gt;` nos e-mails:** HTML interpreta `<` e `>` como abertura e fechamento de tags. Para mostrar o símbolo literal num endereço de e-mail (`<ana@exemplo>`), você precisa das entidades HTML `&lt;` e `&gt;`. Se você escrever o sinal diretamente, o browser vai tentar interpretar como tag e o texto vai sumir ou quebrar.

**Âncoras internas (`href="#boas-vindas"`):** os links do `nav` apontam para os `id` das seções na mesma página. Ao clicar em "Links úteis", o browser rola até `<section id="links-uteis">`. Nenhum arquivo externo é prometido — a navegação é autocontida.

## O que pode dar errado?

### 1. Heading fora de ordem

A tentação mais comum: escolher `h3` ou `h4` porque "ficam menores e mais discretos visualmente". O resultado é uma árvore de headings quebrada que não comunica hierarquia.

**Como evitar:** decida a hierarquia antes de abrir o CSS. Se você quiser um heading visivelmente menor, isso é trabalho do CSS no C07 — não da tag HTML.

### 2. Link quebrado silencioso

Adicionar `<a href="equipe.html">Equipe</a>` sem criar `equipe.html` é o INC-V01-008: o link existe no código, mas a promessa não é cumprida. Em ambiente local, pode retornar 404. Em alguns casos, o browser simplesmente não abre nada.

**Como evitar:** antes de commitar, abra o `index.html` no browser e clique em todos os links. Se algum não funcionar, corrija ou marque como placeholder declarado (`href="#"` com comentário).

### 3. Conteúdo com dado real ou sensível

Você pode estar acostumado a usar nomes reais de colegas, URLs de sistemas que usa no trabalho ou referências a projetos reais quando cria exemplos. Isso parece inofensivo, mas expõe informação que não deveria aparecer num repositório público.

**Como evitar:** use nomes fictícios explicitamente marcados, domínios `.example` e URLs que deixem claro que são exemplos.

### 4. Múltiplos `h1` na mesma página

Algumas fontes antigas sugerem que cada seção pode ter seu próprio `h1`. Para V01, use exatamente um `h1` por página — é o título principal do documento. Seções usam `h2`.

**Como evitar:** grep no arquivo: `grep -c "<h1" src/index.html` deve retornar `1`.

### 5. `div` para tudo com semântica ignorada

Criar a estrutura certa às vezes parece demorar mais do que jogar `div` em todo lugar. A desvantagem aparece quando o C07 precisa aplicar CSS: sem landmarks semânticos, o seletor CSS fica mais frágil e mais difícil de manter.

**Como evitar:** para cada bloco que você criar, pergunte: "qual é a intenção desse bloco?" Se a resposta for "é o cabeçalho", use `header`. Se for "é uma seção de conteúdo", use `section`. Reserve `div` para agrupamentos que não têm equivalente semântico.

## Debugging guiado

### Passo 1 — Abrir no browser sem CSS

Abra o `src/index.html` diretamente no browser (duplo clique no explorador de arquivos ou `Ctrl+O` no Chrome/Firefox).

O que você deve ver: título da página, lista de navegação, quatro seções com headings visíveis e rodapé. Sem estilo, sem cores — só texto e estrutura.

Se alguma parte sumir ou aparecer estranha, é sinal de erro de tag (tag aberta sem fechar, ou `<` literal sem entidade HTML).

### Passo 2 — Verificar headings em sequência

Leia apenas os headings em ordem: `h1`, depois cada `h2`, depois qualquer `h3` que existir.

A sequência correta no `src/index.html` que você vai criar:

```text
h1: IntraStack Básico
  h2: Bem-vindo ao portal de onboarding
  h2: Links úteis
  h2: Equipe
  h2: Próximos passos de onboarding
```

Se a sequência estiver diferente, localize o heading fora de ordem e corrija a tag.

### Passo 3 — Clicar em todos os links

Abra a página no browser e clique em todos os links:

- Links de navegação (`#boas-vindas`, `#links-uteis`, `#equipe`, `#proximos-passos`): devem rolar a página até a seção correspondente.
- Links externos (os que usam `.example`): vão abrir uma nova aba que provavelmente não carrega nada — isso é esperado, porque `.example` não é um domínio real. O que importa é que o atributo `href` está correto e o link não retorna erro de sintaxe.
- Links no rodapé: mesma situação — são exemplos declarados.

**O que procurar:** qualquer link que abra página em branco sem ser de domínio de exemplo, ou que retorne 404 em arquivo local, é link quebrado não declarado.

### Passo 4 — Conferir entidades HTML nos e-mails

Procure os e-mails na seção de equipe e verifique se aparecem com `<` e `>` visíveis no browser.

O erro comum é escrever o endereço com os símbolos literais — algo como `Ana Silva <ana@stackovia.example>` direto no HTML, sem escapar. Quando o browser lê isso, interpreta `<ana@stackovia.example>` como uma tag desconhecida e descarta o conteúdo entre os sinais. Na tela, o texto some ou o e-mail aparece truncado.

A versão correta usa entidades HTML:

```html
<li>
  <strong>Ana Silva (exemplo)</strong> — Desenvolvimento backend
  &lt;ana@stackovia.example&gt;
</li>
```

`&lt;` representa `<` e `&gt;` representa `>`. Com as entidades, o browser exibe os símbolos literais em vez de tentar interpretá-los como marcação.

Se o e-mail está sumindo na tela, localize a linha no arquivo, substitua `<` por `&lt;` e `>` por `&gt;` e recarregue o browser.

### Passo 5 — Contar `h1`

```bash
grep -c "<h1" src/index.html
```

Deve retornar `1`. Se retornar mais de um, identifique qual `h1` extra existe e substitua pelo nível correto (`h2` ou `h3`).

## Code Review do Mestre Py

O Mestre Py leria o `src/index.html` com três perguntas:

**Aprovaria sem comentário:**
- Estrutura com `header`, `main` (com `section`) e `footer`.
- `h1` único, `h2` para cada seção.
- Links de navegação apontando para âncoras internas que existem.
- Conteúdo marcado explicitamente como fictício.
- `lang`, `charset` e `viewport` declarados.
- `rel="noopener"` nos links externos.

**Pediria ajuste:**
- Heading fora de ordem: "Você está usando `h3` antes de qualquer `h2`. Corrija a hierarquia — depois ajusta o tamanho pelo CSS."
- Link para arquivo externo inexistente: "Link é promessa. Se não existe o destino, declare como placeholder ou remova até existir."
- Conteúdo com dado que parece real: "Esse e-mail parece real. Substitua por algo que deixe claro que é exemplo — use o domínio `.example` ou acrescente '(exemplo)' ao lado."
- `<h1>` aparecendo mais de uma vez: "Um `h1` por página. O que está duplicado precisa ser `h2`."

**Reprovaria:**
- `div` para tudo sem nenhuma tag semântica.
- Headings completamente fora de ordem em todo o documento.
- Link de navegação apontando para arquivo externo que não existe, sem nenhuma declaração de placeholder.
- Nome ou e-mail real exposto como conteúdo de exemplo.

**Resumo do Code Review:** "O HTML precisa comunicar o que cada parte da página representa — não só como ela aparece. Se eu lesse só as tags, sem o conteúdo, eu precisaria conseguir dizer: isso é o cabeçalho, isso é a navegação, isso é o conteúdo principal, isso é o rodapé. Landmarks semânticos e hierarquia de headings não são perfumaria — são a base que o C07 vai usar para aplicar CSS sem fragilidade."

## Mãos à Obra

Execute as tarefas na ordem. Para cada tarefa, verifique o resultado no browser antes de seguir para a próxima.

---

**Tarefa 1 — Criar o `src/index.html` semântico**

Substitua o conteúdo atual do `src/index.html` pelo HTML completo mostrado na seção "Estrutura da home do IntraStack".

Abra no browser logo depois e confirme que a página carrega sem erros visíveis.

---

**Tarefa 2 — Verificar headings**

```bash
grep "<h[1-6]" src/index.html
```

Leia a saída em sequência. Deve aparecer: um `h1`, depois quatro `h2`. Nenhum `h3` ou mais profundo existe na estrutura proposta — mas se você tiver adicionado algum, verifique se a hierarquia está correta.

---

**Tarefa 3 — Clicar em todos os links**

Abra o `src/index.html` no browser e clique em cada link:

- Links do nav: devem rolar para a seção correspondente.
- Links externos com `.example`: abrem nova aba (que não carrega — esperado). Verifique que não há erro de sintaxe.
- Link do rodapé: mesmo comportamento dos links externos.

Confirme que nenhum link quebra a navegação inesperadamente.

---

**Tarefa 4 — Verificar unicidade do `h1`**

```bash
grep -c "<h1" src/index.html
```

Deve retornar `1`. Se retornar mais, corrija antes de continuar.

---

**Tarefa 5 — Criar `docs/notas-html-semantico.md`**

Crie o arquivo com o seguinte conteúdo (adapte conforme suas próprias observações):

```markdown
# Notas — HTML semântico da home do IntraStack

## Estrutura adotada

- `header` com `h1` e `nav` (links âncora internos).
- `main` com quatro `section`, cada uma com `h2`.
- `footer` com nota de projeto de estudo.

## Decisões

- Headings usados por hierarquia, não por aparência visual.
- Links externos usam domínio `.example` (RFC 2606 — não real).
- Conteúdo da seção Equipe marcado explicitamente como fictício.
- `rel="noopener"` em links que abrem em nova aba.

## Limitações

- Sem CSS: estilo vem no C07.
- Sem responsividade: layout responsivo vem junto com o CSS.
- Links externos não levam a lugar real: são exemplos declarados.
- Não há acessibilidade profunda (ARIA, contraste verificado): fica para V02.

## Próximo passo

C07 aplica CSS moderno a esta estrutura.
```

---

**Tarefa 6 — Atualizar o diário técnico**

Abra `docs/diario-tecnico.md` e adicione uma entrada:

```markdown
## [DATA] — C06: HTML semântico

Criei o `src/index.html` com estrutura semântica completa.
Aprendi que headings são hierarquia de conteúdo, não controle de tamanho de fonte.
Corigi o problema de link para `equipe.html` inexistente: usei âncoras internas em vez de prometer arquivos que não existem.
Usei `.example` para todos os links fictícios, seguindo a RFC 2606.
```

Substitua `[DATA]` pela data de hoje.

---

**Tarefa 7 — Commitar**

```bash
git add src/index.html docs/notas-html-semantico.md docs/diario-tecnico.md
git commit -m "feat(html): add semantic home to IntraStack"
```

A mensagem segue o padrão `tipo(escopo): ação`. `feat` porque é um arquivo novo com funcionalidade real. `html` como escopo. A ação descreve o que foi feito.

---

**Tarefa 8 — Fazer push e abrir PR (opcional neste capítulo)**

Crie uma branch específica para o HTML semântico e abra um PR dedicado:

```bash
git checkout -b feat/html-semantico-home
git push -u origin feat/html-semantico-home
```

Depois abra o PR no GitHub com:
- **Título:** `feat(html): add semantic home to IntraStack`
- **Descrição:** o que mudou, como verificar (abrir o `src/index.html` no browser), limitações (sem CSS ainda) e checklist de headings e links.

> **Nota:** se você ainda tem o PR do C05 (`docs/vol01-readme-inicial`) aberto e quer manter o histórico simples, pode commitar nessa mesma branch em vez de criar uma nova. A vantagem de criar uma branch separada é que cada PR tem um escopo claro — README no primeiro, HTML semântico no segundo. Escolha conforme o que faz mais sentido para o seu fluxo agora.

---

**Tarefa 9 — Atualizar o README**

Adicione uma linha à seção de estrutura do `README.md` explicando que `src/index.html` agora tem conteúdo semântico real:

```markdown
## Estrutura do projeto (atualizada no C06)

- `src/index.html` — home semântica do IntraStack (C06); sem CSS ainda
- `docs/` — documentação interna, runbook, notas técnicas
- `diagrams/` — diagramas textuais
- `assets/` — screenshots e recursos visuais
```

Adapte conforme a estrutura real do seu projeto.

## Critérios de aceitação

- [ ] `src/index.html` abre no browser sem erro visível.
- [ ] A página tem `header`, `main` com pelo menos uma `section` e `footer`.
- [ ] `h1` aparece uma única vez e é o título principal da página.
- [ ] Headings seguem ordem lógica: `h1` → `h2` (sem saltar níveis).
- [ ] Links de navegação apontam para âncoras internas que existem na mesma página.
- [ ] Nenhum link aponta para arquivo externo inexistente sem declaração de placeholder.
- [ ] Todo o conteúdo é fictício: nomes, e-mails e URLs não representam pessoas ou sistemas reais.
- [ ] `docs/notas-html-semantico.md` criado com estrutura, decisões e limitações.
- [ ] Commit `feat(html): add semantic home` realizado no repositório.

## Checklist de segurança

- [ ] Nenhum nome real de pessoa ou empresa aparece como conteúdo da página.
- [ ] Nenhuma URL de sistema interno real aparece nos links.
- [ ] Links externos usam domínio `.example`, `localhost` ou são claramente marcados como fictícios.
- [ ] O arquivo não contém campos de formulário com `action` apontando para endpoint real (formulário vem no C10).

## Entrega de portfólio

### Entregas obrigatórias do C06

1. `src/index.html` — home semântica com `header`, `main`, `footer`, headings em ordem e links verificáveis.
2. `docs/notas-html-semantico.md` — decisões de estrutura documentadas.
3. Entrada no `docs/diario-tecnico.md` registrando o aprendizado de headings e semântica.
4. Commit `feat(html): add semantic home to IntraStack` no repositório.

### Screenshots ou diagramas esperados

`assets/screenshots/` é opcional. Se quiser registrar visualmente o estado da home sem CSS, um screenshot do browser com a página carregada é suficiente. Não é obrigatório neste capítulo — a estrutura HTML e o commit já são a evidência técnica principal.

### Evidências esperadas

Checklist de headings (saída do `grep`) e resultado de clicar em todos os links — pode registrar em texto no diário ou no PR.

### Limitações que devem aparecer

- Sem layout responsivo: CSS vem no C07.
- Sem acessibilidade profunda: ARIA, roles explícitos e contraste verificado ficam para V02.
- Conteúdo fictício: não representa portal real.
- Sem formulários: interação vem no C10.

### Rótulo de maturidade

Estudo / Fundamentos.

## Mini post LinkedIn

*Este esboco é para uso futuro, quando você quiser compartilhar o aprendizado. Não publique agora — o projeto ainda está em construção.*

---

**Gancho:** "Achei que HTML era só abrir tags. Aí li o código de uma página que 'funcionava' e percebi que não comunicava nada."

**Contexto:** Estou construindo o IntraStack Básico — um portal de onboarding fictício para aprender desenvolvimento web do zero.

**Problema:** A home abria no browser, mas o HTML era tudo `div`, com headings fora de ordem e links para páginas que não existiam. Visualmente ok; estruturalmente uma gaveta sem divisória.

**O que aprendi:** HTML semântico não é sobre aparência — é sobre dar significado ao que cada parte da página representa. `header`, `main`, `section`, `footer` não são decoração; são landmarks que comunicam intenção para o browser, para ferramentas de acessibilidade e para quem vai manter o código depois.

**Limitação honesta:** Ainda sem CSS. Sem acessibilidade profunda. Conteúdo 100% fictício. Projeto de estudo em andamento.

**Próximo passo:** C07 aplica CSS moderno e responsivo à estrutura criada.

**Link:** [quando pronto: link do commit ou da página publicada]

---

## Perguntas de revisão

1. Por que usar `<header>` em vez de `<div class="header">` faz diferença? Qual informação é perdida quando você usa `div` para tudo?

2. Você tem uma página com os seguintes headings em ordem: `h2`, `h1`, `h3`, `h2`. Quais são os dois problemas dessa sequência e como você os corrigiria?

3. Um desenvolvedor criou um link `<a href="sobre.html">Sobre</a>` mas o arquivo `sobre.html` ainda não existe. Quais são as duas opções honestas para lidar com isso no V01?

4. Por que links externos que abrem em nova aba devem ter `rel="noopener"`? O que pode acontecer sem esse atributo?

5. Você quer mostrar o e-mail `<ana@stackovia.example>` na página. Por que simplesmente escrever `<ana@stackovia.example>` dentro de uma tag pode causar problema, e como você resolve?

6. O teste "ler o HTML sem CSS" é citado como forma de verificar semântica. O que especificamente você está verificando com esse teste, e o que você faria se a página ficasse confusa sem estilo?

## Próximo passo

O `src/index.html` existe, tem estrutura e comunica intenção. Agora ele parece o que é: uma página de texto sem formatação — porque é exatamente isso que HTML sem CSS produz.

O **Capítulo 07** aplica CSS moderno a essa estrutura. Você vai aprender a usar seletores, o modelo de caixa, Flexbox básico e como criar um layout que funciona em telas diferentes — sem depender de um framework. O C07 não troca a base; ele veste a estrutura que você criou aqui.

Quando terminar o C07, a home do IntraStack vai ter aparência e estrutura. Os dois juntos fazem uma página que funciona de verdade.
