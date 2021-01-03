import { parseCookies, destroyCookie } from "nookies";
import { StorageDomain } from "web.config";

export const withAuth = async (ctx) => {
    const cookies = parseCookies(ctx);
    try {
        if (cookies["token"]) {
            const res = await fetch(`https://${StorageDomain}/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${cookies["token"]}`,
                },
            });
            return res.ok;
        }
        return false;
    } catch (e) {
        destroyCookie(ctx, "token");
        return false;
    }
};
