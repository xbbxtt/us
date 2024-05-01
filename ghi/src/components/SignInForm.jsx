import { useState } from 'react'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const data = {}
        data.username = username
        data.password = password

        const url = 'http://localhost:8000/api/auth/signin'
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
        } else {
            console.log('Failed to sign in')
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="username"
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
            <button type="submit">Sign In!</button>
        </form>
    )
}
