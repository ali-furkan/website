import style from "./style.module.css";
import PropTypes from "prop-types";

export const Container = ({ children, ...props }) => {
    return (
        <div {...props} className={style["component-container"]}>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.any.isRequired,
};
