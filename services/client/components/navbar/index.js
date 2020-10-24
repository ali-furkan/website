import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@components/button";
import Config from "@config/configuration";
import style from "./style.module.css";

const MenuIcon = dynamic(() => import("react-ionicons/lib/MdMenu"));
const CloseIcon = dynamic(() => import("react-ionicons/lib/MdClose"));

export const Navbar = ({ links }) => {
    const [isOpen, setOpen] = useState(false);

    const NavLinks = () => (
        <ul className={style.links}>
            {Object.entries(links).map(([key, data], i) => (
                <NavLink
                    text={data.text || key}
                    href={data.href || data}
                    key={i}
                />
            ))}
        </ul>
    );

    return (
        <>
            <nav className={style.navbar} role="navigation">
                <Link href="/">
                    <a className={style.logos}>
                        <img
                            width="64px"
                            height="64px"
                            src="/assets/logo-white.png"
                            alt="logo"
                        />
                        <div className={style["logo-text"]}>
                            <h1>{Config.Navbar.logo.text[0]}</h1>
                            <h2>{Config.Navbar.logo.text[1]}</h2>
                        </div>
                    </a>
                </Link>

                <div className={style.navs}>
                    <NavLinks />
                    <Button text="Contact" />
                </div>
                <div
                    onClick={() => setOpen(!isOpen)}
                    className={style["mb-menu"]}
                >
                    {isOpen ? (
                        <CloseIcon fontSize="32px" color="#fff" />
                    ) : (
                        <MenuIcon fontSize="32px" color="#fff" />
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
            <Link href={encodeURIComponent(href)}>
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
