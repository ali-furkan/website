import { Navbar } from "@components/navbar";
import style from "./layout.module.css";
import Config from "@config/configuration";

const MainLayout = (Page) => {
    const PageLayout = (props) => (
        <>
            <header className={style.header}>
                <Navbar links={Config.Navbar.links} />
            </header>
            <main className={style.main}>
                <Page {...props} />
            </main>
        </>
    );
    return PageLayout;
};

export default MainLayout;
