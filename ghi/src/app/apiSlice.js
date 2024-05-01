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
            providesTags: ['User'],
        }),
        // signout: builder.mutation({
        //     query: () => ({
        //         url: '/api/auth/signout/',
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['User'],
        // }),
        signin: builder.mutation({
            query: (body) => ({
                url: '/api/auth/signin/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const { useAuthenticateQuery, useSigninMutation } = usApi
