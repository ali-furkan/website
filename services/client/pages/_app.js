/* eslint-disable react/prop-types */
import Head from "next/head";
import { AuthProvider } from "contexts/auth";
import { ThemeProvider } from "contexts/theme";
import config from "@config/index";
import { Toasty } from "@components/toasty";

import "@styles/tailwind.css";
import "@styles/toast.css";
import "react-toastify/dist/ReactToastify.css";

export function reportWebVitals(metric) {
    if (!config.isProd) console.log(metric);
}

const MyApp = ({ Component, pageProps }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Head>
                    <title>Ali Furkan - Website</title>
                    <meta name="keywords" content="Ali Furkan, Portfolio" />
                    <meta name="description" content="Ali Furkan's Portfolio" />
                    <meta name="author" content="Ali Furkan" />
                    <meta property="og:title" content="Ali Furkan - Website" />
                    <meta
                        property="og:description"
                        content="Ali Furkan - Website"
                    />
                    <meta name="theme-color" content="#4F2BDF" />
                    <meta
                        property="og:image"
                        content="https://raw.githubusercontent.com/ali-furkqn/Website/master/assets/repo-banner.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <Component {...pageProps} />
                <Toasty />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default MyApp;
