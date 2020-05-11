export interface User {
    email: string
    password: string
}

export interface Category {
    name: string,
    imgSrc?: string,
    user?: string,
    _id?: string
}

export interface Message {
    message: string
}

export interface Position {
    name: string,
    cost: number,
    user?: string,
    category: string,
    _id?: string,
    quantity? : number
}