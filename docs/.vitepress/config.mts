import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vol. 01 — Fundamentos do Dev Moderno',
  description:
    'Stackovia Learning Series — Volume 1. Da primeira linha de terminal ao primeiro capítulo publicado no GitHub.',
  lang: 'pt-BR',

  // Em producao: GitHub Pages usa o nome do repo como subpath
  base: '/stackovia-vol01-fundamentos-dev-moderno/',

  head: [
    ['meta', { name: 'author', content: 'Marcos Oliveira / Stackovia Learning Series' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vol. 01 — Fundamentos do Dev Moderno | Stackovia' }],
  ],

  themeConfig: {
    siteTitle: 'Stackovia · Vol. 01',

    nav: [
      { text: 'Início', link: '/' },
      { text: 'Guia do Volume', link: '/guia-do-volume' },
      { text: 'Capítulos', link: '/capitulos/cap01' },
      {
        text: 'Hub da Série',
        link: 'https://mffdeo.github.io/stackovia-learning/',
      },
    ],

    sidebar: [
      {
        text: 'Volume 01',
        items: [
          { text: 'Início', link: '/' },
          { text: 'Guia do Volume', link: '/guia-do-volume' },
        ],
      },
      {
        text: 'Capítulos',
        items: [
          {
            text: 'Cap. 01 — Entrada na Stackovia',
            link: '/capitulos/cap01',
          },
          {
            text: 'Cap. 02 — Como a internet funciona',
            link: '/capitulos/cap02',
          },
          {
            text: 'Cap. 03 — Terminal, pastas e arquivos',
            link: '/capitulos/cap03',
          },
          {
            text: 'Cap. 04 — Git como memória do aprendizado',
            link: '/capitulos/cap04',
          },
          {
            text: 'Cap. 05 — GitHub, README e Pull Request',
            link: '/capitulos/cap05',
          },
          {
            text: 'Cap. 06 — HTML semântico para a primeira página',
            link: '/capitulos/cap06',
          },
          {
            text: 'Cap. 07 — CSS moderno e layout responsivo',
            link: '/capitulos/cap07',
          },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/mffdeo/stackovia-vol01-fundamentos-dev-moderno',
      },
    ],

    footer: {
      message:
        'Conteúdo sob <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>. Código sob <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>.',
      copyright: 'Stackovia Learning Series',
    },

  },
})
