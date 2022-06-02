import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { refreshHeaders } from "../http/headers";

export const getRefreshToken = (token: string) => {
    const getRefreshToken = http.get(`${baseUrl}/users/refresh`, {
        headers: refreshHeaders(token)
    })

    const getRefreshTokenResponse = getRefreshToken.body as string
    console.log(getRefreshTokenResponse)

    check(getRefreshToken, {
        'refresh token status is 200': () => getRefreshToken.status === 200,
    });
    check(getRefreshTokenResponse, {
        'refresh token returned': () => getRefreshTokenResponse !== "",
    });

    return getRefreshTokenResponse
}