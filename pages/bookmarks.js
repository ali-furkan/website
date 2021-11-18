import humanizeDuration from "humanize-duration"
import { getBookmarks } from "@/lib/bookmarks"
import MainLayout from "@/layouts/main"
import Card from "@/components/card"

export async function getStaticProps() {
    const bookmarks = (await getBookmarks()).map((b) => ({
        ...b,
        hostname: new URL(b.url).hostname,
        duration: humanizeDuration(Date.now() - b.createdAt, {
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

function Bookmarks({ bookmarks }) {
    return (
        <MainLayout>
            <h1>Bookmarks</h1>
            <p>Bookmarks that I have marked, liked and others may like</p>

            {bookmarks?.length > 0 &&
                bookmarks.map((bookmark, i) => (
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
                ))}
        </MainLayout>
    )
}

export default Bookmarks
