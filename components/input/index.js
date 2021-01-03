import PropTypes from "prop-types";
import style from "./input.module.css";

/**
 * Input
 * @param {import("react").ComponentProps<"input">} param0
 */
const Input = ({
    label,
    placeholder,
    value,
    onChange,
    children,
    type,
    className,
    ...props
}) => {
    return (
        <div className={[style.box, className ?? ""].join(" ")} {...props}>
            {label && (
                <label className={style.label} htmlFor={label ?? placeholder}>
                    <p>{label}</p>
                </label>
            )}
            <div className={style.wrapper}>
                <input
                    id={label}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    spellCheck="false"
                    type={type}
                />
                {children}
            </div>
        </div>
    );
};

Input.defaultProps = {
    placeholder: "Hello",
    children: null,
};

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.any,
    type: PropTypes.string,
};

export default Input;
