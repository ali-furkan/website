import PropTypes from "prop-types";
import { Text } from "@components/text";
import style from "./section.module.css";

const TitleSection = ({ children, title, content }) => {
    return (
        <div className={style.container}>
            <Text h1 black>
                {title}
            </Text>
            <Text h3>{content} </Text>
            <div className={style.children}>
                {children}
            </div>
        </div>
    );
};

TitleSection.defaultProps = {
    children: null,
};

TitleSection.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default TitleSection;
