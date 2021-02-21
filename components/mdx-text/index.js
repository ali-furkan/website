import PropTypes from "prop-types";
import style from "./mdx-text.module.css";

export const MdxPageText = ({ children }) => {
	return <div className={style.container}>{children}</div>;
};

MdxPageText.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};
