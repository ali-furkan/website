import PropTypes from "prop-types";
import TitleSection from "@components/title-section";
import { Container } from "@components/container";
import { Card } from "@components/card";
import { Text } from "@components/text";
import style from "./list.module.css";

const ListPage = ({ title, content, children, cards }) => {
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
                    <Card key={key} {...c} />
                ))}
            </div>
        </Container>
    );
};

ListPage.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.any,
    cards: PropTypes.arrayOf(PropTypes.object),
};

export default ListPage;
