import React from "react"
import Link from "next/link"
import humanizeDuration from "humanize-duration"
import { useLanyard } from "react-use-lanyard"
import webConfig from "@/web.config"
import {
	StyledFooterWrapper,
	StyledFooter,
	StyledTree,
	StyledLinks,
	StyledLink
} from "./footer.style"

function Footer() {
	const [duration, setDuration] = React.useState("now")
	const [activity, setActivity] = React.useState({
		type: "",
		name: "",
		start: Date.now()
	})

	const { loading, status } = useLanyard({
		userId: webConfig.discordID,
		socket: true
	})

	React.useEffect(() => {
		const calcDuration = () => {
			const durationContent = humanizeDuration(activity.start - Date.now(), {
				round: true,
				largest: 1,
			})

			setDuration(durationContent)
		}
		const interval = setInterval(calcDuration, 1000 / 15)

		return () => clearInterval(interval)
	}, [activity])

	React.useEffect(() => {
		const getActivityType = () => {
			if (["Visual Studio Code", "Vim"].includes(status.activities[0].name))
				return "Coding"
			if (status.listening_to_spotify) return "Listening"

			return "Playing"
		}

		const loadActivity = () => {
			if (loading)
				return setActivity({ type: "", name: "Loading...", start: Date.now() })

			if (status.discord_status == "offline")
				return setActivity({ type: "Offline", name: "", start: Date.now() })

			if (status.activities.length > 0) {
				const type = getActivityType()

				return setActivity({
					type,
					name: status.activities[0].name,
					start: status.activities[0].timestamps.start
				})
			}

			setActivity({
				type: "No Activity",
				name: "",
				start: Date.now()
			})
		}

		loadActivity()
	}, [loading, status])

	return (
		<StyledFooterWrapper>
			<StyledFooter>
				<div>
					<p>
						{activity.type} {activity.name} - {duration}
					</p>
				</div>
				<StyledTree>
					{webConfig.footer.tree.map((list, i) => (
						<StyledLinks key={i}>
							{list.map((link, idx) => (
								<Link key={idx} href={link.href} passHref>
									<StyledLink tabIndex="0">{link.text}</StyledLink>
								</Link>
							))}
						</StyledLinks>
					))}
				</StyledTree>
			</StyledFooter>
		</StyledFooterWrapper>
	)
}

export default Footer
