import styles from "./style.module.css";
import PropTypes from "prop-types";

export const Tag = ({ label, bgColor, textColor }) => {
    return (
        <h2
            className={[styles.tag, `bg-${bgColor}`, `text-${textColor}`].join(
                " "
            )}
        >
            {label}
        </h2>
    );
};

Tag.defaultProps = {
    label: "Lorem Ipsum",
    bgColor: "secondary-400",
    textColor: "secondary-200",
};

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
};
