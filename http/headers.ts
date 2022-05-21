const json = 'application/json'

export const jsonHeaders = {
    'Accept': json,
    'Content-Type': json
}

export const jsonAuthHeaders = (token: string) => {
    return {
        'Accept': json,
        'Content-Type': json,
        'Authorization': `Bearer ${token}`
    }
}
