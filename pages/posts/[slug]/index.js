import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

import { mdxSerializeOpts, parseMdxMeta } from "@/lib/mdx"
import { getPost, getPostSlugs } from "@/lib/posts"
import PostLayout from "@/layouts/post"

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

	const mdxSource = await serialize(data.content, mdxSerializeOpts)

	return {
		props: {
			meta: parseMdxMeta(data),
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
