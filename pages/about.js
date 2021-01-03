import MessageLayout from "@layouts/message";
import AboutContainer from "containers/about";
import Config from "web.config";

function AboutPage() {
    return (
        <AboutContainer title={Config.AboutPage.title}>
            {Config.AboutPage.content}
        </AboutContainer>
    );
}

export default MessageLayout({
    Description: AboutPage,
});
