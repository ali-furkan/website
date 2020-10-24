import MainLayout from "@layouts/main";

function About() {
    return (
        <>
            <div className="w-full h-full flex items-center justify-center flex-col flex-1">
                <h1 className="font-extrabold text-4xl">Not Ready yet</h1>
                <h2>
                    You can following this working from{" "}
                    <a
                        className="underline"
                        href="https://github.com/ali-furkqn/Website"
                    >
                        github repo
                    </a>{" "}
                </h2>
            </div>
        </>
    );
}

export default MainLayout(About);
