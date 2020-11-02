import MessageLayout from "@layouts/message";

function Description() {
    return (
        <>
            <h2>
                If you want go back to home page, you can click{" "}
                <a className="underline" href="/">
                    this link
                </a>
            </h2>
        </>
    );
}

export default MessageLayout({
    title: "Page not found",
    options: {
        navbar: false
    },
    Description
});
