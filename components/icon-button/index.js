import Link from "next/link"
import { StyledIconButton, StyledIconButtonA } from "./icon-button.style"

/**
 * Icon Button
 * @param {{
 *  href: string;
 *	Icon:import("react").Component;
 * 	size: string;
 * 	onClick?: ()=>void
 * }} props
 */
function IconButton({ href, Icon, size, onClick, ...props }) {
	if (onClick)
		return (
			<StyledIconButton onClick={onClick}>
				<Icon fontSize={size} {...props} />
			</StyledIconButton>
		)

	if (href)
		return (
			<Link href={href} passHref>
				<StyledIconButtonA
					title={href}
					tabIndex="0"
					target="_blank"
					rel="nooppener noreferrer"
				>
					<Icon fontSize={size} {...props} />
				</StyledIconButtonA>
			</Link>
		)
}

export default IconButton
