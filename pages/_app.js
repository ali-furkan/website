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
                    <link rel="manifest" href="/manifest.json" />

                    <title>{webConfig.Meta.title}</title>

                    {/* Meta Tags */}
                    <meta name="theme-color" content={webConfig.Meta.color} />
                    <meta name="author" content={webConfig.Meta.author} />
                    <meta name="keywords" content={webConfig.Meta.keywords} />
                    <meta
                        name="description"
                        content={webConfig.Meta.description}
                    />

                    {/* Open Graph */}
                    <meta property="og:title" content={webConfig.Meta.title} />
                    <meta
                        property="og:description"
                        content={webConfig.Meta.description}
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={webConfig.PublishDomain} />
                    <meta
                        property="og:site_name"
                        content={webConfig.Meta.author}
                    />
                    <meta
                        property="og:image"
                        content={`https://${webConfig.PublishDomain}${webConfig.Meta.image}`}
                    />
                    <meta property="og:locale" content="en_GB" />
                    <meta property="og:locale:alternate" content="tr_TR" />

                    {/* Twitter */}
                    <meta
                        property="twitter:url"
                        content={webConfig.PublishDomain}
                    />
                    <meta
                        property="twitter:title"
                        content={webConfig.Meta.title}
                    />
                    <meta
                        property="twitter:description"
                        content={webConfig.Meta.description}
                    />
                    <meta
                        property="twitter:image"
                        content={`https://${webConfig.PublishDomain}${webConfig.Meta.image}`}
                    />

                    <meta
                        property="twitter:card"
                        content={`https://${webConfig.PublishDomain}${webConfig.Meta.image}`}
                    />

                    {/* Google Analytics */}
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-134822812-3"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'UA-134822812-3');
                            `,
                        }}
                    />
                </Head>
                <Component {...pageProps} />
                <Toasty />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default MyApp;
