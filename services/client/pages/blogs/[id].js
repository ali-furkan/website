/* eslint-disable react/prop-types */
import React from "react"
import {useRouter} from "next/router"
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import MainLayout from "@layouts/main";
import { MdxPageHead } from "@components/mdx-header";
import { Text } from "@components/text";
import { Container } from "@components/container";

const BlogPage = ({ source }) => {
    const router = useRouter();
    React.useEffect(() => {
        if (!source) return router.push("/projects");
    });
    if (!source) return <h1>Page not found</h1>;
    const content = hydrate(source,{MdxPageHead, Text})

    return (
        <Container>
            {content}
        </Container>
    )
};

export const getStaticPaths = async () => {
    try {
        const res = await fetch(process.env.STORAGE_BASE_URL + "/blogs-metas", {
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
        const res = await fetch(process.env.STORAGE_BASE_URL + "/blogs/" + params.id);
        if (!res.ok) throw new Error(res.statusText);
        const source = await res.text();
        const mdxSource = await renderToString(source, {
            components: { MdxPageHead, Text },
        });

        return {
            revalidate: 60,
            props: {
                source: mdxSource||"",
            },
        };
    } catch (e) {
        console.log("Blog Page", e);
        return {
            revalidate: 60,
            props: {
                source: ""
            }
        };
    }
};

export default MainLayout(BlogPage);
