const configuration = require("./web.config");

module.exports = {
    webpack5: true,
    poweredByHeader: false,
    
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
            {
                source: "/blog",
                destination: "/posts",
                permanent: false,
            },
            {
                source: "/github/:repo",
                destination: "https://github.com/ali-furkan/:repo",
                permanent: false,
            },
            ...socialLinks
        ]
    }
}