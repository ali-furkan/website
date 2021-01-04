import MessageLayout from "@layouts/message";
import AboutContainer from "containers/about";
import Config from "web.config";

const AboutPage = () => {
    return (
        <MessageLayout>
            <AboutContainer title={Config.AboutPage.title}>
                {Config.AboutPage.content}
            </AboutContainer>
        </MessageLayout>
    );
};

export default MessageLayout({
    Description: AboutPage,
});
