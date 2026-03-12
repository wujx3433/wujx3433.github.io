import { defineConfig } from 'vitepress';
import mathjax3 from 'markdown-it-mathjax3';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(mathjax3, {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']]
        }
      });
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['mjx-assistive-mml', 'mjx-container'].includes(tag)
      }
    }
  },
  title: "ZnP锌小屋",
  description: "A place to put down my spirits.",
  locales: {
    root: {
      label: 'Chinese',
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  ignoreDeadLinks: true,
  outline: [2, 6],
  lastUpdated: true,
  prev: false,
  next: false,
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '小说', link: '/novel-docs' },
      { text: '通联日志', link: '/ham-log' },
      { text: '博客', link: '/blog-docs' },
      { text: '友情链接', link: '/friends' },
      { text: '本项目', link: 'https://github.com/wujx3433/wujx3433.github.io' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wujx3433' },
      { icon: 'twitter', link: 'https://twitter.com/wujx3433' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/7619378' }
    ],
    footer: {
      message: 'Released under CC BY-NC-SA 4.0 License.',
      copyright: 'Copyright © wujx3433 aka Zn.'
    },
    search: {
      provider: 'local'
    },
  }
});