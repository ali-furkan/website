const configuration = require("./web.config");

module.exports = {
    cssModules: true,
    images: {
        domains: [configuration.storagedomain],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    async redirects() {
        const socialLinks = Object.entries(configuration.sociallinks).map(
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
                destination: `https://${configuration.storagedomain}/i/:image`,
                permanent: false,
            },
        ];
    },
};
