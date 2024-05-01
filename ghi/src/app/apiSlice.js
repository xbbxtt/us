import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usApi = createApi({
    reducerPath: 'usApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    endpoints: (builder) => ({
        getAllLikes: builder.query({
            query: () => ({
                url: '/api/likes',
                credentials: 'include'
            }),
        }),

        authenticate: builder.query({
            query: () => ({
                url: '/api/auth/authenticate',
                credentials: 'include'
            }),
            providesTags: ["User"]
        }),

        signout: builder.mutation({
            query: () => ({
                url: '/api/auth/signout',
                method: 'DELETE',
            }),
            invalidatesTags: ["User"]
        }),

        signin: builder.mutation({
            query: (body) => ({
                url: '/api/auth/signin',
                method: 'POST',
                credentials: 'include',
            })
        })
    }),
})

export const {
    useAuthenticateQuery,
    useGetAllLikesQuery,
    useSignoutMutation,
    useSigninMutation,
} = usApi