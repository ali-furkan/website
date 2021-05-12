const { spacing, borderRadius, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: {
    mode: "all",
    preserveHtmlElements: false,
    content: ["./components/**/*.js","./pages/**/*.js"]
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans]
      },
      colors: {
        gray: {
          "450": "#777"
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            "h1,h2,h3,h4": { 'margin-top': spacing[12]  },
            a: {
              color: theme("colors.gray.800"),
              "transtion-property": "all",
              "transition-duration": ".2s",
              "&:hover": {
                color: theme("colors.gray.400")
              }
            },
            code: {
              color: theme("colors.gray.500"),
              padding: "0.125rem",
              margin: "0 0.25rem",
              "border-radius": borderRadius.md,
            }
          }
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            "h1,h2,h3,h4": { color: theme("colors.gray.100") },
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.900")
              }
            },
          },
        }
      })
    },
  },
  variants: {
    extend: { 
      typography: ["dark"],
      backgroundOpacity: ["active"]
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
