import React, { useReducer } from "react"
import { authReducer } from "../reducers";
import { AuthStateContext, AuthDispatchContext, AuthContext } from "../contexts";
import { ChildrenNode, AuthState } from "../definitions/interfaces";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({ children }: ChildrenNode) {
    const token = localStorage.getItem('_t') ?? "";
    // const decode = jwtDecode(token);
    const decode = token ? jwtDecode(token) : "";
    const unique = decode  && "uuid" in decode && typeof decode?.uuid === "string" ? decode?.uuid : "";
    let cu = {};

    // console.log('decode')
    // console.log(decode)

     if(decode) {
        cu = { ...decode}
     }
    const initialState: AuthState = {
        currentUser: cu,
        token: token,
        loggedIn: false, 
        uuid: unique,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                <AuthContext.Provider value={{ state, dispatch }}>
                    {children}
                </AuthContext.Provider>
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}