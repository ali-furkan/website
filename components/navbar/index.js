import dynamic from "next/dynamic"
import Link from "next/link"
import { useTheme } from "next-themes"

import webConfig from "@/web.config"
import ThemeToggle from "@/components/theme-toggle"

import {
    StyledHeader,
    StyledNavbar,
    StyledNavbarLink,
    StyledNavbarLinks
} from "./navbar.style"

const Logo = dynamic(() => import("@/public/assets/logo.svg"), { ssr: false })

function NavLink({ href, text }) {
    return (
        <Link href={href} passHref>
            <StyledNavbarLink tabIndex="0"> {text} </StyledNavbarLink>
        </Link>
    )
}

function Navbar() {
    const { resolvedTheme } = useTheme()

    return (
        <StyledHeader>
            <StyledNavbar role="navigation">
                <Link href="/">
                    <a tabIndex="0" aria-label="logo">
                        <Logo
                            fill={resolvedTheme == "dark" ? "#fff" : "#000"}
                            height={48}
                            width={72}
                            viewBox={"36 0 108 120"}
                        />
                    </a>
                </Link>
                <StyledNavbarLinks>
                    {webConfig.navbar.links.map((l, i) => (
                        <NavLink key={i} href={l.href} text={l.text} />
                    ))}
                    <ThemeToggle />
                </StyledNavbarLinks>
            </StyledNavbar>
        </StyledHeader>
    )
}

export default Navbar
