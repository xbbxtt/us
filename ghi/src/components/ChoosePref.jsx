import { useState, useEffect } from 'react'
import Slider from './ReactSlider'

export default function ChoosePref() {
    const [minAge, setMinAge] = useState()
    const [maxAge, setMaxAge] = useState
    const [genderPref, setGenderPref] = useState()
    const [values, setValues] = useState([18, 100])

    const handleChange = (newValues) => {
        setValues(newValues)
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        const data = {}

        data.min_age = minAge
        data.max_age = maxAge
        data.genderPref = genderPref
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/api/auth/preferences/'
                )
                if (!response.ok)
                    throw new Error('Try lowering your standards!')
                const data = await response.json()
                setUsers(data.users)
            } catch (error) {
                console.log(error)
            }

            const response = await fetch(url, fetchConfig)
            const responseData = await response.json()
            if (response.ok) {
                setMinAge('')
                setMaxAge('')
                setGenderPref('')
            }
        }

        fetchUsers()
    }, [])

    return (
        <form className="text-black" onSubmit={handleFormSubmit}>
            <div>
                <Slider values={values} onChange={handleChange} />
            </div>

            <select
                value={gender}
                onChange={(e) => setGenderPref(e.target.value)}
            >
                <option value="">Select your gender preference</option>
                {genders.length > 0 &&
                    genders.map((gender) => {
                        return (
                            <option key={gender.id} value={gender.id}>
                                {gender.gender_name}
                            </option>
                        )
                    })}
            </select>
        </form>
    )
}
