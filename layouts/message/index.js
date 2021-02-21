import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import config from "web.config";
import style from "./layout.module.css";

/**
 * Message Layout
 * @param {{
 *  title:string;
 *  description:string;
 *  Description: ()=>JSX.Element;
 *  options: { navbar:boolean,links:{[props:string]:any}
 * } }} param0
 */
const MessageLayout = ({ title, description, children, options }) => {
	options =
		typeof options === "object"
			? Object.assign({}, DEF_CONFIG, options)
			: DEF_CONFIG;
	const LazyNavbar = () => {
		const Navbar = dynamic(() =>
			import("@/components/navbar").then(({ Navbar }) => Navbar),
		);
		return (
			<header className={style.header}>
				<Navbar links={options.links} />
			</header>
		);
	};
	return (
		<div id={style.app}>
			{options.navbar ? <LazyNavbar /> : null}
			<main className={style.main}>
				<div className={style.wrapper}>
					{title && <h1 className={style.title}>{title}</h1>}
					{children ?? <p>{description}</p>}
				</div>
			</main>
		</div>
	);
};

const DEF_CONFIG = {
	navbar: true,
	links: config.navbar.links,
};

MessageLayout.defaultProps = {
	options: DEF_CONFIG,
};

MessageLayout.propTypes = {
	title: PropTypes.string,
	description: PropTypes.any,
	options: PropTypes.object,
	children: PropTypes.arrayOf(PropTypes.func),
};

export default MessageLayout;
