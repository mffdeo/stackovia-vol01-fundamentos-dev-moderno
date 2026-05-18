---
title: "Capítulo 2 — Como a internet funciona na prática"
status: Preview
volume: 1
capitulo: 2
maturidade: "Revisado v1.0"
---

> ⚠️ **Conteúdo em construção.** Este capítulo faz parte da Stackovia Learning Series,
> desenvolvida ativamente em 2026. Para acompanhar o progresso ou contribuir,
> acesse o [repositório hub](https://github.com/mffdeo/stackovia-learning) no GitHub.

# Capítulo 2 — Como a internet funciona na prática
## Abertura narrativa na Stackovia

Você abre o navegador, cola no endereço o link interno que te passaram para olhar o portal da Stackovia e aperta Enter.

A página não carrega.

Não aparece erro vermelho explícito, não aparece a página de boas-vindas, não aparece praticamente nada — só uma tela quase em branco, um logotipo travado e a sensação de que alguma coisa quebrou em silêncio. Você atualiza uma vez. Atualiza de novo. Troca de aba e tenta abrir um site qualquer da internet pública: abre normalmente. Volta para o link interno: a página continua morta.

Você abre a conversa da equipe e está prestes a digitar "o portal caiu". Antes de mandar, o Mestre Py aparece e te interrompe com uma pergunta seca: **caiu o quê, exatamente?**

A frase parece pequena, mas ela é o capítulo inteiro. "Caiu" pode ser cinco coisas diferentes. URL errada. Servidor fora do ar. Imagem com caminho quebrado. Arquivo aberto no lugar errado. Conexão sua falhando. Sem separar uma da outra, você não está diagnosticando — está chutando.

O C02 é sobre aprender a fazer essa separação **antes** de tocar em qualquer código.

## Card da sprint

```text
[Card da Sprint]
Sprint:    Diagnóstico web inicial (C02)
Cargo:     Estagiário de desenvolvimento web
Tarefa:    Desenhar o caminho de uma requisição web para o
           IntraStack básico, do clique do usuário até a tela
           pronta — e usar esse caminho como ferramenta de
           diagnóstico quando uma página não carrega.
Definição
de pronto: Diagrama request/response criado e explicado
           sem backend real; o leitor consegue apontar pelo
           menos três etapas onde o caminho pode falhar.
```

O card desta sprint tem o tamanho de um capítulo, não de uma semana inteira. A cadência real depende do seu ritmo: alguém pode fechar o C02 em uma tarde, outra pessoa pode levar dois ou três dias. O importante é a entrega, não o calendário.

Esse card aceita uma entrega pequena: um diagrama em texto, dentro de uma pasta `diagrams/`, com legenda curta. Não pede backend, não pede framework e não pede deploy. Pede vocabulário e clareza de fluxo.

## Problema de negócio

A página interna da Stackovia precisa funcionar para quem chega novo. Quando ela "não abre", essa pessoa não está pensando em DNS nem em status HTTP — está pensando em desistir e perguntar no chat.

Para você, que está construindo o IntraStack básico, isso significa duas coisas. Primeiro: a página precisa abrir mesmo. Segundo, igualmente importante: quando ela não abrir, você precisa saber onde olhar, em qual ordem, sem precisar acionar uma pessoa sênior a cada falha.

Esse capítulo não constrói a página. Ele constrói o **mapa mental** que você vai usar do C06 em diante, toda vez que algo no IntraStack básico parecer "fora do ar".

## O que será construído

No fim deste capítulo, você terá:

- um arquivo `diagrams/request-response.md` com o caminho de uma requisição web para o IntraStack básico;
- uma legenda curta de cada etapa do diagrama, no seu vocabulário;
- um arquivo `docs/http-basico.md` com a versão de bolso dos conceitos (URL, DNS, request, response, status, HTTPS);
- um checklist de diagnóstico para "página/recurso não carrega" com pelo menos três hipóteses iniciais.

O que o capítulo **não** vai construir:

- API real, com FastAPI ou qualquer outro framework — isso é V03;
- backend hospedado, banco de dados ou autenticação — isso é V03/V04;
- tabela enciclopédica de códigos HTTP — você vai usar apenas os status que aparecem com frequência;
- estudo profundo de TLS, certificados, CORS, cabeçalhos de segurança avançados — isso é V03/V04/V05;
- configuração de DNS, hosting pago, CDN, Nginx ou reverse proxy — isso é V06/V07.

Cada um desses temas vai aparecer só como ponte: "isso vem depois". O C02 fica no nível de **diagnóstico de página estática**.

## Cena/tensão de abertura

Volte por um segundo à página morta da abertura.

Você ainda não fez nada de técnico. Não abriu DevTools, não conferiu URL, não trocou de rede, não tentou abrir o mesmo link por outro caminho. Mesmo assim, sua cabeça já está formando uma narrativa: "o portal caiu", "deve ser o servidor", "alguém vai precisar arrumar isso".

A tensão é essa: **você está pronto para concluir antes de investigar**. Em desenvolvimento web, esse hábito custa caro. Custa tempo, custa credibilidade no chat da equipe, e principalmente custa aprendizado — porque, se você não diagnosticar, você não descobre a real causa, e a próxima vez que isso acontecer você vai estar igualmente despreparado.

O Mestre Py te força a freiar. A pergunta dele continua aberta: **caiu o quê, exatamente?** Você só vai conseguir responder isso se tiver, na cabeça, o caminho que uma requisição percorre.

## Exemplo concreto antes do conceito

Antes de qualquer definição, veja duas conversas possíveis no chat da equipe.

**Conversa A — sem investigação:**

```text
Você:    Pessoal, o portal interno caiu.
Sênior:  Caiu como? Pra todo mundo ou só pra você?
Você:    Não sei, só abri aqui e não veio nada.
Sênior:  Você consegue mandar print da aba Network do navegador?
Você:    Network? Onde fica isso?
```

**Conversa B — com investigação mínima:**

```text
Você:    Pessoal, o link interno https://intra.stackovia.example/
         não está carregando aqui.
         - Outros sites externos abrem normalmente.
         - No DevTools, a aba Network mostra a requisição
           principal voltando com status 404.
         - O caminho parece ok, mas a página index pode ter
           sido removida ou movida. Alguém confirma?
```

As duas mensagens descrevem a mesma falha. A primeira transfere o problema para outra pessoa sem nenhuma evidência. A segunda já entrega: a URL, o que funciona, o que não funciona, o status que voltou e uma hipótese.

A diferença entre as duas não está em ferramenta nova — está em **vocabulário de caminho** e em **olhar no lugar certo**. É isso que o resto do capítulo te dá.

Agora os conceitos.

## Conceitos essenciais

### Conceito-chave 1: URL

Uma URL é o endereço completo de um recurso na web. Ela tem partes, e separar essas partes ajuda demais a diagnosticar.

```text
[Exemplo de URL]
https://intra.stackovia.example/equipe/index.html
└─┬─┘   └────────┬────────┘└──────┬─────────┘
  │              │                 │
protocolo      host (DNS)        caminho do recurso
```

- **Protocolo:** `https://` define **como** o navegador conversa com o servidor. `http://` ainda existe, mas hoje deve ser evitado em qualquer página real.
- **Host:** `intra.stackovia.example` é o nome humano do servidor. Esse nome precisa ser convertido em um endereço numérico para o navegador conseguir conectar — quem faz essa conversão é o DNS.
- **Caminho:** `/equipe/index.html` é **qual** recurso, dentro daquele host, você quer abrir. Caminho errado, recurso errado: muitos "site fora do ar" são, na verdade, caminho fora do lugar.

Quando algo não abre, o primeiro hábito útil é olhar a URL inteira — e não só decidir "caiu".

### Conceito-chave 2: DNS

DNS é o serviço que traduz `intra.stackovia.example` em um número, parecido com `203.0.113.42`. O navegador não conversa diretamente com nomes; ele conversa com endereços.

> **Nota sobre o IP de exemplo.** O endereço `203.0.113.42` é usado aqui apenas como **IP de documentação** (faixa `203.0.113.0/24`, reservada pela IANA exatamente para exemplos). Ele **não** representa nenhum servidor real da Stackovia nem deve ser usado em testes reais de rede.

Para o V01, basta esta versão de bolso:

- nome legível → DNS → endereço numérico → conexão com o servidor;
- DNS falha → navegador não acha o servidor → erro de "site não encontrado", "DNS_PROBE", "endereço não pôde ser resolvido";
- DNS é a primeira hipótese a checar quando **nenhum** site daquele domínio responde, mas sites externos abrem normalmente.

Você não vai configurar DNS neste volume. Você vai apenas reconhecer quando o sintoma cheira a DNS.

### Conceito-chave 3: request e response

Toda página web nasce de uma troca curta entre dois lados.

```text
[Request → Response, versão mínima]

Navegador                                Servidor / hosting
   │                                            │
   │  GET /equipe/index.html  HTTP/1.1          │
   │  Host: intra.stackovia.example                 │
   │ ─────────────────────────────────────────► │
   │                                            │
   │                  HTTP/1.1 200 OK           │
   │                  Content-Type: text/html   │
   │                  <html>...</html>          │
   │ ◄───────────────────────────────────────── │
   │                                            │
```

Repare em três coisas:

- o navegador **pede** (`GET ... HTTP/1.1`);
- o servidor **responde** com um **status** (`200 OK`) e um **conteúdo**;
- o que volta tem **tipo declarado** (`Content-Type: text/html`), e é por isso que o navegador sabe que aquilo é uma página HTML, e não, por exemplo, uma imagem.

Esse mesmo padrão se repete para cada coisa que a página precisa: o HTML, depois o CSS, depois o JS, depois cada imagem. Uma página comum não é uma requisição: são **muitas**.

### Conceito-chave 4: status HTTP — versão de bolso

Você não precisa decorar todos os códigos. Para o V01, esta versão curta resolve a maioria das conversas:

- **2xx — deu certo.** O famoso `200 OK` significa "o recurso foi achado e entregue".
- **3xx — redirecionamento.** `301` e `302` dizem "o recurso mudou de lugar, vai ali". Útil saber que existe; não precisa aprofundar agora.
- **4xx — erro do lado de quem pediu.** `404 Not Found` é o mais comum: a URL pediu um recurso que não existe naquele caminho. `403 Forbidden` significa "existe, mas você não pode". `400 Bad Request` significa "sua requisição está mal formada".
- **5xx — erro do lado do servidor.** `500 Internal Server Error` é "o servidor recebeu, tentou responder, mas algo quebrou nele". `502/503/504` quase sempre indicam servidor sobrecarregado ou fora do ar.

Hábito útil: **quando a página não abre, descubra primeiro o status, depois opine**. `404` é uma conversa completamente diferente de `500`, que é diferente de "nem chegou no servidor".

### Conceito-chave 5: hosting estático

Hosting estático é o jeito mais simples de pôr uma página no ar. Você sobe arquivos `.html`, `.css`, `.js` e imagens para um servidor pronto, e qualquer pessoa com a URL consegue acessar. Não há banco, não há lógica no servidor, não há API.

Esse é, exatamente, o nível do IntraStack básico no V01. Quando o capítulo C12 chegar, você vai aprender a publicar essa página estática num serviço de hospedagem. Mas a ideia, hoje, já cabe assim:

```text
[Hosting estático, visão de bolso]

Sua máquina                Serviço de hosting          Quem acessa
(arquivos prontos)   →     (arquivos servidos por      ←    navegador
                            HTTP, sob uma URL)
```

Não existe "lógica de servidor" entre você e o leitor. O servidor só entrega o que está lá. Isso é importante porque define o tipo de erro possível: se o IntraStack básico falhar em produção, **não** vai ser "bug no backend" — porque não há backend. Vai ser arquivo no lugar errado, caminho quebrado, deploy não concluído ou DNS apontando para o lugar errado.

### Conceito-chave 6: abrir local versus acessar pela web

Durante o V01 inteiro, você vai oscilar entre dois modos de abrir o IntraStack básico:

- **Local:** abrir o `index.html` direto do seu disco. A barra do navegador mostra algo como `file:///caminho-do-projeto/index.html` (o caminho exato depende do sistema operacional e da pasta onde você criou o projeto).
- **Hospedado:** abrir através de uma URL pública, do tipo `https://...`, depois que o capítulo de publicação chegar.

Os dois funcionam, mas não são equivalentes:

- abrir via `file://` ignora hosting, ignora DNS, ignora status HTTP da resposta principal — você está abrindo um arquivo, não fazendo uma requisição web de verdade;
- algumas coisas, especialmente leitura de arquivos por JavaScript (que aparece no C09), **falham** quando abertas via `file://` e **funcionam** quando servidas por HTTP. Esse é, por si só, um dos erros mais comuns de iniciante;
- diagnosticar "não carregou" via `file://` não é diagnosticar página web — é diagnosticar caminho de arquivo no seu computador.

Hábito útil desde já: quando alguém te disser "não funcionou", a primeira pergunta é *"você abriu como?"*.

### Conceito-chave 7: HTTPS — versão V01

`HTTPS` é a versão segura do `HTTP`. Em termos práticos do V01, três frases bastam:

- HTTPS criptografa o que vai e vem entre o navegador e o servidor;
- HTTPS depende de um certificado válido no servidor — é por isso que navegadores modernos mostram cadeado;
- páginas servidas por `http://` simples são marcadas como **não seguras**, principalmente quando têm formulário, e isso já é razão suficiente para preferir `https://` em qualquer URL pública.

O V01 **não** ensina a configurar certificado, não cobre TLS handshake, não discute CORS profundo. O que importa hoje é o hábito: **se o serviço de hosting oferece HTTPS, use HTTPS**. Não use `http://` "porque é mais rápido de digitar". Isso vira nota de rodapé ruim no portfólio.

## Fluxo de uma requisição no IntraStack básico

Agora junte os conceitos em um fluxo só.

```text
[Caminho de uma requisição — IntraStack básico]

  1. Leitor digita ou clica:
     https://intra.stackovia.example/equipe/index.html
           │
           ▼
  2. Navegador separa a URL:
     - protocolo: https
     - host:      intra.stackovia.example
     - caminho:   /equipe/index.html
           │
           ▼
  3. DNS traduz o host em endereço numérico:
     intra.stackovia.example → 203.0.113.42
           │
           ▼
  4. Navegador conecta ao servidor de hosting estático
     e envia a requisição:
     GET /equipe/index.html HTTP/1.1
     Host: intra.stackovia.example
           │
           ▼
  5. Servidor responde:
     HTTP/1.1 200 OK
     Content-Type: text/html
     <html>...</html>
           │
           ▼
  6. Navegador lê o HTML e descobre que precisa
     também de CSS, JS e imagens.
     Para cada um, faz uma nova requisição
     (passos 4 e 5 de novo).
           │
           ▼
  7. Página renderizada na tela do leitor.
```

Esse desenho é o seu mapa. Toda vez que alguma coisa "não abrir" no IntraStack básico, sua pergunta deixa de ser "caiu?" e passa a ser **"onde, nesse fluxo, quebrou?"**.

## O que pode dar errado?

Em diagnóstico de página estática, existem cinco famílias de falha que aparecem **o tempo todo**. Saber nomear cada uma já te coloca muito à frente do nível "o site caiu".

- **URL errada.** Digitação trocada, barra a mais, barra a menos, extensão errada (`.htm` em vez de `.html`), domínio com letra parecida (`intra.stackovla.example` em vez de `intra.stackovia.example`). O servidor está ok, o caminho que você pediu é que não existe. Sintoma típico: `404 Not Found` no Network.
- **Arquivo inexistente no servidor.** A URL está certa, mas o arquivo realmente não está lá — foi deletado, renomeado ou nunca foi publicado. Mesmo sintoma do anterior (`404`), causa diferente.
- **Asset com caminho quebrado.** A página principal carrega, mas dentro dela um link de CSS, JS ou imagem aponta para um caminho que não existe. A página aparece, mas aparece "torta" — sem estilo, sem imagem, sem comportamento. No Network, você vê o HTML voltando `200 OK` e um ou mais assets voltando `404`.
- **Abertura via `file://` confundida com página hospedada.** Você está olhando o arquivo local, mas conversa como se fosse a versão pública. Resultado: diagnóstico errado, sugestões erradas, tempo perdido. Sempre confira a barra do navegador antes de discutir "produção".
- **Link sem HTTPS quando o serviço oferece HTTPS.** Você publica o link `http://...` num post ou num README. O navegador moderno marca como inseguro, alguns clientes nem abrem, e a primeira impressão do seu portfólio já entra arranhada.

Em todas elas, o mesmo hábito resolve a primeira camada do diagnóstico: **abra o DevTools, vá na aba Network, recarregue a página e olhe o status e o caminho de cada requisição**. Esse gesto, só ele, separa "investigação" de "achismo".

## Debugging guiado: o portal não abre

Volte ao cenário da abertura. Você ia mandar "o portal caiu". Em vez disso, vai fazer o que o Mestre Py faria — em quatro passos curtos.

1. **Confira a URL.** Está com `https://`? O domínio está digitado certo? O caminho parece existir (`/`, `/equipe`, `/equipe/index.html`)? Em metade dos casos, o erro mora aqui.
2. **Abra o DevTools, aba Network, recarregue a página.** Procure a primeira linha da lista — quase sempre é o HTML principal. Anote o status. Sem isso, qualquer afirmação sobre "caiu" é especulação.
3. **Leia o status pela versão de bolso.**
   - `200` na linha principal e `404` em algum asset → não é "site fora do ar". É **asset quebrado**. Você vai consertar caminho de CSS, JS ou imagem dentro do HTML.
   - `404` na linha principal → é **caminho ou arquivo errado**. Confira URL e nome do arquivo.
   - `500/502/503/504` → é **problema no servidor**. Em hospedagem estática, costuma ser deploy incompleto ou serviço fora do ar. Você não conserta no código do IntraStack; você reporta com evidência.
   - **Nenhuma resposta** (a requisição nem aparece, ou aparece como "failed") → cheira a **DNS, rede ou domínio inválido**. Tente outro site para isolar; tente o link de outro dispositivo, se possível.
4. **Confira como você abriu.** A barra está em `https://...` ou em `file:///...`? Se está em `file://`, antes de chamar a equipe, abra a versão hospedada — você pode estar olhando o cenário errado.

Esse pequeno roteiro é mais valioso do que decorar tabela de status. Ele te transforma, ainda no C02, em alguém que **diagnostica** em vez de **palpitar**.

## Code Review do Mestre Py

Você ainda tem pouco para o Mestre Py revisar em código. O que ele revisa neste capítulo é o seu **diagrama** e a sua **mensagem de incidente** — porque esses dois artefatos já mostram se você entendeu o caminho da requisição.

**O que ele aprovaria**

- diagrama com pelo menos seis etapas (clique → URL → DNS → conexão → request → response → render), com nomes corretos e legenda curta;
- mensagem de incidente que cita URL, status do recurso principal, comportamento esperado e hipótese — no estilo da "Conversa B";
- `docs/http-basico.md` com versão de bolso dos códigos HTTP (2xx, 3xx, 4xx, 5xx) sem virar tabela enciclopédica;
- menção explícita a HTTPS como cuidado, sem prometer "site seguro";
- declaração clara de que o IntraStack básico ainda **não** tem backend.

**O que ele pediria para ajustar**

- diagrama sem DNS, ou sem distinguir HTML principal e assets — pediria para incluir DNS e mostrar que página tem várias requisições;
- mensagem de incidente que diz só "não está abrindo" — pediria para acrescentar status, URL e o que **funciona** (porque o que funciona também é diagnóstico);
- frase ambígua como "o servidor caiu" sem evidência — pediria para reescrever como "primeira requisição retornou status X";
- arquivo `http-basico.md` que vira lista decorada de todos os códigos — pediria para reduzir à versão de bolso usada pelo V01.

**O que ele reprovaria**

- diagrama que invente backend, banco ou API onde o V01 ainda não tem;
- diagnóstico baseado em abrir via `file://` apresentado como "produção fora do ar";
- prometer HTTPS como "site seguro de ponta a ponta" — HTTPS é uma camada de transporte, não a soma da segurança da aplicação;
- usar exemplos com URL, e-mail ou domínio de empresa, cliente ou pessoa reais;
- transformar este capítulo em mini-curso de redes, com TCP/IP, modelo OSI ou TLS handshake — está fora do escopo do V01.

**O resumo do Mestre Py**

> "Em C02, o seu trabalho é deixar de chamar tudo de 'caiu'. Quem sabe nomear o caminho da requisição ganha tempo, ganha credibilidade no chat da equipe e ganha autonomia para investigar antes de pedir socorro. Quem não sabe, vai depender de outra pessoa para diagnosticar até em C06 — quando começar a escrever HTML de verdade."

## Mãos à Obra

Tarefa concreta do Capítulo 2.

### Contexto

Você ainda está na pasta `stackovia-intrastack-basic-rascunho/` criada no C01. Não vai criar repositório no GitHub agora (isso é C05). Vai apenas adicionar dois arquivos novos e atualizar o diário.

### Tarefa

1. Dentro de `stackovia-intrastack-basic-rascunho/`, crie a subpasta `diagrams/`. Dentro dela, crie o arquivo `diagrams/request-response.md`.
2. Dentro de `diagrams/request-response.md`, escreva:
   - uma frase de propósito ("este diagrama descreve o caminho de uma requisição HTTP para o IntraStack básico, ainda em escala de página estática");
   - o seu próprio desenho textual do fluxo, com pelo menos seis etapas (clique → separação da URL → DNS → conexão → request → response → render);
   - uma legenda curta de cada etapa, com no máximo duas linhas por etapa, no seu vocabulário;
   - uma observação explícita: "este diagrama assume hosting estático; não há backend, banco ou API no V01".
3. Dentro de `docs/`, crie `docs/http-basico.md` com:
   - definição curta de URL, com suas partes (protocolo, host, caminho);
   - definição curta de DNS, request, response e status;
   - a versão de bolso dos status (2xx, 3xx, 4xx, 5xx) usada neste capítulo;
   - parágrafo curto sobre HTTPS, sem prometer segurança completa.
4. Crie também `docs/checklist-diagnostico.md` com pelo menos três hipóteses iniciais para "página/recurso não carrega" — use, no mínimo, três das cinco famílias da seção **O que pode dar errado?**.
5. No `docs/diario-tecnico.md`, registre a entrada do C02 com:
   - data;
   - capítulo (C02);
   - uma frase sobre o que ficou mais claro;
   - uma frase sobre o que ainda está confuso;
   - uma frase sobre o próximo passo (que é o C03, sobre terminal e organização de pastas).

### Dica anti-armadilha

Não tente desenhar o caminho "perfeito de uma requisição em produção real". O seu diagrama é o caminho **do IntraStack básico**, em hosting estático, no nível do V01. Diagrama enciclopédico — com TCP, TLS, handshake, balanceador, CDN, WAF — atrapalha mais do que ajuda neste momento, e parece sofisticado por imitação, não por entendimento.

## Critérios de aceitação

Use esta lista para fechar o Capítulo 2. Cada item é "feito" ou "não feito".

- [ ] Você consegue explicar, em uma frase, o que é uma URL e quais suas três partes principais.
- [ ] Você consegue explicar, em uma frase, o que o DNS faz e por que ele importa para um sintoma de "site não encontrado".
- [ ] Você consegue dizer, sem consultar este texto, a diferença entre `404` na linha principal e `404` em um asset.
- [ ] O arquivo `diagrams/request-response.md` existe, tem pelo menos seis etapas com legenda e declara que não há backend no V01.
- [ ] O arquivo `docs/http-basico.md` existe e cobre URL, DNS, request, response, status (versão de bolso) e HTTPS.
- [ ] O arquivo `docs/checklist-diagnostico.md` existe e contém pelo menos três hipóteses para "página/recurso não carrega".
- [ ] O diário tem a entrada do C02, com data, frase de clareza, frase de confusão e próximo passo.
- [ ] Você sabe a diferença prática entre abrir o IntraStack via `file://` e via `https://`.
- [ ] Você não usou URL, e-mail ou domínio de empresa, cliente ou pessoa real em nenhum dos arquivos novos.

Se algum item não estiver marcado, volte ao trecho correspondente antes de avançar. Não há vergonha em reler — há custo em pular.

## Checklist de segurança inicial

O C02 ainda não tem código de aplicação, mas já carrega quatro regras de higiene de transporte e diagnóstico:

- [ ] Toda URL que você usar nos arquivos do C02 está em `https://` quando o exemplo for de página hospedada.
- [ ] Nenhum exemplo usa URL, domínio, e-mail, IP ou nome de empresa real. Para domínios fictícios, use **TLDs reservados** como `intra.stackovia.example` ou `exemplo.test`, ou ainda `localhost`. Para IPs de exemplo, use faixas de documentação como `203.0.113.0/24`. Evite TLDs reais como `.dev`, `.com` ou `.app`, mesmo em estudo.
- [ ] Nenhuma mensagem de incidente sua afirma "produção fora do ar" sem evidência mínima (URL + status + o que funciona).
- [ ] Você não promete que "HTTPS deixa o site seguro" — você descreve HTTPS como cuidado mínimo de transporte.

Esses quatro pontos voltam, com mais profundidade, nos capítulos C11 e C12.

## Entrega de portfólio

O Capítulo 2 ainda não produz evidência **pública** no GitHub — o repositório oficial nasce só no C05. O que ele produz é evidência **interna** que vai virar a base do README e dos diagramas do projeto.

### Artefato GitHub esperado

Nenhum publicado ainda. Quando o repositório nascer no C05, os arquivos `diagrams/request-response.md`, `docs/http-basico.md` e `docs/checklist-diagnostico.md` vão entrar nos primeiros commits.

### README esperado

Nenhum README oficial neste momento. O que você está construindo é matéria-prima do README futuro: o diagrama vira ilustração; o checklist vira nota de diagnóstico; o `http-basico.md` vira referência interna.

### Entregas obrigatórias do C02

As **quatro** entregas obrigatórias deste capítulo são, e somente:

- `diagrams/request-response.md` com o caminho da requisição;
- `docs/http-basico.md` com a versão de bolso dos conceitos;
- `docs/checklist-diagnostico.md` com pelo menos três hipóteses para "página/recurso não carrega";
- atualização do `docs/diario-tecnico.md` com a entrada do C02.

### Screenshots ou diagramas esperados

- diagrama textual de `diagrams/request-response.md` (já é uma entrega visual em texto).
- **Opcional, sem obrigação no C02:** uma captura de tela da aba Network do navegador, mostrando o status de uma requisição qualquer, **apenas se você quiser** guardar como registro pessoal. Se você optar por salvar, use uma pasta chamada `assets/screenshots/`. **Não precisa criar essa pasta agora** caso não tenha screenshot a guardar — ela aparece na estrutura-alvo do volume e nasce de forma natural quando houver imagem real para versionar.

### Evidências internas que ficam prontas no C02

- caminho da requisição desenhado no seu vocabulário;
- referência interna de HTTP em nível de bolso;
- checklist inicial de diagnóstico;
- diário com a entrada do C02.

### Limitações que devem aparecer

- não há backend, banco ou API real no IntraStack básico;
- o diagrama assume hospedagem estática, não cobre arquitetura de produção;
- a versão de bolso dos status HTTP não cobre todos os códigos existentes;
- HTTPS aparece como cuidado mínimo de transporte, não como prova de segurança da aplicação.

### Rótulo de maturidade

**Estudo / Fundamentos.**

## Mini post LinkedIn

Você ainda não vai publicar nada — pelos mesmos motivos do C01. Mas já pode rascunhar uma versão curta de post para reaproveitar quando o repositório existir.

**Gancho honesto:**

> "Eu parei de tratar 'site fora do ar' como uma única coisa."

**Corpo curto:**

> "Hoje desenhei o caminho de uma requisição HTTP para um projeto pequeno de fundamentos. URL → DNS → request → response → render. O exercício foi menos sobre 'aprender internet' e mais sobre parar de confundir `404` com 'caiu', e parar de chamar `file://` de 'produção'."

**Limitação que deve aparecer no post:**

> "É um fluxo introdutório de página estática, não arquitetura de produção. Não há backend, não há banco, não há API."

Guarde esse rascunho no `docs/diario-tecnico.md`. Ele volta no C04 ou C05, quando houver link de repositório real para incluir.

## Perguntas de revisão

Antes de virar para o C03, revise estas perguntas mentalmente. Se alguma travar, volte à seção correspondente.

1. Quais são as três partes principais de uma URL e o que cada uma significa?
2. O que o DNS faz, em uma frase, e qual sintoma cheira a falha de DNS?
3. Qual é a diferença prática entre `404` na linha principal e `404` em um asset?
4. Por que abrir o IntraStack via `file://` não é equivalente a abrir via `https://`?
5. Quais são, no mínimo, três famílias de causa para "página/recurso não carrega"?
6. Por que, no V01, HTTPS é descrito como "cuidado mínimo de transporte" e não como "site seguro"?

Se você consegue responder essas seis perguntas sem consultar o texto, o Capítulo 2 cumpriu o papel dele.

## Próximo passo

O C02 te deu um mapa. O C03 te dá a casa onde esse mapa vai morar.

No próximo capítulo, você vai sair do navegador e descer para o terminal: pastas, arquivos, caminhos relativos e absolutos, hábitos básicos de organização que o IntraStack básico vai herdar. Não é teoria de Unix; é o mínimo necessário para você conseguir criar, mover, listar e abrir arquivos sem depender só de interface gráfica.

Antes de seguir, confira: a sua pasta `stackovia-intrastack-basic-rascunho/` agora tem `docs/escopo-v01.md`, `docs/diario-tecnico.md` (com duas entradas), `docs/http-basico.md`, `docs/checklist-diagnostico.md` e `diagrams/request-response.md`. Se sim, vire para o Capítulo 3.
