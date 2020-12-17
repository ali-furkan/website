import propTypes from "prop-types";
import Head from "next/head";
import { Text } from "@components/text";
import { Tag } from "@components/tag";
import style from "./page.module.css"
import Image from "next/image";
import readingTime from "reading-time"

export const MdxPageHead = ({
    title,
    subTitle,
    description,
    keywords,
    image,
    createdAt,
    tags,
    source,
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="article:author" content="Ali Furkan Kurt" />
                {image && <meta property="og:image" content={image} />}
            </Head>
            <Text h1 b>
                {title}
            </Text>
            {subTitle && (
                <Text h2 b color="secondary-400">
                    {subTitle}
                </Text>
            )}
            <div className={style.meta_wrapper}>
                <div className={style.side_meta}>
                    <Text>{createdAt}</Text>
                    <Text>{readingTime(source).text} </Text>
                    <div className={style.tag_wrapper} >
                        <Text>Tags: </Text>
                        {tags?.map((t, i) => (
                            <Tag key={i} label={t.text} bgColor={t.color} />
                        ))}
                    </div>
                </div>
            </div>
            <Image
                src={image}
            />
        </>
    );
};

MdxPageHead.propTypes = {
    title: propTypes.string,
    subTitle: propTypes.string,
    description: propTypes.string,
    keywords: propTypes.string,
    image: propTypes.string,
    createdAt: propTypes.string,
    tags: propTypes.arrayOf(propTypes.object),
    source: propTypes.string
};
