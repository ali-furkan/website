import MessageLayout from "@layouts/message";
import AboutContainer from "containers/about";

function AboutPage() {
    return (
        <AboutContainer title={"About Me"}>
            I&apos;m Ali Furkan. I&apos;m full-stack developer who care UI
            design with Modern Javascript. I have been coding stuff for 5 years.
            I currently know js,ts,py and beginner level java. I love for Modern
            Javascript including React,React Native, Mobx, Graphql and Node.
            Apart from Coding, I like playing gaming, drawing picture and
            learning something new
        </AboutContainer>
    );
}

export default MessageLayout({
    Description: AboutPage
});
