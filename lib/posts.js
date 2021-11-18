import client from "@/lib/supabase"
import { nanoid } from "nanoid"

const postMockData = new Array(10).fill({
    id: nanoid(),
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    subtitle: "Markdown",
    image: "https://github.com/ali-furkan/website/blob/main/public/assets/banner.png?raw=true",
    description: `
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
		sed do eiusmod tempor incididunt ut labore et dolore magna 
		aliqua.
	`.trim(),
    keywords: ["test"],
    createdAt: new Date().toJSON(),
    content: `
	# h1
	## h2
	### h3
	#### h4

	Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
	sed do eiusmod tempor incididunt ut labore et dolore magna 
	aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
	ullamco laboris nisi ut aliquip ex ea commodo consequat. 
	Duis aute irure dolor in reprehenderit in voluptate velit 
	esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
	occaecat cupidatat non proident, sunt in culpa qui officia 
	deserunt mollit anim id est laborum.

	**this is bold text**
	*This text is italicized*
	~~This was mistaken text~~

	In the words of Abraham Lincoln:

	> Pardon my French

	[this my website](https://alifurkan.co)
	![This is an image](https://myoctocat.com/assets/images/base-octocat.svg)

	- George Washington
	- John Adams
	- Thomas Jefferson

	- [x] #739
	- [ ] https://github.com/octo-org/octo-repo/issues/740
	- [ ] Add delight to the experience when all tasks are complete :tada:

	\`\`\`js
	const express = require('express')
	const app = express()
	const port = 3000
	
	app.get('/', (req, res) => {
	  res.send('Hello World!')
	})
	
	app.listen(port, () => {
	  console.log(\`Example app listening at http://localhost:\${port}\`)
	})
	\`\`\`

	`
        .split("\n")
        .map((l) => l.trim())
        .join("\n")
})

const table = process.env.NODE_ENV === "development" ? "dev-posts" : "posts"
const isShouldMock =
    process.env.NODE_ENV != "production" &&
    !(process.env.SUPABASE_URL || process.env.SUPABASE_KEY)

/**
 * @typedef {{
 * 	id: string;
 *  slug: string;
 *  title: string;
 *  subtitle: string;
 *  description: string;
 *  image: string;
 *  keywords: string[];
 *  content: string
 * }} post
 */

export const getPostSlugs = async () => {
    if (isShouldMock)
        return { data: postMockData.map((d) => ({ slug: d.slug })) }

    const { data, error } = await client.from(table).select("slug")

    return { data, error }
}

export const getPost = async (slug) => {
    if (isShouldMock) return { data: postMockData[0] }

    const { data, error } = await client.from(table).select().eq("slug", slug)

    if (error)
        return {
            error
        }

    return { data: data[0] }
}

export const getPostList = async (size = 12) => {
    if (isShouldMock) return { data: postMockData }

    const { data, error } = await client.from(table).select("id, createdAt")

    if (error)
        return {
            error
        }

    const selectedPosts = data
        .sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        )
        .reverse()
        .map((post) => post.id)
        .slice(0, size)

    const res = await client.from(table).select().in("id", selectedPosts)

    return res
}

/**
 *
 * @param {post} payload
 */
export const updatePost = async (payload) => {
    const { data, error } = await client
        .from("posts")
        .update(payload)
        .match({ id: payload.id })

    return { data, error }
}

export const deletePost = async (slug) => {
    const { data, error } = await client.from(table).delete().match({ slug })

    return { data, error }
}
