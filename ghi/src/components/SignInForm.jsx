import { useState, useEffect } from 'react'
import { useSigninMutation } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [signin, signinStatus] = useSigninMutation()

    useEffect(() => {
        if (signinStatus.isSuccess) navigate('/')
    }, [signinStatus, navigate])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        signin({ username, password })
    }

    return (
        <form
            className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleFormSubmit}
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    autoComplete='username'
                />
            </div>
            <div className="mb-6">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    autoComplete='current-password'
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign In
                </button>
            </div>
        </form>
    )
}
