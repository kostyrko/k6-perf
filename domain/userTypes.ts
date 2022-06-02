import { Roles } from "./roles"

export type singleUserResponse = {
    id: number,
    username: string,
    roles: Roles[],
    firstName: string,
    lastName: string,
    email: string
}