import React from "react";
import PropTypes from "prop-types";
import Input from "@components/input";
import { Tag } from "@components/tag";
import { EditContext } from "contexts/edit";
import style from "./tag-input.module.css";
import { Text } from "@components/text";

export const InputTag = ({ label }) => {
    const { tags, changeTags } = React.useContext(EditContext);
    const src = tags.split(", ");

    return (
        <>
            {label && (
                <Text className={style.label} p b>
                    {label}
                </Text>
            )}
            <div className={style.container}>
                {tags?.split(", ").map((t, i) => {
                    if (i < src.length - 1)
                        return (
                            <Tag
                                key={i}
                                label={t}
                                onClick={() => {
                                    src.splice(i, 1);
                                    changeTags(src.join(", "));
                                }}
                            />
                        );
                })}
                <Input
                    placeholder="New Tag"
                    value={src[src.length - 1]}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace")
                            return changeTags(tags.slice(0, tags.length - 1));
                        if (e.key.length > 1) return;
                        return changeTags(tags + e.key);
                    }}
                />
            </div>
        </>
    );
};

InputTag.propTypes = {
    label: PropTypes.string,
};
