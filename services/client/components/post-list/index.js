import React from "react";
import PropTypes from "prop-types";
import { Text } from "@components/text";
import Link from "next/link";
import { Button } from "@components/button";
import { Card } from "@components/card";
import style from "./post-list.module.css";

export function PostList({ title, list }) {
    return (
        <div className={style.post_list}>
            <div className={style.post_title}>
                <Text h2 b>
                    {title}
                </Text>
                <Link
                    href={{
                        pathname: `/dashboard/[type]/new`,
                        query: {
                            type: title.toLowerCase() + "s",
                        },
                    }}
                >
                    <Button outline size="sm">
                        Add +
                    </Button>
                </Link>
            </div>
            <div className={style.post_container}>
                {list?.map((b, i) => (
                    <Card
                        key={i}
                        {...Object.assign({}, b, { href: null })}
                        href={{
                            pathname: `/dashboard/${title.toLowerCase()}s/id/${
                                b.hash
                            }`,
                        }}
                        theme="row"
                    />
                ))}
                {(!list || list.length < 1) && (
                    <Text h3 color="primary-200">
                        {title} is not found
                    </Text>
                )}
            </div>
        </div>
    );
}

PostList.propTypes = {
    title: PropTypes.string,
    list: PropTypes.array,
};
