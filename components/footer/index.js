import React from "react"
import Link from "next/link"
import humanizeDuration from "humanize-duration"
import { useLanyard } from "react-use-lanyard"
import { getActivity } from "@/lib/activity"
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
    const { loading, status } = useLanyard({
        userId: webConfig.discordID,
        socket: true
    })

    const activity = React.useMemo(
        () => getActivity(loading, status),
        [loading, status]
    )

    React.useEffect(() => {
        if (!activity.start) {
            setDuration("now")
            return
        }

        const calcDuration = () => {
            const durationContent = humanizeDuration(
                activity.start - Date.now(),
                {
                    round: true,
                    largest: 1
                }
            )

            if (durationContent == duration) return

            setDuration(durationContent)
        }
        const interval = setInterval(calcDuration, 1000 / 15)

        return () => clearInterval(interval)
    }, [activity])

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
                                    <StyledLink tabIndex="0">
                                        {link.text}
                                    </StyledLink>
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
