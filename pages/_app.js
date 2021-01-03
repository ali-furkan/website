/* eslint-disable react/prop-types */
import Head from "next/head";
import { AuthProvider } from "contexts/auth";
import { ThemeProvider } from "contexts/theme";
import { Toasty } from "@components/toasty";
import config from "@config/index";
import webConfig from "web.config";

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
                    <title>{webConfig.Meta.title}</title>
                    <meta name="theme-color" content={webConfig.Meta.color} />
                    <meta name="author" content={webConfig.Meta.author} />
                    <meta name="keywords" content={webConfig.Meta.keywords} />
                    <meta property="og:title" content={webConfig.Meta.title} />
                    <meta property="og:url" content={webConfig.PublishDomain} />
                    <meta property="og:image" content={webConfig.Meta.image} />
                    <meta property="og:og:locale" content="en_GB" />
                    <meta property="og:og:locale:alternate" content="tr_TR" />
                    <meta
                        name="description"
                        content={webConfig.Meta.description}
                    />
                    <meta
                        property="og:description"
                        content={webConfig.Meta.description}
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
