/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],  theme: {
    extend: {
      colors: {
        primary: {
          0: 'var(--color-primary-900)',
          1: 'var(--color-primary-800)',
          2: 'var(--color-primary-700)',
          3: 'var(--color-primary-600)',
          4: 'var(--color-primary-500)',
          5: 'var(--color-primary-400)',
          DEFAULT: 'var(--color-primary-900)',
        },
        // background: #ADCCDA;

        green: {
          0: 'var(--color-green-900)',
          1: 'var(--color-green-800)',
          2: 'var(--color-green-700)',
        },
        orange: {
          0: 'var(--color-orange-900)',
        },
        black: {
          0: 'var(--color-black-900)',
          1: 'var(--color-black-800)',
        },
        white: {
          0: 'var(--color-white-900)',
          1: 'var(--color-white-800)',
        },
        gray: {
          1: 'var(--color-gray-800)',
          2: 'var(--color-gray-700)',

        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}