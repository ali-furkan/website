/* eslint-disable react/prop-types */
import Head from "next/head";
import "@styles/tailwind.css";

export function reportWebVitals(metric) {
    console.log(metric);
}

const MyApp = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>Ali Furkan - Website</title>
        </Head>
        <Component {...pageProps} />
    </>
);

export default MyApp;
