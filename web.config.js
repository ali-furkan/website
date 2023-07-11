const now = new Date()
const bd = new Date("2003-07-26")
const age = Math.floor(now -bd) / 31536000000
const duration = now.getFullYear() - 2016

module.exports = {
    pages: {
        home: {
            shortAbout: `Ali Furkan, personal website to showcase my career and development skills. I'm an ${age} years old developer living in Istanbul and I'm trying to improve myself, learn and share what i learn. I love to develop stuffs with coding in summary`,
            works: [
                {
                    image:
                        "https://github.com/ali-furkan/stona/blob/main/assets/stona-banner-alt.png?raw=true",
                    href: "https://github.com/ali-furkan/stona",
                    title: "Stona",
                    description:
                        "Stona is a dynamic scalable object storage. Truly elastic artchitecture for effortless growth"
                },
                {
                    image:
                        "https://raw.githubusercontent.com/auth-blur/Website/dev/public/assets/banners/default.png",
                    href: "https://github.com/auth-blur",
                    title: "Blur",
                    description:
                        "Blur (aka picassco) is a web service that provide to you control to your information on social networks in one place. Written in Typescript, Golang and C++"
                },
                {
                    image: "/assets/projects/zink.png",
                    href: "https://github.com/ali-furkan/zink",
                    title: "Zinkapp",
                    description: "Online Duel mobile game written in Nest.js and React Native"
                }
            ]
        },
        about: {
            content: `I'm Ali Furkan and I'm an ${age} years old
            developer living in Istanbul and I'm trying to improve myself, learn
            and share what i learn. I love everything about coding in summary.
            Also I'm developer who care UI design with Modern Javascript. I have
            been coding stuff for ${duration} years. I'm
            currently interested js, ts, golang, c++. I love for Modern Javascript
            including React, React Native, Mobx, Graphql and Node. Apart from
            Coding, I like playing games, drawing pictures and learning something
            new.`
        },

    },
    meta: {
        title: "Ali Furkan's Portfolio",
        keywords: "Ali Furkan, Portfolio, Github, React, Nest, Typescript",
        description:
            "Ali Furkan, personal website to showcase my career and development skills. I'm an 17 years old developer living in Istanbul and I'm trying to improve myself, learn and share what i learn. I love to develop stuffs with coding in summary",
        author: "Ali Furkan",
        image: "/assets/banner.png",
        color: "#000000",
    },
    publishdomain: "alifurkan.dev",
    sociallinks: {
        github: "https://github.com/ali-furkan",
        twitter: "https://twitter.com/AliFurkqn",
        discord: "https://discord.gg/7fRguueUV8",
    },
    discordID: "304531766339829762",
    navbar: {
        links: [
            { text: "Home", href: "/" },
            { text: "Bookmarks", href: "/bookmarks" },
            { text: "About", href: "/about" }
        ]
    },
    footer: {
        tree: [
            [
                { text: "Home", href: "/" },
                { text: "About", href: "/about" },
                { text: "Blog", href: "/blog" }
            ],
            [
                { text: "Twitter", href: "/twitter" },
                { text: "Github", href: "/github" },
                { text: "Discord", href: "/discord" },
                { text: "Email", href:"mailto:me@alifurkan.dev" }
            ],
            [
                { text: "Bookmarks", href: "/bookmarks" },
                // { text: "Notes", href: "/notes" },
                // { text: "Activity", href: "/activity" },
                { text: "Changelog", href: "/changelog" }
            ]
        ]
    }
};
