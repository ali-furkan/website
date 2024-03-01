const now = new Date()
const bd = new Date("2003-07-26")
const age = Math.floor((now -bd) / 31536000000)
const duration = now.getFullYear() - 2018

module.exports = {
    pages: {
        home: {
            shortAbout: `I am a ${age} years old Software Developer from Istanbul. I have been coding for ${duration} years and enjoy working with languages like Typescript, Golang, and Rust. and this website showcases a summary whole my career accomplishments and development skills.`,
            works: [
                {
                    image:
                        "https://github.com/ali-furkan/stona/blob/main/assets/stona-banner-alt.png?raw=true",
                    href: "https://github.com/ali-furkan/stona",
                    title: "Stona",
                    description:
                        "Stona is a dynamic scalable object storage. Truly elastic architecture for effortless growth"
                },
                {
                    image:
                        "https://raw.githubusercontent.com/auth-blur/Website/dev/public/assets/banners/default.png",
                    href: "https://github.com/auth-blur",
                    title: "Blur",
                    description:
                        "Blur (aka. Picassco) is a web service that provides you control over your information on social networks in one place. Written in Typescript, Golang, and C++"
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
            content: `My name is Ali Furkan. I am a Software Developer currently residing in
            Istanbul, at the age of ${age}. I am constantly trying to improve myself in the fields that
            interest me, such as Computer Networking and Graphics. I have been coding 
            for ${duration} years, and have currently worked with languages such as Typescript, 
            Golang, and Rust. Besides coding, I enjoy playing chess as an enthusiast.`
        },

    },
    meta: {
        title: "Ali Furkan's Portfolio",
        keywords: "Ali Furkan, Portfolio, Github, React, Nest, Typescript",
        description:
            `My name is Ali Furkan. I am a ${age} years old Software Developer from Istanbul. I have been coding for ${duration} years and enjoy working with languages like Typescript, Golang, and Rust. and this website showcases a summary whole my career accomplishments and development skills.`,
        author: "Ali Furkan",
        image: "/assets/banner.png",
        color: "#000000",
    },
    publishdomain: "alifurkan.dev",
    sociallinks: {
        github: "https://github.com/ali-furkan",
        twitter: "https://twitter.com/a2f4n",
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
