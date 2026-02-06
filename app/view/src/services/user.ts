import { LoginInputs, SignupInputs } from "../definitions/types";
import { UserProfile } from "../definitions/interfaces";

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

export async function getUserProfile(): Promise<UserProfile| Response>{
    const url = process.env.REACT_APP_URL+'/user/profile';
    const token = localStorage.getItem('_t');
    return await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(res => {
        if(!res.ok) {
            throw res.statusText
        }

        return res.json();
    })
    .catch((err) => {
        throw err;
    });

}

