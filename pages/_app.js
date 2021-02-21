/* eslint-disable react/prop-types */
import Head from "next/head";
import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/contexts/theme";
import { Toasty } from "@/components/toasty";

import config from "@/config";
import webConfig from "web.config";

import "@/styles/tailwind.css";
import "@/styles/toast.css";
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

					{/* Twitter */}
					<meta property="twitter:url" content={webConfig.publishdomain} />
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
