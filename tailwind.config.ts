import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        valthera: {
          bg: '#05070d',
          panel: '#0c111d',
          border: '#1b2638',
          text: '#f8fafc',
          muted: '#94a3b8',
          accent: '#7c3aed',
          cyan: '#22d3ee'
        }
      }
    }
  },
  plugins: []
}

export default config
