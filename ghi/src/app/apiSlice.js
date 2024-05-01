import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usApi = createApi({
    reducerPath: 'usApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        authenticate: builder.query({
            query: () => ({
                url: '/api/auth/authenticate/',
            }),
            providesTags: ["User"]
        }),
    }),
})

export const { useAuthenticateQuery } = usApi
