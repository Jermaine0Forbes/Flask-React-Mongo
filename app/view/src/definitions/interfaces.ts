export interface UserProfile {
    username: string, 
    uuid: string,
    location?: string, 
    position?: string,
    email?: string,
    contacts?:Array<any>

}

export interface ChildrenNode {
    children?: React.ReactNode
}


export interface AuthState {

    currentUser: Record<string, unknown> | object,
    token: null | string,
    loggedIn?: boolean ,
    uuid?: string,
}


export interface CurrentUser {
    username : string, 
    uuid: string,
    email?: string,
    created_at?: object,

}

export interface AuthType {
    state?: AuthState,
    dispatch?: Function
}