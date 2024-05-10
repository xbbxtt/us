import { useState, useEffect } from 'react'
import Slider from './ReactSlider'
import { useRomPrefMutation, useGendersQuery } from '../app/apiSlice'
import { useNavigate } from 'react-router-dom'

export default function RomanticPref() {
    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [genderPref, setGenderPref] = useState('')
    const [genders, setGenders] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [updatePost, result] = useRomPrefMutation()
    const navigate = useNavigate()

    const gendersQuery = useGendersQuery()

    const handleChange = (newValues) => {
        setMinAge(newValues[0])
        setMaxAge(newValues[1])
    }

    const updateSliderValues = (newValues) => {
        setMinAge(newValues[0])
        setMaxAge(newValues[1])
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        const data = {
            user1_id: 1,
            min_age: parseInt(minAge),
            max_age: parseInt(maxAge),
            gender_id: parseInt(genderPref),
        }

        setIsLoading(true)
        try {
            const response = await updatePost(data)
            if (response.data && response.data.id) {
                navigate('/romantic-preferences')
            }
        } catch (error) {
            console.error('Catch Error:', error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (gendersQuery.data) {
            setGenders(gendersQuery.data)
        }
    }, [gendersQuery.data])

    return (
        <form
            className="text-black bg-gray-100 m-auto p-6 rounded-md w-96"
            onSubmit={handleFormSubmit}
        >
            <div>
                <Slider
                    updateSliderValues={updateSliderValues}
                    onChange={handleChange}
                />{' '}
            </div>
            <select
                value={genderPref}
                onChange={(e) => setGenderPref(e.target.value)}
                className="block w-full mt-4 border border-gray-300 rounded-md p-3 text-lg"
            >
                <option value="">Select your gender preference</option>
                <option value="4">Show Everyone</option>
                {genders.length > 0 &&
                    genders.map((gender) => {
                        return (
                            <option key={gender.id} value={gender.id}>
                                {gender.gender_name}
                            </option>
                        )
                    })}
            </select>
            <button
                type="submit"
                onClick={handleFormSubmit}
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md text-lg"
            >
                Submit
            </button>
        </form>
    )
}
