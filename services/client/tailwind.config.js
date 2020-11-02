const { colors } = require("./config/configuration");

const colorWhiteList = Object.entries(colors)
    .map(([key, val]) => [
        ...Object.keys(val).map((c) => `bg-${key}-${c}`),
        ...Object.keys(val).map((c) => `text-${key}-${c}`),
    ])
    .reduce((a, b) => [...a, ...b]);

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    experimental: {
        applyComplexClasses: true,
    },
    purge: {
        content: ["./pages/**/*.js", "./layouts/**/*.js"],
        options: {
            tailwind: true,
            whitelist: [...colorWhiteList, "bg-white", "text-white"],
        },
    },
    theme: {
        fontFamily: {
            display: ["Inter", "sans-serif"],
        },
        extend: {
            zIndex: {
                "75": 75,
                "99": 99,
                "100": 100,
                "101": 101,
            },
            screens: {
                light: { raw: "(prefers-color-scheme: light)" },
                dark: { raw: "(prefers-color-scheme: dark)" },
            },
            boxShadow: {
                lg: `0 10px 15px -3px ${colors.secondary[500]}40, 0 4px 6px -2px ${colors.secondary[500]}40`
            },
            borderRadius: {
                default: "12px",
            },
            colors,
        },
    },
    plugins: [
        ({ addBase, config }) => {
            addBase({
                body: {
                    color: config("theme.colors.primary.500"),
                    backgroundColor: config("theme.colors.white"),
                },
                "@screen dark": {
                    body: {
                        color: config("theme.colors.white"),
                        backgroundColor: config("theme.colors.primary.500"),
                    },
                },
            });
        },
    ],
};
