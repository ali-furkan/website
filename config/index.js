import config from "web.config";

export default {
    isProd: process.env.NODE_ENV === "production",
    baseUrl: "https://" + config.StorageDomain,
};
