const json = "application/json"

export const jsonHeaders = {
    'Accept': json,
    'Content-Type': json
}

export const authHeaders = (token: string) => {
    return {
        ...jsonHeaders,
        'Authorization': `Bearer ${token}`
    }
}

export const refreshHeaders = (token: string) => {
    return {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`
    }
}