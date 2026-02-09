
import { Action } from "../definitions/types";
import { AuthState } from "../definitions/interfaces";
export const authReducer = (state:AuthState, action:Action ) => 
{
    if("type" in action && "value" in action ){

        switch(action.type) {
    
            case "LOGGING_IN":
                console.log('logging in')
                const id = typeof action?.value === "string" ? action.value: "";
                return {...state, loggedIn: true, uuid: id }
            case "LOGGING_OUT":
                console.log('logging out')
                return {...state, loggedIn:false, currentUser:  null}
            case "GET_USER_OK":
                console.log('got user information')
                const obj = typeof action?.value  === "object" ? action?.value : null;
                return {...state, currentUser: Object.create(obj)}
            default:
                throw new Error('Unknown action: '+ action.type)
        }
    }
     throw new Error("no action types");
}