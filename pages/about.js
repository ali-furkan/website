import MessageLayout from "@/layouts/message";
import AboutContainer from "@/containers/about";
import webConfig from "web.config";

const AboutPage = () => {
	return (
		<MessageLayout>
			<AboutContainer title={webConfig.aboutpage.title}>
				{webConfig.aboutpage.content}
			</AboutContainer>
		</MessageLayout>
	);
};

export default AboutPage;
