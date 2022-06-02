import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { LoginRequest } from '../domain/loginTypes';
import { SharedArray } from 'k6/data';

export const options: Options = {
  vus: 10,
  iterations: 5
};

const jsonData = new SharedArray('some data name', function () {
  return JSON.parse(open('./users.json')).users;
});

const loginRequestBody = (): string => {
  // here type that is returned must be given for TS signing it with 'as' 
  const randomUser = jsonData[Math.floor(Math.random() * jsonData.length)] as LoginRequest;

  const body: LoginRequest = {
    password: randomUser.password,
    username: randomUser.username,
  }
  return JSON.stringify(body)
}

export default () => {
  const loginResponse = http.post(`${baseUrl}/users/signin`, loginRequestBody(), {
    headers: jsonHeaders
  });
  check(loginResponse, {
    'status is 200': () => loginResponse.status === 200,
  });
};
