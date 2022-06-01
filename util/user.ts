import {RegistrationRequest} from '../domain/registerTypes';
import { Roles } from '../domain/roles';
import {getRandomString, getRandomEmail} from './random'

export const getRandomUser = (): RegistrationRequest => {
    return {
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT],
        email: getRandomEmail()
    }
}
