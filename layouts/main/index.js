import PropTypes from "prop-types";
import { Navbar } from "@components/navbar";
import style from "./layout.module.css";
import Config from "web.config";

const MainLayout = ({ children }) => (
    <>
        <header className={[style.header, style.header_opacity].join(" ")}>
            <Navbar links={Config.Navbar.links} />
        </header>
        <main className={style.main}>{children}</main>
    </>
);

MainLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.func),
};

export default MainLayout;
