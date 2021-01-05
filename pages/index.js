import React from "react";
import dynamic from "next/dynamic";
import webConfig from "web.config";
import { useTheme } from "@/lib/theme";
import MessageLayout from "@/layouts/message";
import HomeContainer from "@/containers/home";

const HomePage = () => {
    const [theme] = useTheme();
    const [color, setColor] = React.useState();

    React.useEffect(() => {
        setColor(theme === "dark" ? "#fff" : "#000");
    }, [theme]);

    return (
        <MessageLayout>
            <HomeContainer
                title={webConfig.HomePage.title}
                subTitle={webConfig.HomePage.subTitle}
                tags={webConfig.HomePage.tags}
                links={[
                    {
                        href: "/github",
                        color,
                        Icon: dynamic(() =>
                            import("react-ionicons/lib/LogoGithub")
                        ),
                    },
                    {
                        href: "/twitter",
                        color,
                        Icon: dynamic(() =>
                            import("react-ionicons/lib/LogoTwitter")
                        ),
                    },
                    {
                        href: "/dribbble",
                        color,
                        Icon: dynamic(() =>
                            import("react-ionicons/lib/LogoDribbble")
                        ),
                    },
                ]}
            />
        </MessageLayout>
    );
};

export default HomePage;
