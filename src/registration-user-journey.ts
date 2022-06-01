import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { RegistrationRequest } from '../domain/registerTypes';
import { getRandomUser } from '../util/user';


export const options: Options = {
  vus: 5,
  iterations: 5
};

const registerBody = () => {
    const user: RegistrationRequest = getRandomUser();
    return JSON.stringify(user)
}

export default () => {
    http.post(`${baseUrl}/users/signup`, registerBody(), {headers: jsonHeaders});
};
