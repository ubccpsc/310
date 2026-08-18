import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Youtube from './components/Youtube.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registered globally so converted reader pages can use <Youtube id="..." />
    // directly in markdown without a per-file import.
    app.component('Youtube', Youtube)
  },
} satisfies Theme
