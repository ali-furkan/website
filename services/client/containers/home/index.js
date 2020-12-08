import PropTypes from "prop-types";
import { IconButton } from "@components/icon";
import { Tag } from "@components/tag";
import { Text } from "@components/text";
import style from "./home.module.css";
import { useTheme } from "@lib/theme";

const HomeContainer = ({ tags, links }) => {
    const [theme] = useTheme();

    return (
        <div className={style.hero}>
            <Text h4 b color={"secondary-300"}>
                Hello I&apos;m
            </Text>
            <div className={style.name_title}>
                <Text h1 b>
                    ali furkan
                </Text>
                <Text
                    h3
                    color={theme === "dark" ? "secondary-200" : "secondary-400"}
                    size={"lg"}
                >
                    full-stack developer
                </Text>
            </div>
            <div className={style.tag_list}>
                {tags.map((t, k) => (
                    <Tag key={k} className={style.tag} label={t} />
                ))}
            </div>
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
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeContainer;
