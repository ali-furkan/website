/* eslint-disable react/prop-types */
import React from "react";
import { setCookie } from "nookies";
import { ACTION } from "./auth.constants";
import { authReducer } from "./auth.reducer";
import { StorageDomain } from "web.config";
import config from "@config/index";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(authReducer, {
        isSigned: false,
    });
    const authContext = Object.assign({}, state, {
        signIn: async ({ token }) => {
            try {
                const baseUrl = `https://${StorageDomain}`;
                const res = await fetch(baseUrl + "/auth/verify", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) return { failed: true };
                setCookie(null, "token", token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: config.isProd,
                });
                dispatch({
                    type: ACTION.SIGN_IN,
                });
                return {
                    failed: false,
                };
            } catch (e) {
                return {
                    failed: true,
                    err: e,
                };
            }
        },
        signOut: () =>
            dispatch({
                type: ACTION.SIGN_OUT,
            }),
    });

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
};
