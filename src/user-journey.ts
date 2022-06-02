import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../util/user';
import { register } from '../request/registerRequest';
import { login } from '../request/loginRequest';
import { getAllUsers } from '../request/getAllUsersRequest';
import { getSingleUser } from '../request/getSingleUser';

export const options: Options = {
  // vus: 2,
  // iterations: 2
  stages: [
    { duration: '5m', target: 10 }, // simulate ramp-up of traffic from 1 to 10 users over 5 minutes.
    { duration: '10m', target: 10 }, // stay at 10 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'], // check if more than 10% of requests failed
    http_req_duration: ['p(90)<1500'], // 99% of requests must complete below 1.5s
    checks: ['rate>0.9'], // check if more than 90% of requests succeeded
  },
};



export default () => {
  let token: string | undefined
  const user = getRandomUser()

  register(user)
  sleep(5)
  token = login(user)
  sleep(2)
  getAllUsers(token)
  sleep(2)
  getSingleUser(user.username, token)
  sleep(2)
};
