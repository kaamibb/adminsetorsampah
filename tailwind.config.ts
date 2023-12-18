import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#30AF5B',
          90: '#292C27',
          800: '#91cb3d',
          600: '#60A855',
          500: '#4CAF50',
          400: '#66BB6A',
          200: '#193820',
          201: '#2c4d33',
          300: '#90e5ac',
        },
        gray: {
          10: '#EEEEEE',
          20: '#a2aab8',
          30: '#7B7B7B',
          50: '#f6f7f8',
          90: '#4d4f5b',
          200:'#dadde3',
          700:'#6e7287',
          120: '#667380',
          300:'#c1c7cf',
        },
        orange: {
          50: '#FF814C',
        },
        blue: {
          70: '#045fa2',
          200: '#0c97d0',
          120: '#41c1df',
          130:'#043b7f',
        },
        yellow: {
          50: '#FEC601',
          200:'#F9FAFB',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
