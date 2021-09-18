import { nanoid } from "nanoid"
import { format as dateFormat } from "date-fns"

const commitsMockData = new Array(10).fill({
	node_id: nanoid(),
	commit: {
		message: "fix: add env gh token",
		html_url: "https://google.com",
		committer: {
			name: "Ali Furkan",
			email: "me@alifurkan.co",
			date: new Date().toDateString()
		}
	}
})

const isShouldMock =
	process.env.NODE_ENV != "production" && !process.env.GITHUB_USERNAME_AND_TOKEN

export const totalCommits = async () => {
	if (isShouldMock) return { data: commitsMockData }

	const username = process.env.GITHUB_USERNAME_AND_TOKEN.split(":")[0]

	let stillHave = true
	let commits = []

	for (let i = 1; stillHave; i++) {
		const res = await fetch(
			`https://api.github.com/repos/${username}/website/commits?per_page=100&page=${i}`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(
						process.env.GITHUB_USERNAME_AND_TOKEN
					).toString("base64")}`,
					Accept: "application/vnd.github.v3+json"
				}
			}
		)

		if (!res.ok) return { error: true }

		const data = await res.json()

		commits = [...commits, ...data]

		stillHave =
			data.length === 100 && data[data.length - 1].parents.length !== 0
	}

	return { data: commits }
}

export const dateBasedCommits = (commits) => {
	const dateCommits = []
	const commitSize = commits.length < 25 ? commits.length : 25

	for (let i = 0, g = 0, lastDate = ""; i < commitSize; i++) {
		const commitDate = dateFormat(
			new Date(commits[i].commit.committer.date),
			"yyyy MMM dd"
		)
		const commitPayload = {
			id: commits[i].node_id,
			message: commits[i].commit.message,
			url: commits[i].html_url
		}

		if (lastDate === commitDate) {
			dateCommits[g].commits.push(commitPayload)
		} else {
			lastDate = commitDate
			g = g++
			dateCommits.push({
				id: nanoid(),
				date: lastDate,
				commits: [commitPayload]
			})
		}
	}

	return dateCommits
}
