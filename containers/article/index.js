import PropTypes from "prop-types";
import styles from "./article.module.css";

function Article({ children }) {
	return <div className={styles.main}>{children}</div>;
}

Article.propTypes = {
	children: PropTypes.any.isRequired,
};

export default Article;
