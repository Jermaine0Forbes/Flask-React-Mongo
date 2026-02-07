import React, { useReducer } from "react"
import { authReducer } from "../reducers";
import { AuthStateContext, AuthDispatchContext, AuthContext } from "../contexts";
import { ChildrenNode, AuthState } from "../definitions/interfaces";

export default function AuthProvider({ children }: ChildrenNode) {
    const token = localStorage.getItem('_t');
    const initialState: AuthState = {
        currentUser: {},
        token: token,
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