import { parseCookies, destroyCookie } from "nookies";
import config from "@/config";
import { DashboardAuth } from "@/containers/dashboard/auth";
import MessageLayout from "@/layouts/message";

const DashboardAuthPage = () => (
	<MessageLayout title="Authentication">
		<DashboardAuth />
	</MessageLayout>
);

export async function getServerSideProps(ctx) {
	const cookies = parseCookies(ctx);

	try {
		if (cookies["token"]) {
			const res = await fetch(`${config.baseUrl}/auth/verify`, {
				headers: {
					Authorization: `Bearer ${cookies["token"]}`,
				},
			});
			if (res.ok)
				return {
					redirect: {
						destination: "/dashboard",
						permanent: false,
					},
				};
		}
		return {
			props: {},
		};
	} catch (e) {
		destroyCookie(ctx, "token");
		return {
			props: {},
		};
	}
}

export default DashboardAuthPage;
