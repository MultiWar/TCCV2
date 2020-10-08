import { theme, DefaultTheme } from '@chakra-ui/core'
import React from 'react'

const fonts = { ...theme.fonts, mono: `'Menlo', monospace` }

const breakpoints = ['520px', '800px', '1100px', '1200px']

const customTheme: DefaultTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    black: '#16161D',
    blue: {
      50: '#dff4ff',
      100: '#b5dbfd',
      200: '#88c1f6',
      300: '#5ba9f0',
      400: '#258BE9',
      500: '#1577d0',
      600: '#095ca3',
      700: '#024276',
      800: '#002849',
      900: '#000e1e',
    },
    gray: {
      ...theme.colors.gray,
      200: '#eee',
      800: '#333'
    }
  },
  fonts,
  breakpoints,
  icons: {
    ...theme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
}

export default customTheme
