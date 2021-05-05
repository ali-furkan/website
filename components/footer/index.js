import Link from "next/link"
import webConfig from "@/web.config"
import {
	StyledFooterWrapper,
	StyledFooter,
	StyledTree,
	StyledLinks,
	StyledLink
} from "./footer.style"

function Footer() {
	return (
		<StyledFooterWrapper>
			<StyledFooter>
				<div>
					<p>
						<b>No Activity</b> - Now
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
