import PropTypes from "prop-types";

import { IconButton } from "@/components/icon";
import { Text } from "@/components/text";

import style from "./home.module.css";

const HomeContainer = ({ title, subTitle, links }) => {
	return (
		<div className={style.hero}>
			<Text size="6xl">
				Hi! I&apos;m <Text b>{title}</Text>
			</Text>
			<Text size="xl" italic>
				{subTitle}
			</Text>
			<div className={style.icon_list}>
				{links.map((i, k) => (
					<IconButton key={k} {...i} />
				))}
			</div>
		</div>
	);
};

HomeContainer.defaultProps = {
	tags: [],
	links: [],
};

HomeContainer.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	tags: PropTypes.arrayOf(PropTypes.object).isRequired,
	links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeContainer;
