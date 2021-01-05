import config from "@/config/index";
import { CompilePost } from "@/lib/post";

/**
 *  Create Post API
 * @param {string} token User Access Token
 * @param {import("contexts/edit").EditState} payload
 */
export const createPost = async (token, payload) => {
    const { hash, meta, compiledContent } = CompilePost(payload);

    const metaFormData = new FormData();
    const metaBlob = new Blob([JSON.stringify(meta)], {
        type: "application/json",
    });
    metaFormData.append("file", metaBlob, "file");

    try {
        const resMeta = await fetch(
            `${config.baseUrl}/${payload.type}-metas/${hash}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: metaFormData,
            }
        );

        if (!resMeta.ok) throw new Error(resMeta.statusText);

        const mdxFormData = new FormData();
        const mdxBlob = new Blob([compiledContent], { type: "text/plain" });
        mdxFormData.append("file", mdxBlob, "md-file");

        const resMd = await fetch(`${config.baseUrl}/${payload.type}/${hash}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: mdxFormData,
        });

        if (!resMd.ok) throw new Error(resMd.statusText);

        return {
            failed: false,
            message: "Successfully Created Post",
            pathname: `/${payload.type}/${hash}`,
        };
    } catch (e) {
        return {
            failed: true,
            err: e,
        };
    }
};
