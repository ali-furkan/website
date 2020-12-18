/* eslint-disable react/prop-types */
import React from "react";
import { useRouter } from "next/router";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { api } from "@config/api ";
import MainLayout from "@layouts/main";
import { MdxPageHead } from "@components/mdx-header";
import { Text } from "@components/text";
import { Container } from "@components/container";

const ProjectPage = ({ source }) => {
    const router = useRouter();
    React.useEffect(() => {
        if (!source) return router.push("/projects");
    });
    if (!source) return <h1>Page not found</h1>;
    const content = hydrate(source, { MdxPageHead, Text });

    return <Container>{content}</Container>;
};

export const getStaticPaths = async () => {
    try {
        const res = await fetch(api.baseUrl + "/project-metas", {
            headers: {
                Authorization: process.env.STORAGE_TOKEN,
            },
        });

        if (!res.ok) throw new Error(res.statusText);

        const blogs = await res.json();

        const paths = blogs.map((b) => ({
            params: { id: b.href.query.id },
        }));

        return { paths, fallback: true };
    } catch (e) {
        console.log("Project Page", e);
        return { paths: [], fallback: true };
    }
};

export const getStaticProps = async ({ params }) => {
    try {
        const res = await fetch(
            api.baseUrl + "/projects/" + params.id
        );
        if (!res.ok) throw new Error(res.statusText);
        const source = await res.text();
        const mdxSource = await renderToString(source, {
            components: { MdxPageHead, Text },
        });

        return {
            revalidate: 30,
            props: {
                source: mdxSource || "",
            },
        };
    } catch (e) {
        return {
            revalidate: 30,
            redirect: {
                destination: "/",
                permanent: false,
            },
            props: {
                source: "",
            },
        };
    }
};

export default MainLayout(ProjectPage);
