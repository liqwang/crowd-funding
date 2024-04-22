import type { Config } from 'tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'

const config: Config = {
  content: [
    './src/component/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: { // https://tailwindcss.com/docs/screens
        '3xl': '1800px'
      }
    }
  },
  plugins: [
    // https://daisyui.com/docs/install
    require('daisyui'),
    
    // https://iconify.design/docs/usage/css/tailwind
    // https://marketplace.visualstudio.com/items?itemName=antfu.iconify
    addDynamicIconSelectors()
  ]
}
export default config
