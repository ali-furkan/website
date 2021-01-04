import PropTypes from "prop-types";
import { Text } from "@/components/text";
import style from "./about.module.css";

const AboutContainer = ({ title, children }) => {
    return (
        <article className={style.hero}>
            <Text h1 b className={style.title}>
                {title}
            </Text>
            <Text size={"lg"}>{children}</Text>
        </article>
    );
};

AboutContainer.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
};

export default AboutContainer;
