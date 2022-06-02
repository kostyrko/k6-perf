import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { singleUserResponse } from "../domain/userTypes";
import { authHeaders } from "../http/headers";

export const getMyData = (email:string, token: string) => {
    const getMyData = http.get(`${baseUrl}/users/me`, {
        headers: authHeaders(token)
    })

    const getMyDataResponse = getMyData.json() as singleUserResponse

    check(getMyData, {
        'myData status is 200': () => getMyData.status === 200,
    });
    check(getMyDataResponse, {
        'contains correct email': () => getMyDataResponse.email === email,
    });
}