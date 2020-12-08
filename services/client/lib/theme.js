import {createContext, useState, useEffect, useContext} from "react"

export const ThemeContext = createContext("light")

export const useTheme = () => {
    const [theme, setTheme] = useState("light")
    const ctxTheme = useContext(ThemeContext)
    
    useEffect(()=>{
        const themeHandler = () => {
            if(!window.matchMedia) 
                return setTheme("dark")
            const themeQuery = s => window.matchMedia(`(prefers-color-scheme: ${s})`).matches
            if(themeQuery("light"))
                return setTheme("light")
            if(themeQuery("dark"))
                return setTheme("dark")
            if(typeof ctxTheme === "string")
                return setTheme(ctxTheme)
        }
        themeHandler()
    },[theme])
    return [theme,setTheme]
}