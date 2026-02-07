

export const authReducer = (state:object, action:object ) => 
{
    if("type" in action && "value" in action ){

        switch(action.type) {
    
            case "LOGGING_IN":
                console.log('logging in')
                return {...state, loggedIn: true, currentUser: action?.value }
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