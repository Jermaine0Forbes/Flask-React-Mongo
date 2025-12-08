import { LoginInputs, SignupInputs } from "../types";

async function userPost(data: object, url: string) {

    return  await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
}

export async function userSignup (data: SignupInputs ) {
        console.log("environment is "+process.env.NODE_ENV)
      return  await fetch(process.env.REACT_APP_URL+'/user/signup',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        

}

export async function userLogin(data: LoginInputs) {
    const url = process.env.REACT_APP_URL+'/user/login';
    return await userPost(data, url);
}

