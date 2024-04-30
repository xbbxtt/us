import { useState, useEffect } from 'react'

export default function RomanticPreferences() {
    const [users, setUsers] = useState([])

// get all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/auth/preferences/"
                );
                if (!response.ok) throw new Error("Try lowering your standards!");
                const data = await response.json();
                setUsers(data.users);
            }
        }
    })



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
