import MessageLayout from "@/layouts/message";

const NotFoundPage = () => {
    return (
        <MessageLayout title="Page not found">
            <h2>
                If you want go back to home page, you can click{" "}
                <a className="underline" href="/">
                    this link
                </a>
            </h2>
        </MessageLayout>
    );
};

export default NotFoundPage;
