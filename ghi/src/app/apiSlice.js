import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usApi = createApi({
    reducerPath: 'usApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        authenticate: builder.query({
            query: () => ({
                url: '/api/auth/authenticate',
            }),
            providesTags: ['User'],
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: '/api/auth/signup/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/api/auth/signout/',
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        signin: builder.mutation({
            query: (body) => ({
                url: '/api/auth/signin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        getAllLikes: builder.query({
            query: () => ({
                url: '/api/likes',
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/api/auth/users',
            }),
        }),
        getAllMatches: builder.query({
            query: () => ({
                url: '/api/auth/matches',
            }),
        }),
        romPref: builder.mutation({
            query: (body) => ({
                url: '/api/preferences/',
                method: 'POST',
                body,
            }),
        }),
        genders: builder.query({
            query: (body) => ({
                url: '/api/genders/',
            }),
        }),
        getAllPotentialLikes: builder.query({
            query: () => ({
                url: '/api/auth/preferences',
            }),
        }),
        createLike: builder.mutation({
            query: (body) => ({
                url: '/api/likes',
                method: 'POST',
                body
            }),
        }),
    }),
})

export const {
    useAuthenticateQuery,
    useSigninMutation,
    useGetAllLikesQuery,
    useRomPrefMutation,
    useSignoutMutation,
    useSignupMutation,
    useGendersQuery,
    useGetAllUsersQuery,
    useGetAllMatchesQuery,
    useGetAllPotentialLikesQuery,
    useCreateLikeMutation,
} = usApi
