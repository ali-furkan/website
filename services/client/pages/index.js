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

export async function getServerSideProps() {
    return {
        props: {
            name: "xd",
        }, // will be passed to the page component as props
    };
}
