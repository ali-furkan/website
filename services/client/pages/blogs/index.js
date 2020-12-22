/* eslint-disable react/prop-types */
// import { Button } from "@components/button";
// import Input from "@components/input";
import MainLayout from "@layouts/main";
import ListPage from "containers/list";

const ProjectPage = ({ blogs }) => {
    return (
        <ListPage
            title={"Blogs"}
            content={
                "Subscribe to get the new my learning, experiences, interesting articles."
            }
            cards={blogs}
        >
            {/* <Input placeholder="joe@email.com">
                <Button>Subscribe</Button>
            </Input> */}
        </ListPage>
    );
};

export async function getStaticProps() {
    try {
        const res = await fetch(process.env.STORAGE_BASE_URL + "/blogs-metas?size=6", {
            headers: {
                Authorization: process.env.STORAGE_TOKEN,
            },
        });
        if (!res.ok) throw new Error(res.statusText);
        const list = await res.json();
        const blogs = await Promise.all(
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

        console.log(
            "BLOGS",
            blogs.filter((p) => !!p)
        );

        return {
            props: {
                blogs: blogs.filter((p) => p),
            },
        };
    } catch (e) {
        console.log("Blogs", e);
        return {
            revalidate: 30,
            props: {
                projects: [],
            },
        };
    }
}

export default MainLayout(ProjectPage);
