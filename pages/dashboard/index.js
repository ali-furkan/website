/* eslint-disable react/prop-types */
import { parseCookies } from "nookies";
import config from "@/config";
import { withAuth } from "@/lib/withAuth";
import MainLayout from "@/layouts/main";
import { DashboardMain } from "@/containers/dashboard/main";

const DashboardPage = ({ logs, projects, blogs }) => {
    return (
        <MainLayout>
            <DashboardMain logs={logs} projects={projects} blogs={blogs} />
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

    const getMetas = async (path) => {
        try {
            const res = await fetch(`${config.baseUrl}/${path}`, {
                headers: {
                    Authorization: `Bearer ${cookies["token"]}`,
                },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data);
            const metasRaw = await Promise.all(
                data.map(async (m) => {
                    const res = await fetch(m.url);
                    if (!res.ok) return null;
                    return await res.json();
                })
            );
            return metasRaw.filter((m) => !!m);
        } catch (e) {
            return [];
        }
    };
    const blogs = await getMetas("blogs-metas");
    const projects = await getMetas("projects-metas");
    const logs = await getMetas("logs");

    return {
        props: {
            logs,
            blogs,
            projects,
        },
    };
}

export default DashboardPage;
