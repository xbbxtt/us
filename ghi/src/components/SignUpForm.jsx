import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const [values, setValues] = useState([18, 100])

    const handleChange = (newValues) => {
        setValues(newValues)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        const data = {}

        data.username = username
        data.password = password
        data.first_name = first_name
        data.last_name = last_name
        data.location = location
        data.gender = parseInt(gender)
        data.age = parseInt(age)
        data.description = description
        data.picture_url = picture_url

        console.log(data)

        const url = 'http://localhost:8000/api/auth/signup/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig)
        const responseData = await response.json()
        console.log(responseData)

        if (response.ok) {
            setUsername('')
            setPassword('')
            setFirst_name('')
            setLast_name('')
            setLocation('')
            setGender('')
            setAge('')
            setDescription('')
            setPicture_url('')
        }
    }

    const getGender = async () => {
        const url = 'http://localhost:8000/api/genders/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setGenders(data)
        }
    }

    useEffect(() => {
        getGender()
        handleChange()
    }, [])

    return (
        <form className="text-black" onSubmit={handleFormSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                className="mx-2"
            />
            <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="mx-2"
            />
            <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                placeholder="First Name"
                className="mx-2"
            />
            <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                placeholder="Last Name"
                className="mx-2"
            />
            <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Your Location"
                className="mx-2"
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select your gender</option>
                {genders.length > 0 &&
                    genders.map((gender) => {
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
                className="mx-2"
            />
            <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe Yourself"
                className="mx-2"
            />
            <input
                type="url"
                name="picture_url"
                value={picture_url}
                onChange={(e) => setPicture_url(e.target.value)}
                placeholder="Enter Picture URL"
                className="mx-2"
            />
            <button type="submit">Sign Up!</button>
        </form>
    )
}
