import MessageLayout from "@layouts/message";
import { parseCookies, destroyCookie } from "nookies";
import { DashboardAuth } from "containers/dashboard/auth";
import { StorageDomain } from "web.config";

export default MessageLayout({
    title: "Authentication",
    Description: DashboardAuth,
});

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx);

    try {
        if (cookies["token"]) {
            const res = await fetch(`https://${StorageDomain}/auth/verify`, {
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
