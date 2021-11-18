import Head from "next/head"
import { ThemeProvider } from "next-themes"

import webConfig from "web.config"

import "@/styles/base.css"

export function reportWebVitals(metric) {
    if (process.env.NODE_ENV !== "production") console.log(metric)
}

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />

                <title>{webConfig.meta.title}</title>

                {/* Meta Tags */}
                <meta name="theme-color" content={webConfig.meta.color} />
                <meta name="author" content={webConfig.meta.author} />
                <meta name="keywords" content={webConfig.meta.keywords} />
                <meta name="description" content={webConfig.meta.description} />

                {/* Open Graph */}
                <meta property="og:title" content={webConfig.meta.title} />
                <meta
                    property="og:description"
                    content={webConfig.meta.description}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={webConfig.publishdomain} />
                <meta property="og:site_name" content={webConfig.meta.author} />
                <meta
                    property="og:image"
                    content={`https://${webConfig.publishdomain}${webConfig.meta.image}`}
                />
                <meta property="og:locale" content="en_GB" />
                <meta property="og:locale:alternate" content="tr_TR" />
                <meta property="og:locale:alternate" content="en_US" />

                {/* Twitter */}
                <meta
                    property="twitter:url"
                    content={webConfig.publishdomain}
                />
                <meta property="twitter:title" content={webConfig.meta.title} />
                <meta
                    property="twitter:description"
                    content={webConfig.meta.description}
                />
                <meta
                    property="twitter:image"
                    content={`https://${webConfig.publishdomain}${webConfig.meta.image}`}
                />

                <meta
                    property="twitter:card"
                    content={`https://${webConfig.publishdomain}${webConfig.meta.image}`}
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
                            `
                    }}
                />
            </Head>
            <ThemeProvider attribute="class">
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

export default MyApp
