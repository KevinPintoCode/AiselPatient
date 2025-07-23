export function getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null
}

export function getRole(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('role') : null
}
