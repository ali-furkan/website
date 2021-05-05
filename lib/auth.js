import { parseCookies, destroyCookie } from "nookies"
import cookie from "cookie"

export const withAuth = (ctx) => {
	const cookies = parseCookies(ctx)

	const cond = cookies["token"] === process.env.TOKEN

	if (!cond) destroyCookie()

	return cond
}

export const withAuthAPI = (req) => {
	const { token } = cookie.parse(req.headers.cookie)

	return token === process.env.TOKEN
}
