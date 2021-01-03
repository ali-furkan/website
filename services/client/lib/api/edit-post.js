import { fmtPost } from "@lib/fmt";
import { createPost } from "./create-post";
import { deletePost } from "./del-post";

/**
 * Edit Post API
 * @param {string} token User Access Token
 * @param {import("contexts/edit").EditState} prevPayload
 * @param {import("contexts/edit").EditState} curPayload
 */
export const editPost = async (token, prevPayload, curPayload) => {
    try {
        const { type, title } = prevPayload;
        const hash = fmtPost(title);

        const { failed, err } = await deletePost(token, { hash, type });

        if (failed) throw new Error(err.toString());

        return await createPost(token, curPayload);
    } catch (e) {
        return {
            failed: true,
            err: e,
        };
    }
};
