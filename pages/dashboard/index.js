/* eslint-disable react/prop-types */
import MainLayout from "@layouts/main";
import { withAuth } from "@lib/withAuth";
import { DashboardMain } from "containers/dashboard/main";
import { parseCookies } from "nookies";
import { StorageDomain } from "web.config";

const DashboardPage = ({ logs, projects, blogs }) => {
    return <DashboardMain logs={logs} projects={projects} blogs={blogs} />;
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
            const res = await fetch(`https://${StorageDomain}/${path}`, {
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

export default MainLayout(DashboardPage);
