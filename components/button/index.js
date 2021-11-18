import Link from "next/link"
import { StyledButton } from "./button.style"

function Button({ children, href, ...props }) {
    if (href)
        return (
            <Link href={href}>
                <StyledButton tabIndex="0" {...props}>
                    {children}
                </StyledButton>
            </Link>
        )
    return (
        <StyledButton role="button" tabIndex="0" {...props}>
            {children}
        </StyledButton>
    )
}

export default Button
