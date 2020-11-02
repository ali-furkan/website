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
                source: "/p/:p",
                destination: "/projects/:p",
                permanent: false,
            },
            {
                source: "/i/:image",
                destination: "https://cdn.alifurkan.codes/i/:image",
                permanent: false,
            },
        ];
    },
};
