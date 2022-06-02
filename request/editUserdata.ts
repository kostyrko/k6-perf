import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { User } from "../domain/registerTypes";
import { Roles } from "../domain/roles";
import { authHeaders } from "../http/headers";
import { getRandomEmail, getRandomString } from "../util/random";


const putRequest = (user: User) => {
  const newBody = {
    username: user.username,
    firstName: getRandomString(),
    lastName: getRandomString(),
    email: getRandomEmail(),
    roles: [Roles.ROLE_ADMIN],
  };
  return JSON.stringify(newBody);
};

export const editUserData = (user: User, token: string) => {
  const editUser = http.put(
    `${baseUrl}/users/${user.username}`,
    putRequest(user),
    {
      headers: authHeaders(token),
    }
  );

  check(editUser, {
    "status is 200": () => editUser.status === 200,
  })
};
