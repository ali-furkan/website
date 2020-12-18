import React from "react";
import dynamic from "next/dynamic";
import Config from "@config/configuration";
import { useTheme } from "@lib/theme";
import MessageLayout from "@layouts/message";
import HomeContainer from "containers/home";

const HomePage = () => {
    const [theme] = useTheme();
    const [color, setColor] = React.useState()

    React.useEffect(() => {
        setColor(theme === "dark" ? "#fff" : "#000");
    }, [theme]);

    return (
        <HomeContainer
            title={Config.HomePage.title}
            subTitle={Config.HomePage.subTitle}
            tags={Config.HomePage.tags}
            links={[{
                href: "/github",
                color,
                Icon: dynamic(()=>import("react-ionicons/lib/LogoGithub"))
            },
            {
                href: "/twitter",
                color,
                Icon: dynamic(()=>import("react-ionicons/lib/LogoTwitter"))
            },
            {
                href: "/dribbble",
                color,
                Icon: dynamic(()=>import("react-ionicons/lib/LogoDribbble"))
            }]}
        />
    );
};

export default MessageLayout({
    Description: HomePage,
});
