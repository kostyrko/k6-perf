import { JSONObject, sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../util/user';
import { register } from '../request/registerRequest';
import { login } from '../request/loginRequest';
import { getAllUsers } from '../request/getAllUsersRequest';
import { getSingleUser } from '../request/getSingleUser';
import { getMyData } from '../request/getMyData';
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { getRefreshToken } from '../request/getRefreshToken';
// @ts-ignore
import {textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { editUserData } from '../request/editUserdata';

export const options: Options = {
  vus: 2,
  iterations: 2
};



export default () => {
  let token: string | undefined
  let refreshToken: string | undefined
  const user = getRandomUser()

  register(user)
  sleep(5)
  token = login(user)
  sleep(2)
  getAllUsers(token)
  sleep(2)
  getSingleUser(user.username, token)
  sleep(2)
  getMyData(user.email, token)
  sleep(2)
  refreshToken = getRefreshToken(token)
  sleep(2)
  editUserData(user, refreshToken)
};



export function handleSummary(data: JSONObject) {
  return {
    'summary.html': htmlReport(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true })
  };
}