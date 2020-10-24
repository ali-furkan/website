import PropTypes from "prop-types";
import Config from "@config/configuration";
import style from "./layout.module.css";
import dynamic from "next/dynamic";

const MessageLayout = ({ title, description, Description, options }) => {
    options =
        typeof options === "object"
            ? Object.assign({}, DEF_CONFIG, options)
            : DEF_CONFIG;
    const LazyNavbar = () => {
        const Navbar = dynamic(() =>
            import("@components/navbar").then(({ Navbar }) => Navbar)
        );
        return (
            <header className={style.header}>
                <Navbar links={options.links} />
            </header>
        );
    };
    const PageLayout = () => (
        <div id={style.app}>
            {options.navbar ? <LazyNavbar /> : null}
            <main className={style.main}>
                <div className={style.wrapper}>
                    <h1 className={style.title}>{title}</h1>
                    <p>{<Description /> ?? description} </p>
                </div>
            </main>
        </div>
    );
    return PageLayout;
};

const DEF_CONFIG = {
    navbar: true,
    links: Config.Navbar.links,
};

MessageLayout.defaultProps = {
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    options: DEF_CONFIG,
};

MessageLayout.propTypes = {
    title: PropTypes.string,
    description: PropTypes.any,
    options: PropTypes.object,
};

export default MessageLayout;
