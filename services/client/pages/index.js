import MessageLayout from "@layouts/message";

export default MessageLayout({
    title: "Not Ready yet",
    Description() {
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
    },
});
