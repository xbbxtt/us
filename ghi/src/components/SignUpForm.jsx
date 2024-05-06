import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation, useSigninMutation } from '../app/apiSlice'

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
    const navigate = useNavigate()
    const [signup, signupStatus] = useSignupMutation()
    const [signin, signinStatus] = useSigninMutation()

    const [values, setValues] = useState([18, 100])

    const handleChange = (newValues) => {
        setValues(newValues)
    }

    async function handleFormSubmit(e) {
        console.log('**********************')
        e.preventDefault()
        signup({
            username,
            password,
            first_name,
            last_name,
            location,
            gender,
            age,
            description,
            picture_url,
        })
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
        if (signupStatus.isSuccess) {
            console.log('success')
            signin({ username, password })
            navigate('/romantic-pref')
        }
    }, [signupStatus, navigate])

    return (
        <div className="flex mx-2 border border-gray-300 rounded-md px-3 py-4">
            <form
                className="text-black flex flex-wrap"
                onSubmit={handleFormSubmit}
            >
                <div className="w-full md:w-1/2 py-3 px-3">
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        className="mx-2  border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                        placeholder="First Name"
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        placeholder="Last Name"
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter Your Location"
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                </div>
                <div className="w-full md:w-1/2 py-3 px-3">
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    >
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
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe Yourself"
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                    <input
                        type="url"
                        name="picture_url"
                        value={picture_url}
                        onChange={(e) => setPicture_url(e.target.value)}
                        placeholder="Enter Picture URL"
                        className="mx-2 border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                >
                    Sign Up!
                </button>
            </form>
        </div>
    )
}
