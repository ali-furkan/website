/* eslint-disable react/prop-types */
import React from "react";
import { useRouter } from "next/router";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import matter from "gray-matter";

import config from "@/config";

import MainLayout from "@/layouts/main";
import { MdxPageHead } from "@/components/mdx-header";
import { MdxPageText } from "@/components/mdx-text";
import { Text } from "@/components/text";
import Article from "@/containers/article";


const components = { MdxPageHead, MdxPageText, Text };

const ProjectPage = ({ source }) => {
    const router = useRouter();
    React.useEffect(() => {
        if (!source) return router.push("/projects");
    });
    if (!source) return <h1>Page not found</h1>;
    const content = hydrate(source, { components });

    return (
        <MainLayout>
            <Article>{content}</Article>
        </MainLayout>
    );
};

export const getStaticPaths = async () => {
    try {
        const res = await fetch(config.baseUrl + "/projects-metas", {
            headers: {
                Authorization: process.env.STORAGE_TOKEN,
            },
        });

        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();

        const paths = await Promise.all(
            data.map(async (b) => {
                const res = await fetch(b.url);
                if (!res.ok) return null;
                const d = await res.json();
                return { params: { id: d?.href?.query?.id } };
            })
        );

        return { paths, fallback: false };
    } catch (e) {
        console.debug("Blog Page getStaticPaths", e);
        return { paths: [], fallback: true };
    }
};

export const getStaticProps = async ({ params }) => {
    try {
        const res = await fetch(config.baseUrl + "/projects/" + params.id);
        if (!res.ok) throw new Error(res.statusText);
        const source = await res.text();
        const { content, data } = matter(source);
        const mdxSource = await renderToString(content, {
            components,
            scope: data,
        });

        return {
            revalidate: 60,
            props: {
                source: mdxSource || "",
            },
        };
    } catch (e) {
        return {
            notFound: true,
            revalidate: 5,
            props: {
                source: "",
            },
        };
    }
};

export default ProjectPage;
