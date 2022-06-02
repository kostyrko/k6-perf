import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../util/user';
import { register } from '../request/registerRequest';
import { login } from '../request/loginRequest';
import { getAllUsers } from '../request/getAllUsersRequests';

export const options: Options = {
  vus: 2,
  iterations: 1
};

export default () => {
  let token: string | undefined
  const user = getRandomUser()

  register(user)
  sleep(5)
  token = login(user)
  sleep(5)
  getAllUsers(token)
};
