import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { singleUserResponse } from "../domain/userTypes";
import { authHeaders } from "../http/headers";

export const getSingleUser = (userName: string, token: string) => {
    const getSingleUser = http.get(`${baseUrl}/users/${userName}`, {
        headers: authHeaders(token)
    })

    const getUserReponse = getSingleUser.json() as singleUserResponse

    check(getSingleUser, {
        'registration status is 200': () => getSingleUser.status === 200,
    });
    check(getUserReponse, {
        'contains user': () => getUserReponse.username === userName,
    });
}