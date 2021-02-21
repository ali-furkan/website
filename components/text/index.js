import PropTypes from "prop-types";
import style from "./text.module.css";

/**
 *
 * @param {{
 * children: any;
 * Component?: import("react").JSXElementConstructor;
 * color?: string;
 * size?: "xs"|"sm"|"base"|"lg"|"xl"|"2xl"|"4xl"|"6xl";
 * p?: boolean;
 * italic?: boolean;
 * b?: boolean;
 * black?: boolean;
 * h1?: boolean;
 * h2?: boolean;
 * h3?: boolean;
 * h4?: boolean;
 * }&import("react").ComponentProps<"p"|"h1">} props
 */
export const Text = ({
	children,
	Component,
	color,
	size,
	p,
	italic,
	b,
	black,
	h1,
	h2,
	h3,
	h4,
	className,
	...props
}) => {
	const classNames = [
		b ? style.bold : undefined,
		black ? style.black : undefined,
		color ? `text-${color}` : undefined,
		size ? style[`size-${size}`] : undefined,
		italic ? style["text-italic"] : undefined,
		className,
	].filter((p) => p);

	if (Component) return <Component {...props}>{children}</Component>;

	if (h1)
		return (
			<h1 className={[style.h1, ...classNames].join(" ")} {...props}>
				{children}
			</h1>
		);
	if (h2)
		return (
			<h2 className={[style.h2, ...classNames].join(" ")} {...props}>
				{children}
			</h2>
		);
	if (h3)
		return (
			<h3 className={[style.h3, ...classNames].join(" ")} {...props}>
				{children}
			</h3>
		);
	if (h4)
		return (
			<h4 className={[style.h4, ...classNames].join(" ")} {...props}>
				{children}
			</h4>
		);

	if (p)
		return (
			<p className={classNames.join(" ")} {...props}>
				{children}
			</p>
		);

	if (b)
		return (
			<b className={classNames.join(" ")} {...props}>
				{children}
			</b>
		);

	return (
		<p className={classNames.join(" ")} {...props}>
			{children}
		</p>
	);
};

Text.defaultProps = {
	text: true,
};

Text.propTypes = {
	children: PropTypes.any.isRequired,
	Component: PropTypes.any,
	color: PropTypes.string,
	size: PropTypes.string,
	italic: PropTypes.bool,
	b: PropTypes.bool,
	black: PropTypes.bool,
	p: PropTypes.bool,
	h1: PropTypes.bool,
	h2: PropTypes.bool,
	h3: PropTypes.bool,
	h4: PropTypes.bool,
	className: PropTypes.string,
};
