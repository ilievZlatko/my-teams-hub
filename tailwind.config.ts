import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'mth-dark': {
          50: '#ebecec',
          100: '#c2c3c3',
          200: '#a4a6a7',
          300: '#7a7d7e',
          400: '#616465',
          500: '#393d3f',
          600: '#343839',
          700: '#282b2d',
          800: '#1f2223',
          900: '#181a1a',
        },
        'mth-white': {
          50: '#fefeff',
          100: '#fdfdfd',
          200: '#fcfcfd',
          300: '#fafafc',
          400: '#f9f9fb',
          500: '#f8f8fa',
          600: '#e2e2e4',
          700: '#b0b0b2',
          800: '#88888a',
          900: '#686869',
        },
        'mth-silver': {
          50: '#f9f9f8',
          100: '#edede9',
          200: '#e5e4df',
          300: '#d9d8d0',
          400: '#d1d1c7',
          500: '#c6c5b9',
          600: '#b4b3a8',
          700: '#8d8c83',
          800: '#6d6c66',
          900: '#53534e',
        },
        'mth-blue': {
          50: '#eff4f5',
          100: '#cfdde1',
          200: '#b7cdd2',
          300: '#96b6be',
          400: '#82a8b1',
          500: '#63929e',
          600: '#5a8590',
          700: '#466870',
          800: '#365057',
          900: '#2a3d42',
        },
        'mth-grey-blue': {
          50: '#eef0f2',
          100: '#cad1d6',
          200: '#b0bac2',
          300: '#8c9ba7',
          400: '#768895',
          500: '#546a7b',
          600: '#4c6070',
          700: '#3c4b57',
          800: '#2e3a44',
          900: '#232d34',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        opensans: ['var(--font-opensans)', ...fontFamily.sans],
        roboto: ['var(--font-roboto)', ...fontFamily.serif],
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
