import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import RomanticPref from './components/RomPreference'
import App from './App'
import GetAllLikes from './components/GetAllLikes.jsx'
import RomanticPreferences from './components/Swiping'
import Matches from './components/Matches'
import Deck from './components/Deck'

import { store } from './app/store.js'

import './index.css'
import Construct from './components/Construct'

const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Construct />,
                },
                {
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'romantic-pref',
                    element: <RomanticPref />,
                },
                {
                    path: 'likes',
                    element: <GetAllLikes />,
                },
                {
                    path: 'romantic-preferences',
                    element: <RomanticPreferences />,
                },
                {
                    path: 'matches',
                    element: <Matches />,
                },
                {
                    path: 'construct',
                    element: <Deck />,
                }
            ],
        },
    ],
    {
        basename: BASE_URL,
    }
)

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

// Log out the environment variables while you are developing and deploying
// This will help debug things
console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
