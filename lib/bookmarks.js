import redis from "./redis"

export const getBookmark = async (id) => {
	const bookmark = JSON.parse(await redis.hget("bookmarks", id))

	return bookmark
}

export const getBookmarks = async (start = 0, size = 16) => {
	const bookmarks = Object.values(await redis.hgetall("bookmarks"))

	if (!bookmarks || bookmarks.length === 0) return []

	return bookmarks
		.reverse()
		.slice(start, size)
		.map((b) => JSON.parse(b))
}

export const createBookmark = async (title, url) => {
	const createdAt = Date.now()
	const payload = JSON.stringify({ title, url, createdAt, likes: 0 })

	const id = await redis.hlen("bookmarks")

	return await redis.hset("bookmarks", id, payload)
}

export const deleteBookmark = async (id) => {
	return await redis.hdel("bookmarks", id)
}

export const editBookmark = async (id, payload) => {
	const bookmark = await getBookmark(id)

	await redis.hsetnx(
		"bookmarks",
		id,
		JSON.stringify({ ...bookmark, ...payload })
	)
}
