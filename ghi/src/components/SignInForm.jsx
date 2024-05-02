import { useState, useEffect } from 'react'
import { useSigninMutation } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'

export default function SignInForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [ signin, signinStatus ] = useSigninMutation()

    useEffect(() => {
         if (signinStatus.isSuccess) navigate('/')
    }, [signinStatus, navigate])


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        signin({username, password})
    }

    return (
        <form className="text-black" onSubmit={handleFormSubmit}>
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
// }
}
