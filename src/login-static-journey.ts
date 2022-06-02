import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { LoginRequest } from '../domain/loginTypes';
import papa from "papaparse";
import { SharedArray } from 'k6/data';

export const options: Options = {
  vus: 5,
  iterations: 5
};

const csvData = new SharedArray('another data name', () => {
  return papa.parse(open('./users.csv'), { header: true }).data;
})

const loginRequestBody = (): string => {
  const getRandomIndex = Math.floor(Math.random() * csvData.length);
  // here type that is returned must be given for TS signing it with 'as' 
  const randomUser = csvData[getRandomIndex] as LoginRequest;
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
