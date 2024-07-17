import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: 'var(--ion-color-primary)',
      secondary: 'var(--ion-color-secondary)',
      tertiary: 'var(--ion-color-tertiary)',
      success: 'var(--ion-color-success)',
      warning: 'var(--ion-color-warning)',
      danger: 'var(--ion-color-danger)',
    },
  },
  plugins: [],
} satisfies Config

