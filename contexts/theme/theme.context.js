/* eslint-disable react/prop-types */
import React from "react";

import { useTheme } from "@/lib/theme";

export const ThemeContext = React.createContext("light");

export const ThemeProvider = ({ children }) => {
    const [theme] = useTheme();
    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};
