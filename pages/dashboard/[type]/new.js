/* eslint-disable react/prop-types */
import React from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

import { withAuth } from "@/lib/withAuth";
import { createPost } from "@/lib/api/create-post";

import { EditProvider } from "@/contexts/edit";

import MainLayout from "@/layouts/main";
import { Container } from "@/components/container";
import { EditContainer } from "@/containers/dashboard/edit";

const PostCreatePage = ({ type }) => {
    const [err, setErr] = React.useState("");
    const router = useRouter();
    const onSubmit = async (payload) => {
        const cookies = parseCookies();
        const { failed, err, pathname } = await createPost(
            cookies.token,
            payload
        );

        if (failed) {
            if (failed) {
                toast.error(err.toString(), {
                    className: "toast-error toast",
                });
                setErr(err.toString());
            }
        }

        router.push({
            pathname,
            query: {
                toast: "success",
                msg: encodeURIComponent(
                    `Successfully Created New ${type} Post`
                ),
            },
        });
    };

    return (
        <MainLayout>
            <Container>
                <EditProvider>
                    <EditContainer
                        onSubmit={onSubmit}
                        value={{ type }}
                        error={err}
                    />
                </EditProvider>
            </Container>
        </MainLayout>
    );
};

export async function getServerSideProps(ctx) {
    const { type } = ctx.params;

    if (!["blogs", "projects"].includes(type))
        return {
            notFound: true,
            props: {},
        };

    if ((await withAuth(ctx)) !== true)
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard/auth",
            },
        };

    return { props: { type } };
}

export default PostCreatePage;
