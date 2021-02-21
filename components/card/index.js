import PropTypes from "prop-types";
import Link from "next/link";
import { Text } from "@/components/text";
import { Skeleton } from "@/components/skeleton";
import style from "./card.module.css";
import styleRow from "./card-row.module.css";

export const CardFooter = ({ children }) => (
	<footer className="border-t-2 border-primary-200 p-5">{children}</footer>
);

CardFooter.propTypes = {
	children: PropTypes.any,
};

const propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.object),
	date: PropTypes.string,
	footer: PropTypes.any,
};

const DefaultCard = ({ title, image, tags, date, footer }) => {
	return (
		<article className={style.container}>
			{!image && <Skeleton type="image" size={"xl"} />}
			{image && (
				<div className={style.img_wrapper}>
					<img alt={`img-${title.toLowerCase()}`} src={image} width="256px" />
				</div>
			)}
			<div className={style.info}>
				<div className={style.tag_grid}>
					{tags &&
						tags.map((t, i) => (
							<Text key={i} {...t} b>
								{t?.text}
							</Text>
						))}
				</div>
				<Text className={style.title} h3 b>
					{title}
				</Text>
				<Text color={"primary-100"} size={"sm"} b>
					{date}
				</Text>
			</div>
			{footer && <CardFooter>{footer}</CardFooter>}
		</article>
	);
};

DefaultCard.propTypes = propTypes;

export const RowCard = ({ image, title, tags, date, footer }) => {
	return (
		<article className={styleRow.container}>
			{!image && <Skeleton type="image" size={"xl"} />}
			{image && (
				<div className={styleRow.img_wrapper}>
					<img
						alt={`img-${title.toLowerCase()}`}
						src={image}
						className="max-h-24 max-w-24"
					/>
				</div>
			)}
			<div className="flex flex-col mx-4">
				<Text h3 b>
					{title}
				</Text>
				<Text color={"primary-100"} size={"sm"} b>
					{date}
				</Text>
				<div className={style.tag_grid}>
					{tags &&
						tags.map((t, i) => (
							<Text key={i} {...t} p b>
								{t?.text}
							</Text>
						))}
				</div>
			</div>
			{footer && <CardFooter>{footer}</CardFooter>}
		</article>
	);
};

RowCard.propTypes = propTypes;

/**
 * Card Component
 * @param {{ theme: "default"|"row"; href: string; image: string; title: string; tags: string; date:string}} param0
 */
export const Card = ({ theme, href, ...props }) => {
	const Component = (props) => {
		if (theme === "default") return <DefaultCard {...props} />;
		if (theme === "row") return <RowCard {...props} />;
	};

	if (href)
		return (
			<Link href={href}>
				<a tabIndex="0">
					<Component {...props} />
				</a>
			</Link>
		);
	return <Component {...props} />;
};

Card.defaultProps = {
	theme: "default",
};

Card.propTypes = {
	href: PropTypes.any,
	theme: PropTypes.string,
};
