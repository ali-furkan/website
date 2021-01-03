import React from "react";
import { ToastContainer, toast as useToast } from "react-toastify";
import { useRouter } from "next/router";

export const Toasty = () => {
    const router = useRouter();
    const { toast, msg } = router.query;

    React.useEffect(() => {
        if (
            !toast ||
            !msg ||
            typeof toast !== "string" ||
            typeof msg !== "string"
        )
            return;

        const getType = (str) => {
            if (!["error", "success", "info", "warning"].includes(str))
                return "info";
            return str;
        };

        console.log("NAME");

        const type = getType(toast);

        useToast[type](decodeURI(msg), {
            className: `toast-${type} toasty`,
        });

        delete router.query["toast"];
        delete router.query["msg"];

        router.replace({
            pathname: router.pathname,
            query: router?.query,
        });
    }, [toast, msg]);

    return <ToastContainer position="bottom-right" className="toasty" />;
};
