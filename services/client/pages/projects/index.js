/* eslint-disable react/prop-types */
import MainLayout from "@layouts/main";
import ListPage from "containers/list";

const ProjectPage = ({ projects }) => {
    return (
        <ListPage
            title={"Projects"}
            content={"My projects and experiences"}
            cards={projects}
        />
    );
};

export async function getStaticProps() {
    try {
        const res = await fetch(
            process.env.STORAGE_BASE_URL + "/projects-metas?size=6",
            {
                headers: {
                    Authorization: process.env.STORAGE_TOKEN,
                },
            }
        );
        if (!res.ok) throw new Error(res.statusText);
        const list = await res.json();
        const projects = await Promise.all(
            list.map(async (b) => {
                try {
                    const bRes = await fetch(b.url);
                    if (!bRes.ok) throw new Error(res.statusText);
                    const data = await bRes.json();
                    return data;
                } catch (e) {
                    return undefined;
                }
            })
        );

        return {
            revalidate: 30,
            props: {
                projects: projects.filter((p) => !!p),
            },
        };
    } catch (e) {
        console.log("Projects", e);
        return {
            revalidate: 30,
            props: {
                projects: []
            }
        };
    }
}

export default MainLayout(ProjectPage);
