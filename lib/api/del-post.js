import config from "@/config";

/**
 * Delete Post API
 * @param {string} token User Access Token
 * @param {{ hash: string; type: string }} payload
 */
export const deletePost = async (token, { hash, type }) => {
    try {
        const resDelMeta = await fetch(
            `${config.baseUrl}/${type}-metas/${hash}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const resDelContent = await fetch(`${config.baseUrl}/${type}/${hash}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!resDelMeta.ok || !resDelContent.ok)
            throw new Error("File cannot delete");

        return {
            failed: false,
        };
    } catch (err) {
        return {
            failed: true,
            err,
        };
    }
};
