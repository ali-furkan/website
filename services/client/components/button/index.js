import PropTypes from "prop-types";
import style from "./style.module.css";

export const Button = ({
    children,
    bgColor,
    textColor,
    text,
    size,
    ...props
}) => (
    <button
        className={[
            style.button,
            `bg-${bgColor}`,
            `text-${textColor}`,
            `text-${size}`,
        ].join(" ")}
        {...props}
    >
        {text ?? children}
    </button>
);

Button.defaultProps = {
    bgColor: "secondary-400",
    textColor: "white",
    size: "base",
};

Button.propTypes = {
    children: PropTypes.any,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string,
};
