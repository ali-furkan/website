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
                <meta name="keywords" content="Ali Furkan, Portfolio" />
                <meta name="description" content="Ali Furkan's Portfolio" />
                <meta name="author" content="Ali Furkan" />
                <meta property="og:title" content="Ali Furkan - Website" />
                <meta property="og:description" content="Ali Furkan - Website" />
                <meta name="theme-color" content="#4F2BDF"/>
                <meta property="og:image" content="https://raw.githubusercontent.com/ali-furkqn/Website/master/assets/repo-banner.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Component {...pageProps} />
        </ThemeContext.Provider>
    );
} 

export default MyApp;
