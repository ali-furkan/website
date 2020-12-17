import PropTypes from "prop-types";
import style from "./row.module.css"

export const Row = ({
    children,
    justify,
    aligntItems,
    alignContent,
    direction,
}) => {

    const classNames = [
        justify?style[`j-${justify}`]:undefined,
        aligntItems?style[`i-${aligntItems}`]:undefined,
        alignContent?style[`c-${alignContent}`]:undefined,
        direction?style[direction]:undefined
    ].filter(p=>p)

    return (
        <div className={classNames.join(" ")}>
            {children}
        </div>
    )
}

Row.defaultProps = {
    justify: "flex-start",
    aligntItems: "stretch",
    alignContent: "flex-start",
    direction: "flex-start"
}

Row.propTypes = {
    children: PropTypes.any,
    justify: PropTypes.string,
    aligntItems: PropTypes.string,
    alignContent: PropTypes.string,
    direction: PropTypes.string,
}