import { nanoid } from "nanoid"
import airtable from "./airtable"

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
    keywords: "test",
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

	[this my website](https://alifurkan.dev)
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

const table = "posts"
const isShouldMock =
    process.env.NODE_ENV != "production" &&
    !(process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_API_KEY)

/**
 * @typedef {{
 * 	id: string;
 *  slug: string;
 *  title: string;
 *  subtitle: string;
 *  description: string;
 *  image: string;
 *  keywords: string;
 *  content: string
 * }} post
 */

export const getPostSlugs = async () => {
    if (isShouldMock) return { data: postMockData.map((d) => d.slug) }

    try {
        const records = await airtable(table)
            .select({
                fields: ["slug"]
            })
            .all()

        const slugs = records.map((r) => r.fields.slug)

        return { data: slugs }
    } catch (error) {
        return { error }
    }
}

export const getPost = async (slug) => {
    if (isShouldMock) return { data: postMockData[0] }

    try {
        const record = await airtable(table)
            .select({
                filterByFormula: `{slug} = '${slug}'`
            })
            .all()

        return { data: record[0].fields }
    } catch (error) {
        return { error }
    }
}

export const getPostList = async (size = 12) => {
    if (isShouldMock) return { data: postMockData }

    try {
        const records = await airtable(table)
            .select({
                maxRecords: size,
                sort: [{ field: "createdAt", direction: "desc" }]
            })
            .all()

        const posts = records.map((r) => ({ id: r.id, ...r.fields }))

        return { data: posts }
    } catch (error) {
        return { error }
    }
}
