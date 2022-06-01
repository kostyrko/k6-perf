import {Roles} from "./roles";

export type RegistrationRequest = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    roles: Roles[],
    email: string
}