import MessageLayout from "@layouts/message";

function AboutPage() {
    return (
        <>
            You can following this working from{" "}
            <a
                className="underline"
                href="https://github.com/ali-furkqn/Website"
            >
                github repo
            </a>
        </>
    );
}

export default MessageLayout({
    title: "Not Ready yet",
    Description: AboutPage,
});
