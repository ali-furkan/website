import Link from "next/link";
import PropTypes from "prop-types"
import style from "./style.module.css"

export function IconButton({href, Icon,className, size,...props}) {
    return (
        <Link href={href}>
            <a title={href} className={[style.icon,className].join(" ")} tabIndex="0">
                <Icon fontSize={size} {...props} />
            </a>
        </Link>
    )
}

IconButton.defaultProps = {
    size: "2rem"
}

IconButton.propTypes = {
    href: PropTypes.string,
    Icon: PropTypes.any,
    className: PropTypes.string,
    size: PropTypes.string
}