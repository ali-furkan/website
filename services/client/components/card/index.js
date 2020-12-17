import PropTypes, { object } from "prop-types";
import Link from "next/link";
import { Text } from "@components/text";
import style from "./card.module.css";

export const Card = ({ title, image, tags, date, href }) => {
    return (
        <Link href={href}>
            <article className={style.container}>
                <div className={style.img_wrapper}>
                    <img
                        alt={`img-${title.toLowerCase()}`}
                        src={image}
                        width="256px"
                    />
                </div>
                <footer className={style.info}>
                    <div className={style.tag_grid}>
                        {tags.map((t, i) => (
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
                </footer>
            </article>
        </Link>
    );
};

Card.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.arrayOf(object),
    date: PropTypes.string,
    href: PropTypes.any,
};
