import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { patientsApi } from './patientsApi'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [patientsApi.reducerPath]: patientsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(patientsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
