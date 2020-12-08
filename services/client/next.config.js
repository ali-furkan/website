module.exports = {
    cssModules: true,
    async redirects() {
        return [
            {
                source: "/github",
                destination: "https://github.com/ali-furkqn",
                permanent: false,
            },
            {
                source: "/twitter",
                destination: "https://twitter.com/AliFurkqn",
                permanent: false,
            },
            {
                source: "/dribbble",
                destination: "https://dribbble.com/ali_furkan",
                permanent: false,
            },
            {
                source: "/p/:p",
                destination: "/projects/:p",
                permanent: false,
            },
            {
                source: "/i/:image",
                destination: "https://a.alifurkan.co/i/:image",
                permanent: false,
            },
        ];
    },
};
