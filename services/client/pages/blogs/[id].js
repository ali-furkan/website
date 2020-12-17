/* eslint-disable react/prop-types */
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import configuration from "@config/configuration";
import MainLayout from "@layouts/main";
import { MdxPageHead } from "@components/mdx-header";
import { Text } from "@components/text";
import { Container } from "@components/container";

const BlogPage = ({ source }) => {
    const content = hydrate(source,{MdxPageHead, Text})

    return (
        <Container>
            {content}
        </Container>
    )
};

export const getStaticPaths = async () => {
    try {
        const res = await fetch(configuration.baseUrl + "/blogs-metas", {
            headers: {
                Authorization: process.env.STORAGE_TOKEN,
            },
        });

        if (!res.ok) throw new Error(res.statusText);

        const blogs = await res.json();

        const paths = blogs.map((b) => ({
            params: { id: b.href.query.id },
        }));

        return { paths, fallback: false };
    } catch (e) {
        console.debug("Blog Page getStaticPaths", e);
        return { paths: [], fallback: false };
    }
};

export const getStaticProps = async ({ params }) => {
    try {
        console.log("HELLO")
        const res = await fetch(configuration.baseUrl + "/blogs/" + params.id);
        if (!res.ok) throw new Error(res.statusText);
        const source = await res.text();
        console.log("HELLO")
        const mdxSource = await renderToString(source, {
            components: { MdxPageHead, Text },
        });

        return {
            props: {
                source: mdxSource,
            },
        };
    } catch (e) {
        console.log("Blog Page", e);
        return {
            notFound: true,
        };
    }
};

export default MainLayout(BlogPage);
