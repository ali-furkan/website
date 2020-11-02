/* eslint-disable react/prop-types */
import Head from "next/head";
import "@styles/tailwind.css";
import {ThemeContext, useTheme} from "@lib/theme"
export function reportWebVitals(metric) {
    console.log(metric);
}

const MyApp = ({ Component, pageProps }) => {
    const [theme] = useTheme()
    
    return (
        <ThemeContext.Provider value={theme}>
            <Head>
                <title>Ali Furkan - Website</title>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Component {...pageProps} />
        </ThemeContext.Provider>
    );
} 

export default MyApp;
