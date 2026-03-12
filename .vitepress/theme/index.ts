// https://vitepress.dev/guide/custom-theme
import { defineComponent, h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './fonts.css'
import './style.css'
import './custom.css'
import BackToTop from '../components/BackToTop.vue'
// import PdfViewer from '../components/PdfViewer.vue'
import Donate from '../components/Donate.vue'
import { defineAsyncComponent } from 'vue'
import Vertical from '../components/Vertical.vue'

// 懒加载 PdfViewer 组件
const PdfViewer = defineAsyncComponent({
  // 加载组件（动态import，Vite会拆分成单独的chunk）
  loader: () => import('../components/PdfViewer.vue'),
  // 加载中的占位（可选，提升体验）
  loadingComponent: () => h('span', { style: 'color: #666;' }, 'PDF.js加载中...'),
  // 加载失败的兜底（可选）
  errorComponent: () => h('span', { style: 'color: #ff4444;' }, 'PDF.js加载失败'),
  // 延迟显示加载占位（避免闪屏，单位ms）
  delay: 200,
  // 超时时间（可选）
  timeout: 5000
})

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(BackToTop),
    })
  },

  enhanceApp({ app }) {
    app.component('PdfViewer', PdfViewer);
    app.component('Donate', Donate);
    app.component('Vertical', Vertical)
  },
} satisfies Theme
