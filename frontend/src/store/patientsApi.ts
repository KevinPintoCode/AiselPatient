import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Patient } from '../types'

export const patientsApi = createApi({
    reducerPath: 'patientsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL, // ✅ now dynamic
        prepareHeaders: (headers) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token')
                if (token) headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Patients'],
    endpoints: (builder) => ({
        getPatients: builder.query<Patient[], void>({
            query: () => '/patients',
            providesTags: ['Patients'],
        }),
        addPatient: builder.mutation<void, Partial<Patient>>({
            query: (body) => ({
                url: '/patients',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Patients'],
        }),
        updatePatient: builder.mutation<void, { id: number; data: Partial<Patient> }>({
            query: ({ id, data }) => ({
                url: `/patients/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Patients'],
        }),
        deletePatient: builder.mutation<void, number>({
            query: (id) => ({
                url: `/patients/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Patients'],
        }),
    }),
})

export const {
    useGetPatientsQuery,
    useAddPatientMutation,
    useUpdatePatientMutation,
    useDeletePatientMutation,
} = patientsApi
