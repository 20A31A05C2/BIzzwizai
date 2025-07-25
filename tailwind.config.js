/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'bizzwiz-background': 'hsl(var(--bizzwiz-background))',
        'bizzwiz-foreground': 'hsl(var(--bizzwiz-foreground))',
        'bizzwiz-primary': 'hsl(var(--bizzwiz-primary))',
        'bizzwiz-primary-foreground': 'hsl(var(--bizzwiz-primary-foreground))',
        'bizzwiz-secondary': 'hsl(var(--bizzwiz-secondary))',
        'bizzwiz-secondary-foreground': 'hsl(var(--bizzwiz-secondary-foreground))',
        'bizzwiz-accent': 'hsl(var(--bizzwiz-accent))',
        'bizzwiz-accent-foreground': 'hsl(var(--bizzwiz-accent-foreground))',
        'bizzwiz-destructive': 'hsl(var(--bizzwiz-destructive))',
        'bizzwiz-destructive-foreground': 'hsl(var(--bizzwiz-destructive-foreground))',
        'bizzwiz-muted': 'hsl(var(--bizzwiz-muted))',
        'bizzwiz-muted-foreground': 'hsl(var(--bizzwiz-muted-foreground))',
        'bizzwiz-card': 'hsl(var(--bizzwiz-card))',
        'bizzwiz-card-foreground': 'hsl(var(--bizzwiz-card-foreground))',
        'bizzwiz-popover': 'hsl(var(--bizzwiz-popover))',
        'bizzwiz-popover-foreground': 'hsl(var(--bizzwiz-popover-foreground))',
        'bizzwiz-border': 'hsl(var(--bizzwiz-border))',
        'bizzwiz-input': 'hsl(var(--bizzwiz-input))',
        'bizzwiz-ring': 'hsl(var(--bizzwiz-ring))',
        
        'bizzwiz-deep-space': 'hsl(var(--bizzwiz-deep-space))',
        'bizzwiz-nebula-purple': 'hsl(var(--bizzwiz-nebula-purple))',
        'bizzwiz-electric-cyan': 'hsl(var(--bizzwiz-electric-cyan))',
        'bizzwiz-magenta-flare': 'hsl(var(--bizzwiz-magenta-flare))',
        'bizzwiz-star-white': 'hsl(var(--bizzwiz-star-white))',
        'bizzwiz-comet-tail': 'hsl(var(--bizzwiz-comet-tail))',
        'bizzwiz-glass-bg': 'hsla(var(--bizzwiz-glass-bg-rgb), 0.6)',
        'bizzwiz-text-primary': 'hsl(var(--bizzwiz-text-primary))',
        'bizzwiz-text-secondary': 'hsl(var(--bizzwiz-text-secondary))',
        'bizzwiz-text-alt': 'hsl(var(--bizzwiz-comet-tail))',
        'bizzwiz-text-main': 'hsl(var(--bizzwiz-text-primary))',

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      ringOffsetColor: {
        'bizzwiz-card-background': 'hsl(var(--bizzwiz-card-background))',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0, opacity: 0.5 },
          to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: 1 },
          to: { height: 0, opacity: 0.5 },
        },
        "text-gradient-cosmic-flow": {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        "aurora-bg": {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        "cosmic-drift": {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '25%': { transform: 'translate(5px, 10px) rotate(3deg)' },
          '50%': { transform: 'translate(-5px, -5px) rotate(-2deg)' },
          '75%': { transform: 'translate(10px, -5px) rotate(1deg)' },
        },
        "subtle-pulse": {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.03)' },
        },
        "slow-gradient-move": {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        "text-gradient-cosmic-flow": "text-gradient-cosmic-flow 10s ease infinite",
        "aurora-bg": "aurora-bg 20s ease infinite",
        "cosmic-drift": "cosmic-drift 15s ease-in-out infinite",
        "subtle-pulse": "subtle-pulse 3s ease-in-out infinite",
        "slow-gradient-move": "slow-gradient-move 25s ease infinite",
      },
      boxShadow: {
        'glow-electric-cyan': '0 0 20px 0px hsla(var(--bizzwiz-electric-cyan-rgb), 0.7), 0 0 30px -5px hsla(var(--bizzwiz-electric-cyan-rgb), 0.5)',
        'glow-magenta-flare': '0 0 20px 0px hsla(var(--bizzwiz-magenta-flare-rgb), 0.7), 0 0 30px -5px hsla(var(--bizzwiz-magenta-flare-rgb), 0.5)',
        'glow-nebula-purple': '0 0 20px 0px hsla(var(--bizzwiz-nebula-purple-rgb), 0.6), 0 0 30px -5px hsla(var(--bizzwiz-nebula-purple-rgb), 0.4)',
      },
      saturate: {
        '115': '1.15',
        '125': '1.25',
      },
      scale: {
        '103': '1.03',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}