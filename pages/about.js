import { pages } from "@/web.config"
import MainLayout from "@/layouts/main"

function AboutPage() {
    return (
        <MainLayout>
            <h1>About</h1>
            <p>{pages.about.content} </p>
        </MainLayout>
    )
}

export default AboutPage
