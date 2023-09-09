import humanizeDuration from "humanize-duration"
import { getBookmarks } from "@/lib/bookmarks"
import MainLayout from "@/layouts/main"
import Card from "@/components/card"

export async function getStaticProps() {
    const bookmarks = (await getBookmarks())
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

function Bookmarks({ bookmarks }) {
    return (
        <MainLayout>
            <h1>Bookmarks</h1>
            <p>I plunge in several articles or websites during the day and, I need to find them again sometimes. That's why I list here articles and webpages that seem interesting to me.</p>

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
de
