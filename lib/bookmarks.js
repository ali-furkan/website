import redis from "./redis"

const data = new Array(10).fill({
	title: "Lorem Ipsum",
	url: "https://alifurkan.co",
	createdAt: Date.now(),
	likes: 13
})

const isShouldMock =
	process.env.NODE_ENV != "production" && !process.env.REDIS_URL

export const getBookmark = async (id) => {
	if (isShouldMock) return data[0]

	const bookmark = JSON.parse(await redis.hget("bookmarks", id))

	return bookmark
}

export const getBookmarks = async (start = 0, size = 32) => {
	if (isShouldMock) return data.slice(start, size)

	const bookmarks = Object.entries(await redis.hgetall("bookmarks"))

	if (!bookmarks || bookmarks.length === 0) return []

	return bookmarks
		.sort((a, b) => b[0] - a[0])
		.slice(start, size)
		.map((b) => JSON.parse(b[1]))
}

export const createBookmark = async (title, url) => {
	if (isShouldMock) return true

	const createdAt = Date.now()
	const payload = JSON.stringify({ title, url, createdAt, likes: 0 })

	const id = await redis.hlen("bookmarks")

	return await redis.hset("bookmarks", id, payload)
}

export const deleteBookmark = async (id) => {
	if (isShouldMock) return true

	return await redis.hdel("bookmarks", id)
}

export const editBookmark = async (id, payload) => {
	if (isShouldMock) return true

	const bookmark = await getBookmark(id)

	return await redis.hsetnx(
		"bookmarks",
		id,
		JSON.stringify({ ...bookmark, ...payload })
	)
}
