import { Club } from "./club"

export interface User{
    id : String,
    firstName : String,
    lastName : String,
    phoneNumber : String,
    role: String,
    email: String,
    clubs: Club[]
}