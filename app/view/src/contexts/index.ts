import { createContext} from "react";
import { AuthState, AuthType } from "../definitions/interfaces";

export const AuthStateContext = createContext<unknown> (null);

export const AuthDispatchContext = createContext<unknown>(null);

// export const AuthContext = createContext<AuthType | null>({ state: undefined , dispatch: undefined});
// export const AuthContext = createContext<Record<string, unknown>>({});
export const AuthContext = createContext<any>({});