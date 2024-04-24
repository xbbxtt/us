// @ts-check
import { useState } from 'react'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleFormSubmit(e) {
        e.preventDefault()
        await signup({ username, password })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                // name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
            />
            <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}
