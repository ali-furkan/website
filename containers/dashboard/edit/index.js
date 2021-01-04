import React from "react";
import Proptypes from "prop-types";
import dynamic from "next/dynamic";

import { EditContext } from "@/contexts/edit";

import { Text } from "@/components/text";
import { Button } from "@/components/button";
import Input from "@/components/input";
import { InputTag } from "@/components/input-tag";

const SimpleMde = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

import "easymde/dist/easymde.min.css";
import style from "./edit.module.css";

export const EditContainer = ({ value, onSubmit, error }) => {
    const editCtx = React.useContext(EditContext);
    const {
        set,
        type,
        title,
        changeTitle,
        description,
        changeDescription,
        image,
        changeImage,
        content,
        changeContent,
    } = editCtx;

    React.useEffect(() => {
        set(value);
    }, []);

    const typeTitle =
        type && type[0].toUpperCase() + type.slice(1, type.length - 1);

    return (
        <div className={style.edit_container}>
            <Text h1 b>
                {typeTitle} Editor
            </Text>
            <div className={style.container}>
                <div className={style.editor_wrapper}>
                    <Text h2 b>
                        Text Editor
                    </Text>
                    <SimpleMde
                        className={style.editor}
                        value={content}
                        onChange={changeContent}
                        options={{
                            autofocus: true,
                            spellChecker: true,
                        }}
                    />
                </div>
                <div className={style.sidebar_meta}>
                    <Text h2 b>
                        Meta Fields
                    </Text>
                    <Input
                        label="Title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => changeTitle(e.target.value)}
                    />
                    <Input
                        label="Description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => changeDescription(e.target.value)}
                    />
                    <InputTag label="Tags" />
                    <Input
                        label="Image Link"
                        placeholder="Image"
                        value={image}
                        onChange={(e) => changeImage(e.target.value)}
                    />
                    <Button onClick={() => onSubmit(editCtx)} size="xl">
                        Save the {typeTitle}
                    </Button>
                    {error && (
                        <Text color={"red-400"} p b>
                            {error}
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
};

EditContainer.defaultProps = {
    value: {
        title: "",
        description: "",
        content: "",
        tags: "",
        image: "",
    },
};

EditContainer.propTypes = {
    value: Proptypes.object,
    onSubmit: Proptypes.func,
    error: Proptypes.string,
};
