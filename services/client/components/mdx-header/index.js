import React from "react";
import propTypes from "prop-types";
import Head from "next/head";
import dynamic from "next/dynamic";

import { fmtDate } from "@lib/fmt";
import { useTheme } from "@lib/theme";

import { Tag } from "@components/tag";
import { Text } from "@components/text";
import { IconButton } from "@components/icon";

import style from "./page.module.css";

const TwitterIco = dynamic(() => import("react-ionicons/lib/LogoTwitter"), {
    ssr: true,
});
const LinkedinIco = dynamic(() => import("react-ionicons/lib/LogoLinkedin"), {
    srr: true,
});
const FacebookIco = dynamic(() => import("react-ionicons/lib/LogoFacebook"));
const CopyIco = dynamic(() => import("react-ionicons/lib/MdCopy"));
const DateIco = dynamic(() => import("react-ionicons/lib/MdCalendar"));
const BookIco = dynamic(() => import("react-ionicons/lib/MdBook"));

export const MdxPageHead = ({
    title,
    subTitle,
    description,
    keywords,
    image,
    createdAt,
    tags,
    readingTime,
}) => {
    const [mediaTxt, setMediaTxt] = React.useState("");
    const [curHref, setCurHref] = React.useState("");
    const [color, setColor] = React.useState();

    const [theme] = useTheme();

    React.useEffect(() => {
        setColor(theme === "dark" ? "#fff" : "#000");
    }, [theme]);

    React.useEffect(() => {
        if (!window) return;
        setCurHref(window.location.href);
        setMediaTxt(
            encodeURIComponent(
                [title, "@ali_furkqn", window.location.href].join(" ")
            )
        );
    }, []);

    return (
        <>
            <Head>
                <title>{title} | Ali Furkan's Blogs</title>
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
                    <div className={style.side_meta_item}>
                        <DateIco fonstSize={24} color={color} />
                        <Text>{fmtDate(createdAt)}</Text>
                    </div>
                    {readingTime && (
                        <div className={style.side_meta_item}>
                            <BookIco fonstSize={24} color={color} />
                            <Text>{readingTime} </Text>
                        </div>
                    )}
                    <div className={style.side_meta_item}>
                        {tags && tags?.length > 0 && (
                            <div className={style.tag_wrapper}>
                                <Text b>Tags: </Text>
                                {tags?.map((t, i) => (
                                    <Tag
                                        key={i}
                                        label={t.text}
                                        bgColor={t.color}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={style.side_links}>
                    <IconButton
                        Icon={TwitterIco}
                        href={`https://twitter.com/intent/tweet?text=${mediaTxt}`}
                        size={24}
                        color={color}
                    />
                    <IconButton
                        Icon={LinkedinIco}
                        href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            curHref
                        )}`}
                        size={24}
                        color={color}
                    />
                    <IconButton
                        Icon={FacebookIco}
                        href={"#Hello"}
                        size={24}
                        color={color}
                    />
                    <IconButton
                        Icon={CopyIco}
                        href={"/"}
                        size={24}
                        color={color}
                    />
                </div>
            </div>
            {image && <img src={image} className={"mb-8"} />}
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
    readingTime: propTypes.string,
    source: propTypes.string,
};
