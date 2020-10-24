import MainLayout from "@layouts/main";

function Home() {
    return (
        <>
            <div className="w-full h-full flex items-center justify-center flex-col flex-1">
                <h1 className="font-extrabold text-4xl">Page not found</h1>
                <h2>
                    If you want go back to home page, you can click{" "}
                    <a className="underline" href="/">
                        this link
                    </a>{" "}
                </h2>
            </div>
        </>
    );
}

export default MainLayout(Home);
