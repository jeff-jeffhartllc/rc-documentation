import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'RC Documentation',
  description: 'Documentation for the RC project',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ]
  }
})
