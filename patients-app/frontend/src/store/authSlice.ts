import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    token: string | null
    role: 'admin' | 'user' | null
}

const initialState: AuthState = {
    token: null,
    role: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string; role: 'admin' | 'user' }>) => {
            state.token = action.payload.token
            state.role = action.payload.role
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('role', action.payload.role)
        },
        logout: (state) => {
            state.token = null
            state.role = null
            localStorage.removeItem('token')
            localStorage.removeItem('role')
        },
    },
})

export const { setCredentials, logout } = authSlice.actions
export const authReducer = authSlice.reducer
