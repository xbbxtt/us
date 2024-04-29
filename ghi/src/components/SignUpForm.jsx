import { useState } from 'react'

export default function SignInForm() {
    const [genders, setGenders] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [location, setLocation] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [picture_url, setPicture_url] = useState('')

    async function handleFormSubmit(e) {
        e.preventDefault()
        await signup({ username, password })
    }

    const getGender = async () => {
        const url = 'https://localhost:8000/api/genders'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setGenders(data.genders)
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
            <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                placeholder="First Name"
            />
            <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                placeholder="Last Name"
            />
            <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Your Location"
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select your gender</option>
                {genders.map((gender) => {
                    return (
                        <option key={gender.id} value={gender.id}>
                            {gender.gender_name}
                        </option>
                    )
                })}
            </select>

            <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe of Yourself"
            />
            <input
                type="url"
                name="picture_url"
                value={picture_url}
                onChange={(e) => setPicture_url(e.target.value)}
                placeholder="Enter Picture URL"
            />
            <button type="submit">Sign Up!</button>
        </form>
    )
}
