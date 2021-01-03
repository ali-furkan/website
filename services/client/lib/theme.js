import React from "react";
import { ThemeContext } from "contexts/theme";

export const useTheme = () => {
    const [theme, setTheme] = React.useState("light");
    const ctxTheme = React.useContext(ThemeContext);

    React.useEffect(() => {
        const themeHandler = () => {
            if (!window.matchMedia) return setTheme("dark");
            const themeQuery = (s) =>
                window.matchMedia(`(prefers-color-scheme: ${s})`).matches;
            if (themeQuery("light")) return setTheme("light");
            if (themeQuery("dark")) return setTheme("dark");
            if (typeof ctxTheme === "string") return setTheme(ctxTheme);
        };
        themeHandler();
    }, [theme]);
    return [theme, setTheme];
};
