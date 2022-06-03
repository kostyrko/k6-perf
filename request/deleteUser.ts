import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../http/headers";

export const deleteSingleUser = (userName: string, token: string) => {
    const delSingleUser = http.del(`${baseUrl}/users/${userName}`, {}, {
        headers: authHeaders(token)
    })


    check(delSingleUser, {
        'delete user': () => delSingleUser.status === 204,
    });
}