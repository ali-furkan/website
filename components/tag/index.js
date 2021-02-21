import PropTypes from "prop-types";
import styles from "./style.module.css";

export const Tag = ({ label, bgColor, textColor, className, ...props }) => {
	return (
		<h2
			className={[
				styles.tag,
				`bg-${bgColor}`,
				`text-${textColor}`,
				className,
			].join(" ")}
			{...props}
		>
			{label}
		</h2>
	);
};

Tag.defaultProps = {
	label: "Lorem Ipsum",
	bgColor: "secondary-400",
	textColor: "secondary-200",
	className: "",
};

Tag.propTypes = {
	label: PropTypes.string.isRequired,
	bgColor: PropTypes.string,
	textColor: PropTypes.string,
	className: PropTypes.string,
};
