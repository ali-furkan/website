export default {
    Navbar: {
        logo: {
            light: "/assets/logo-black.png",
            dark: "/assets/logo-white.png",
        },
        links: {
            About: {
                text: "About Me",
                href: "about",
            },
            Blogs: "blogs",
            Projects: "projects",
            Github: "github",
        },
    },
    HomePage: {
        title: "ali furkan",
        subTitle: "a developer",
        tags: [
            {
                label: "Typescript",
                // bgColor optional
                // textColor optional
            },
            {
                label: "React",
            },
            {
                label: "Nest",
            }
        ],
    },
    AboutPage: {
        title: "About Me",
        content: `
        I&apos;m Ali Furkan. I&apos;m full-stack developer who care UI
        design with Modern Javascript. I have been coding stuff for 5 years.
        I currently know js,ts,py and beginner level java. I love for Modern
        Javascript including React,React Native, Mobx, Graphql and Node.
        Apart from Coding, I like playing gaming, drawing picture and
        learning something new
        `
    }
};
