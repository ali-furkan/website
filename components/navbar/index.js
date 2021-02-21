import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useTheme } from "@/lib/theme";

import { Button } from "@/components/button";

import style from "./navbar.module.css";

const MenuIcon = dynamic(() => import("react-ionicons/lib/MdMenu"));
const CloseIcon = dynamic(() => import("react-ionicons/lib/MdClose"));
const Logo = dynamic(() => import("@/public/assets/logo.svg"));

export const Navbar = ({ links }) => {
	const [isOpen, setOpen] = React.useState(false);
	const [theme] = useTheme();
	const isDark = theme === "dark";

	const NavLinks = () => (
		<ul className={style.links}>
			{Object.entries(links).map(([key, data], i) => (
				<NavLink text={data.text || key} href={data.href || data} key={i} />
			))}
		</ul>
	);

	return (
		<>
			<nav className={style.navbar} role="navigation">
				<Link href="/">
					<a tabIndex="0" className={style.logos}>
						<Logo
							fill={isDark ? "#fff" : "#000"}
							height={48}
							width={72}
							viewBox={"36 0 108 120"}
						/>
					</a>
				</Link>

				<div className={style.navs}>
					<NavLinks />
				</div>
				<div onClick={() => setOpen(!isOpen)} className={style["mb-menu"]}>
					{isOpen ? (
						<CloseIcon fontSize="32px" color={isDark ? "#fff" : "#000"} />
					) : (
						<MenuIcon fontSize="32px" color={isDark ? "#fff" : "#000"} />
					)}
				</div>
			</nav>
			<nav
				className={style["mb-nav"]}
				style={{ display: isOpen ? "flex" : "none" }}
			>
				<div className={style["mb-navs"]}>
					<NavLinks />
					<Button text="Contact" />
				</div>
			</nav>
		</>
	);
};

export const NavLink = ({ href, text }) => {
	return (
		<li>
			<Link
				href={`${!href.startsWith("/") ? "/" : ""}${encodeURIComponent(href)}`}
			>
				<a tabIndex="0" className={style.link}>
					{text}
				</a>
			</Link>
		</li>
	);
};

Navbar.propTypes = {
	links: PropTypes.objectOf(PropTypes.any).isRequired,
};

NavLink.propTypes = {
	href: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};
