export interface UserProfile {
    username: string, 
    uuid: string,
    location?: string, 
    position?: string,
    email?: string,
    contacts?:Array<any>

}