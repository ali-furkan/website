const configuration = require("./web.config");

module.exports = {
    cssModules: true,
    images: {
        domains: [configuration.StorageDomain],
    },
    async redirects() {
        const socialLinks = Object.entries(configuration.SocialLinks).map(
            ([k, v]) => ({
                source: `/${k}`,
                destination: v,
                permanent: false,
            })
        );

        return [
            ...socialLinks,
            {
                source: "/p/:p",
                destination: "/projects/:p",
                permanent: false,
            },
            {
                source: "/b/:b",
                destination: "/blogs/:b",
                permanent: false,
            },
            {
                source: "/i/:image",
                destination: `https://${configuration.StorageDomain}/i/:image`,
                permanent: false,
            },
        ];
    },
};
