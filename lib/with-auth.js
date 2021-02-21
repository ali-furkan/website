import { parseCookies, destroyCookie } from "nookies";
import config from "@/config";

export const withAuth = async (ctx) => {
	const cookies = parseCookies(ctx);
	try {
		if (cookies["token"]) {
			const res = await fetch(`${config.baseUrl}/auth/verify`, {
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
