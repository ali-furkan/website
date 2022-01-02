import React from "react"
import Link from "next/link"
import { useLanyard } from "react-use-lanyard"
import { getActivity, calcDuration } from "@/lib/activity"
import webConfig from "@/web.config"
import {
    StyledFooterWrapper,
    StyledFooter,
    StyledTree,
    StyledLinks,
    StyledLink
} from "./footer.style"

function Footer() {
    const [duration, setDuration] = React.useState("loading")
    const { loading, status } = useLanyard({
        userId: webConfig.discordID,
        socket: true
    })

    const activity = React.useMemo(
        () => getActivity(loading, status),
        [loading, status]
    )

    React.useEffect(() => {
        const interval = setInterval(
            () => setDuration(calcDuration(activity.start)),
            1000 / 15
        )

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
