import MainLayout from "@/layouts/main"
import Button from "@/components/button"

function PageNotFound() {
    return (
        <MainLayout footer={false}>
            <h1>Page Not Found</h1>
            <p>
                This page doesn't exist. Try heading back home to start from the
                beginning.
            </p>
            <Button href={"/"}>Return Home</Button>
        </MainLayout>
    )
}

export default PageNotFound
