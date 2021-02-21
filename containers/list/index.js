import PropTypes from "prop-types";
import { fmtDate } from "@/lib/fmt";
import { Card } from "@/components/card";
import { Text } from "@/components/text";
import { Container } from "@/components/container";
import TitleSection from "@/components/title-section";
import style from "./list.module.css";

const ListContainer = ({ title, content, children, cards }) => {
	return (
		<Container>
			<TitleSection title={title} content={content}>
				{children && <div className={style.container}>{children}</div>}
			</TitleSection>
			{(!cards || cards?.length < 1) && (
				<div className={style.error_container}>
					<Text size={"xl"}>Data Not Found</Text>
				</div>
			)}
			<div className={style.card_list}>
				{cards?.map((c, key) => (
					<Card key={key} {...c} date={fmtDate(c.createdAt)} />
				))}
			</div>
		</Container>
	);
};

ListContainer.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string,
	children: PropTypes.any,
	cards: PropTypes.arrayOf(PropTypes.object),
};

export default ListContainer;
