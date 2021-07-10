import "twin.macro"
import Link from "next/link"
import humanizeDuration from "humanize-duration"

import Card from "@/components/card"
import MainLayout from "@/layouts/main"
import { dateBasedCommits, totalCommits } from "@/lib/commits"

export async function getStaticProps() {
	const { error, data: commits } = await totalCommits()

	if (error)
		return {
			props: {},
			revalidate: 5 * 60,
			notFound: true
		}

	const dateCommits = dateBasedCommits(commits)

	return {
		props: {
			lastCommit: humanizeDuration(
				Date.now() - new Date(commits[0].commit.committer.date).getTime(),
				{ round: true, largest: 1 }
			),
			totalCommits: commits.length,
			commits: dateCommits
		},
		revalidate: 10 * 60
	}
}

function Changelog({ lastCommit, totalCommits, commits }) {
	return (
		<MainLayout>
			<h1>Changelog</h1>
			<p>
				The changelog below displays the thirty most recent commits for the{" "}
				<code>main</code>
				branch of this website. Click{" "}
				<Link href={"/github/website"}>
					<a tabIndex="0">here</a>
				</Link>
				if you want to learn more information about this website
			</p>

			<div tw={"flex justify-between sm:flex-row flex-col"}>
				<Card>
					<div tw={"text-center"}>
						<h2>{lastCommit} ago </h2>
						<p>Last Commit</p>
					</div>
				</Card>
				<Card>
					<div tw={"text-center"}>
						<h2>
							{
								commits.filter(
									(day) =>
										new Date() - new Date(day.date) < 7 * 24 * 3600 * 1000
								).length
							}
						</h2>
						<p>Weekly Commits</p>
					</div>
				</Card>
				<Card>
					<div tw={"text-center"}>
						<h2 tw={"text-center"}>{totalCommits}</h2>
						<p>Total Commits</p>
					</div>
				</Card>
			</div>

			<section>
				<h2>Commit History</h2>
				{commits.map((day) => (
					<div key={day.id}>
						<em>{day.date}</em>
						<ul>
							{day.commits.map((commit) => (
								<li key={commit.id}>
									<Link href={commit.url}>
										<a tabIndex="0" target="_blank" rel="noopener noreferrer">
											{commit.message}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</MainLayout>
	)
}

export default Changelog
