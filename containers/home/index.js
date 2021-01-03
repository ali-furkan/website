import PropTypes from "prop-types";
import { IconButton } from "@components/icon";
import { Tag } from "@components/tag";
import { Text } from "@components/text";
import style from "./home.module.css";
import { useTheme } from "@lib/theme";

const HomeContainer = ({ title, subTitle, tags, links }) => {
    const [theme] = useTheme();

    return (
        <div className={style.hero}>
            <Text h4 b color={"secondary-300"}>
                Hello I&apos;m
            </Text>
            <div className={style.name_title}>
                <Text h1 b>
                    {title}
                </Text>
                <Text
                    h3
                    color={theme === "dark" ? "secondary-200" : "secondary-400"}
                    size={"lg"}
                >
                    {subTitle}
                </Text>
            </div>
            <div className={style.tag_list}>
                {tags.map((t, k) => (
                    <Tag
                        key={k}
                        className={style.tag}
                        label={t.label}
                        bgColor={t.bgColor}
                        textColor={t.textColor}
                    />
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
    title: PropTypes.string,
    subTitle: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeContainer;
