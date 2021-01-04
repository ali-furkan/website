import PropTypes from "prop-types";
import webConfig from "web.config";
import { Navbar } from "@/components/navbar";
import style from "./layout.module.css";

const MainLayout = ({ children }) => (
    <>
        <header className={[style.header, style.header_opacity].join(" ")}>
            <Navbar links={webConfig.Navbar.links} />
        </header>
        <main className={style.main}>{children}</main>
    </>
);

MainLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.func),
};

export default MainLayout;
