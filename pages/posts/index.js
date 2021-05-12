import { format } from "date-fns"

import Card from "@/components/card"
import MainLayout from "@/layouts/main"
import { getPostList } from "@/lib/posts"

export async function getStaticProps() {
	const { data, error } = await getPostList()

	if (error)
		return {
			notFound: true,
			revalidate: 5 * 60
		}

	return {
		props: {
			posts: data.map((p) => ({
				...p,
				date: format(new Date(p.createdAt), "yyyy MMM dd")
			}))
		},
		revalidate: 5 * 60
	}
}

function PostListPage({ posts }) {
	return (
		<MainLayout>
			<h1>Posts</h1>
			<p>Posts are articles that I have learned or shared my experiences</p>

			{posts &&
				posts.map((post, i) => (
					<Card
						key={i}
						href={{
							pathname: "/posts/[slug]",
							query: {
								slug: post.slug
							}
						}}
						footer={
							<p>
								{post.subtitle} - {post.date}
							</p>
						}
					>
						<h2>{post.title}</h2>
						<p>{post.description.slice(0, 128)} </p>
					</Card>
				))}
		</MainLayout>
	)
}

export default PostListPage
