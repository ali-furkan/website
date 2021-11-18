import airtable from "./airtable"

const data = new Array(10).fill({
    title: "Lorem Ipsum",
    url: "https://alifurkan.co",
    createdAt: Date.now(),
    likes: 13
})

const isShouldMock =
    (process.env.NODE_ENV != "production" && !process.env.AIRTABLE_API_KEY) ||
    !process.env.AIRTABLE_BASE_ID

export const getBookmark = async (id) => {
    if (isShouldMock) return data[0]

    const record = await airtable("bookmarks").find(id)

    return record.fields
}

export const getBookmarks = async (start = 0, size = 32) => {
    if (isShouldMock) return data.slice(start, size)

    const records = await airtable("bookmarks")
        .select({
            maxRecords: start + size,
            sort: [{ field: "time", direction: "desc" }]
        })
        .all()

    const bookmarks = records.map((r) => r.fields)

    return bookmarks.slice(start, size)
}
