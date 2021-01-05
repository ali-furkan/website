import MessageLayout from "@/layouts/message";
import AboutContainer from "@/containers/about";
import webConfig from "web.config";

const AboutPage = () => {
    return (
        <MessageLayout>
            <AboutContainer title={webConfig.AboutPage.title}>
                {webConfig.AboutPage.content}
            </AboutContainer>
        </MessageLayout>
    );
};

export default AboutPage;
