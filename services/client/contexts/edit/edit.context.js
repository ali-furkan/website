/* eslint-disable react/prop-types */
import React from "react";
import { ACTION } from "./edit.constants";
import { EditReducer } from "./edit.reducer";

/**
 * States of EditContext
 * @typedef {{
 * type: string;
 * title: string;
 * description: string;
 * content:string;
 * tags:string;
 * image:string
 * prevData?: import("contexts/edit").EditState
 * }} EditState
 *
 * Setter Functions of EditContext
 * @typedef {{
 * set: (state: Partial<EditState>) => void;
 * setType: (str:string) => void;
 * changeTitle: (str:string) => void;
 * changeDescription: (str:string) => void;
 * changeContent: (str:string) => void;
 * changeTags: (str:string) => void;
 * changeImage: (str:string) => void
 * }} EditFunc
 */

/**
 * Edit Context
 * @type {import("react").Context<EditState&EditFunc>}
 */
export const EditContext = React.createContext();

export function EditProvider({ children }) {
    const [state, dispatch] = React.useReducer(EditReducer, {
        title: "",
        description: "",
        content: "",
        tags: "",
        image: "",
        prevData: {},
    });

    const value = Object.assign({}, state, {
        set: (state) =>
            dispatch({
                type: ACTION.SET_ALL,
                value: state,
            }),
        setType: (value) =>
            dispatch({
                type: ACTION.SET_TYPE,
                value,
            }),
        changeTitle: (value) =>
            dispatch({
                type: ACTION.CHANGE_TITLE,
                value,
            }),
        changeDescription: (value) =>
            dispatch({
                type: ACTION.CHANGE_DESCRIPTION,
                value,
            }),
        changeContent: (value) =>
            dispatch({
                type: ACTION.CHANGE_CONTENT,
                value,
            }),
        changeTags: (value) =>
            dispatch({
                type: ACTION.CHANGE_TAGS,
                value,
            }),
        changeImage: (value) =>
            dispatch({
                type: ACTION.CHANGE_IMAGE,
                value,
            }),
    });

    return (
        <EditContext.Provider value={value}>{children}</EditContext.Provider>
    );
}
