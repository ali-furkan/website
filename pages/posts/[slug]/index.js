import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
import { format } from "date-fns"
import readingTime from "reading-time"

import { getPost, getPostSlugs } from "@/lib/posts"
import PostLayout from "@/layouts/post"
import mdxPrism from "mdx-prism"


export async function getStaticPaths() {
	const { data, error } = await getPostSlugs()

	if (error)
		return {
			paths: [],
			fallback: true
		}

	const paths = data.map(({ slug }) => ({ params: { slug } }))

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps(ctx) {
	const { slug } = ctx.params

	const { data, error } = await getPost(slug)

	if (error)
		return {
			notFound: true,
			revalidate: 10 * 60
		}

	const mdxSource = await serialize(data.content, {
		mdxOptions: {
			remarkPlugins: [
				require("remark-autolink-headings"),
				require("remark-slug"),
				require("remark-emoji"),
				require("remark-code-titles")
			],
			rehypePlugins: [mdxPrism]
		}
	})

	return {
		props: {
			meta: {
				...data,
				date: format(new Date(data.createdAt), "yyyy MMM dd"),
				readingTime: readingTime(data.content).text,
				content: null
			},
			source: mdxSource
		},
		revalidate: 5 * 60
	}
}

function PostPage({ meta, source }) {
	return (
		<PostLayout {...meta}>
			<MDXRemote {...source} />
		</PostLayout>
	)
}

export default PostPage
