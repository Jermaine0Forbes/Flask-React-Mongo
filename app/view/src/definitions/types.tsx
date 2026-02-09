export type DialogStatus = true | false;

export type LoginInputs = {
    username: string
    password: string
};

export type SignupInputs = {
    username: string
    password: string
    password2: string
};


export type Action = 
| { type: string, value: string}
| { type: string, value: object};


export type isObject<T> = T extends object? true: false;

export type isInterface<T, K> = T extends K ? true: false;