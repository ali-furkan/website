import PropTypes from "prop-types";
import style from "./style.module.css";

export const Button = ({
    children,
    bgColor,
    textColor,
    text,
    size,
    CustomComponent,
    ...props
}) => {
    const componentProps = {
        className: [
            style.button,
            `bg-${bgColor}`,
            `text-${textColor}`,
            `text-${size}`,
        ].join(" "),
        ...props
    }
    if(CustomComponent)
        return (
            <CustomComponent {...componentProps}>
                {text??children}
            </CustomComponent>
        )
    return (
        <button
            {...componentProps}
        >
            {text ?? children}
        </button>
    ) 
}

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
    CustomComponent: PropTypes.func
};
