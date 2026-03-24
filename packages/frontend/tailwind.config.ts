import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: '#0f172a',
        pearl: {
          DEFAULT: '#F6F7F7',
          50: '#FFFFFF',
          100: '#F6F7F7',
          200: '#EAECEC',
          300: '#D5D8D8',
          400: '#B8BEBE',
          500: '#9AA2A2'
        },
        sand: {
          DEFAULT: '#A28958',
          50: '#F5EFE4',
          100: '#EDE1CA',
          200: '#D9C4A0',
          300: '#C4A570',
          400: '#B59563',
          500: '#A28958',
          600: '#8B7347',
          700: '#705C38',
          800: '#524329',
          900: '#332A19'
        },
        mist: {
          DEFAULT: '#9A99A7',
          50: '#F0F0F3',
          100: '#E2E2E8',
          200: '#C8C7D2',
          300: '#ADACBC',
          400: '#A29FB0',
          500: '#9A99A7',
          600: '#7E7D8E',
          700: '#636272',
          800: '#474657',
          900: '#2D2C3A'
        },
        mauve: {
          DEFAULT: '#7C646C',
          50: '#F2ECEE',
          100: '#E5DADD',
          200: '#C9B5BB',
          300: '#B09699',
          400: '#967880',
          500: '#7C646C',
          600: '#684F58',
          700: '#523B43',
          800: '#3C282E',
          900: '#26161A'
        },
        navy: {
          DEFAULT: '#2C435D',
          50: '#EBF0F6',
          100: '#D5E0EC',
          200: '#ABCCD9',
          300: '#7BA8C9',
          400: '#5088B3',
          500: '#3B6A99',
          600: '#375C80',
          700: '#2C435D',
          800: '#1E2E40',
          900: '#111A24'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    }
  },
  plugins: []
}

export default config
