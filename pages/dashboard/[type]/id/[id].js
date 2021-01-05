/* eslint-disable react/prop-types */
import React from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

import config from "@/config";

import { withAuth } from "@/lib/with-auth";
import { editPost } from "@/lib/api/edit-post";

import { EditProvider } from "@/contexts/edit";

import MainLayout from "@/layouts/main";
import { EditContainer } from "@/containers/dashboard/edit";
import { Container } from "@/components/container";

const DashboardPage = ({ data }) => {
    const [err, setErr] = React.useState("");
    const router = useRouter();
    const onSubmit = async (payload) => {
        const cookies = parseCookies();
        const { failed, err } = await editPost(
            cookies.token,
            payload.prevData,
            payload
        );

        if (failed) {
            toast.error(err, {
                className: "toast-error toast",
            });
            setErr(err);
        }

        router.push({
            pathname: "/dashboard",
            query: {
                toast: "success",
                msg: encodeURIComponent(
                    `Successfully Edited ${payload.title} Post`
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
                        value={data}
                        error={err}
                    />
                </EditProvider>
            </Container>
        </MainLayout>
    );
};

export async function getServerSideProps(ctx) {
    if ((await withAuth(ctx)) !== true)
        return {
            redirect: {
                permanent: false,
                destination: "/dashboard/auth",
            },
        };

    const cookies = parseCookies(ctx);
    const { type, id } = ctx.params;

    try {
        if (!type || !id) throw new Error("Type or id param Not Found");
        if (!["blogs", "projects"].includes(type))
            throw new Error("Type param invalid");
        const res = await fetch(
            `${config.baseUrl}/${type}-metas/${encodeURIComponent(id)}`,
            {
                headers: {
                    Authorization: cookies.token,
                },
            }
        );

        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();

        const resCnt = await fetch(
            `${config.baseUrl}/${type}/${encodeURIComponent(id)}`,
            {
                headers: {
                    Authorization: cookies.token,
                },
            }
        );

        const dataCnt = await resCnt.text();

        return {
            props: {
                data: Object.assign({}, data, {
                    tags: data?.tags?.map((t) => t.text).join(", ") + ", ",
                    content: dataCnt
                        .match(
                            /(?<=(<MdxPageText>))(.|\n)+?(?=(<\/MdxPageText>))/g
                        )
                        .join("\n")
                        .trim(),
                    type,
                }),
            },
        };
    } catch (e) {
        console.log(e);
        return {
            notFound: false,
            props: {},
        };
    }
}

export default DashboardPage;
