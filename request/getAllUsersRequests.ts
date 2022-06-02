import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders, jsonHeaders } from "../http/headers";



export const getAllUsers = (token: string) => {
    const getAllUsersResult = http.get(`${baseUrl}/users`, {
        headers: authHeaders(token)
    })

    check(getAllUsersResult, {
        'registration status is 201': () => getAllUsersResult.status === 200,
    });
}