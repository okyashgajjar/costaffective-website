/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          hover: '#0052A3',
          glow: 'rgba(0, 102, 204, 0.08)',
        },
        secondary: {
          DEFAULT: '#7000FF',
          glow: 'rgba(112, 0, 255, 0.08)',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          alt: '#FAF9F6',
          card: '#FFFFFF',
        },
        charcoal: {
          DEFAULT: '#191919',
          light: '#666660',
          grey: '#888880',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Lora', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
