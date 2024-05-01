import { configureStore } from '@reduxjs/toolkit'
import { usApi } from './apiSlice'
export const store = configureStore({
    reducer: {
        [usApi.reducerPath]: usApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usApi.middleware),
})
