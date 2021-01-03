import React from "react";
import Input from "@components/input";
import { Text } from "@components/text";
import { Button } from "@components/button";
import { useRouter } from "next/router";
import { AuthContext } from "contexts/auth";
import style from "./auth.module.css";

export const DashboardAuth = () => {
    const router = useRouter();

    const [token, setToken] = React.useState("");
    const [msg, setMsg] = React.useState("");

    const authContext = React.useContext(AuthContext);

    const SignInHandle = async () => {
        setMsg("");
        if (!token) return setMsg("Please enter the token");
        const { failed } = await authContext.signIn({ token });
        if (failed) return setMsg("Invalid Token");
        router.push({
            pathname: "/dashboard",
            query: router?.query || {},
        });
    };

    return (
        <>
            <div className={style.container}>
                <Text size="xl" color="primary-100" p b>
                    Login with Authentication token and you take the control of
                    website
                </Text>
            </div>
            <Input
                label="Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Your access token"
            >
                <Button onClick={() => SignInHandle()} text={"SignIn"} />
            </Input>
            {msg && (
                <Text color="red-600" p b>
                    {msg}
                </Text>
            )}
        </>
    );
};
