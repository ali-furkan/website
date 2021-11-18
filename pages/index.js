import "twin.macro"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import humanizeDuration from "humanize-duration"

import { pages, sociallinks } from "@/web.config"
import { getBookmarks } from "@/lib/bookmarks"
import MainLayout from "@/layouts/main"
import Card from "@/components/card"
import Button from "@/components/button"
import IconButton from "@/components/icon-button"

const TwIco = dynamic(() => import("react-ionicons/lib/LogoTwitter"), {
    ssr: false
})
const DcIco = dynamic(() => import("react-ionicons/lib/LogoDiscord"), {
    ssr: false
})
const GhIco = dynamic(() => import("react-ionicons/lib/LogoGithub"), {
    ssr: false
})

export async function getStaticProps() {
    const bookmarks = (await getBookmarks(0, 3))
        .filter((b) => b.is_public)
        .map((b) => ({
            ...b,
            hostname: new URL(b.url).hostname,
            duration: humanizeDuration(Date.now() - b.time * 1000, {
                round: true,
                largest: 1
            })
        }))

    return {
        props: {
            bookmarks
        },
        revalidate: 5 * 60
    }
}

function Home({ bookmarks }) {
    const { resolvedTheme } = useTheme()

    const color = resolvedTheme === "dark" ? "#ddd" : "#444"

    function formatWorks() {
        return pages.home.works.map((work, i) => (
            <Card key={i} image={work.image} href={work.href}>
                <h2>{work.title}</h2>
                <p>{work.description}</p>
            </Card>
        ))
    }

    function formatBookmarks() {
        return bookmarks.map((bookmark, i) => (
            <Card
                key={i}
                href={bookmark.url}
                footer={
                    <p>
                        {bookmark.hostname} - {bookmark.duration} ago{" "}
                    </p>
                }
            >
                <h2>{bookmark.title} </h2>
            </Card>
        ))
    }

    return (
        <MainLayout>
            <section tw={"flex flex-col py-4"}>
                <h1 id="about">
                    👋 Hey! I'm <b>Ali Furkan</b>
                </h1>
                <p>{pages.home.shortAbout}</p>
                <div tw={"flex"}>
                    <Button href={"/about"}>Read more</Button>
                    <div tw={"flex mx-4 items-center"}>
                        <IconButton
                            Icon={GhIco}
                            href={sociallinks.github}
                            size={"24px"}
                            color={color}
                        />
                        <IconButton
                            Icon={TwIco}
                            href={sociallinks.twitter}
                            size={"24px"}
                            color={color}
                        />
                        <IconButton
                            Icon={DcIco}
                            href={sociallinks.discord}
                            size={"24px"}
                            color={color}
                        />
                    </div>
                </div>
            </section>
            <section>
                <h2>Works</h2>
                {formatWorks()}
            </section>
            <section>
                <h2>Bookmarks</h2>
                {bookmarks?.length > 0 && formatBookmarks()}
            </section>
        </MainLayout>
    )
}

export default Home
