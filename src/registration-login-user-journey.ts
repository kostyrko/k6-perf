import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { RegistrationRequest } from '../domain/registerTypes';
import { getRandomUser } from '../util/user';
import { LoginRequest } from '../domain/loginTypes';


export const options: Options = {
  vus: 5,
  iterations: 5
};

let username: string
let password: string

const registerBody = () => {
    const user: RegistrationRequest = getRandomUser();
    username = user.username
    password = user.password
    return JSON.stringify(user)
}

const loginRequestBody = (): string => {
  const body: LoginRequest = {
    password: password,
    username: username
  }
  return JSON.stringify(body)
}

export default () => {
    const registerRequest =
    http.post(`${baseUrl}/users/signup`, registerBody(), {headers: jsonHeaders});

    check(registerRequest, {
      'status is 201': () => registerRequest.status === 201,
    });

    sleep(3)

    const loginResponse = 
    http.post(`${baseUrl}/users/signin`, loginRequestBody(), {
      headers: jsonHeaders
    })

    check(loginResponse, {
      'status is 200': () => loginResponse.status === 200,
    });
};
