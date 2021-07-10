import mdxPrism from "mdx-prism"
import readingTime from "reading-time"
import { format } from "date-fns"

export const parseMdxMeta = (data) => {
	const date = format(new Date(data.createdAt), "yyyy MMM dd")
	const rTime = readingTime(data.content).text

	return {
		...data,
		date,
		readingTime: rTime,
		content: null
	}
}

export const mdxSerializeOpts = {
	mdxOptions: {
		remarkPlugins: [
			require("remark-autolink-headings"),
			require("remark-slug"),
			require("remark-emoji"),
			require("remark-code-titles")
		],
		rehypePlugins: [mdxPrism]
	}
}
