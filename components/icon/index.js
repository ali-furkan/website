import Link from "next/link";
import PropTypes from "prop-types";
import style from "./style.module.css";

/**
 * Icon Button
 * @param {{ href: string; Icon:import("react").Component; className: string; size: string; onClick?: ()=>void}} param0
 */
export function IconButton({ href, Icon, className, size, onClick, ...props }) {
    if (onClick)
        return (
            <div
                className={[style.icon, className].join(" ")}
                onClick={onClick}
            >
                <Icon fontSize={size} {...props} />
            </div>
        );

    if (href)
        return (
            <Link href={href}>
                <a
                    title={href}
                    className={[style.icon, className].join(" ")}
                    tabIndex="0"
                >
                    <Icon fontSize={size} {...props} />
                </a>
            </Link>
        );
}

IconButton.defaultProps = {
    size: "2rem",
};

IconButton.propTypes = {
    href: PropTypes.string,
    Icon: PropTypes.any,
    className: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
};
