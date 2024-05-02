import { useState, useEffect } from 'react'
import Slider from './ReactSlider'
import { useRomPrefMutation } from '../app/apiSlice'

export default function RomanticPref() {
    let defaultMinAge = 18
    let defaultMaxAge = 100

    const RomanticPref = useRomPrefMutation()

    const [minAge, setMinAge] = useState('')
    const [maxAge, setMaxAge] = useState('')
    const [genderPref, setGenderPref] = useState('')
    const [genders, setGenders] = useState([])

    const handleChange = (newValues) => {
        setValues(newValues)
        setMinAge(newValues[0])
        setMaxAge(newValues[1])
    }

    const updateSliderValues = (newValues) => {
        setMinAge(newValues[0])
        setMaxAge(newValues[1])
    }

    async function handleFormSubmit(e) {
        e.preventDefault()

        const data = {}
        data.user1_id = 1
        data.min_age = parseInt(minAge)
        data.max_age = parseInt(maxAge)
        data.gender_id = parseInt(genderPref)

        console.log(data)



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
    }, [])

    return (
        <form className="text-black" onSubmit={handleFormSubmit}>
            <div>
                <Slider
                    updateSliderValues={updateSliderValues}
                    onChange={handleChange}
                />{' '}
            </div>

            <select
                value={genderPref}
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
            <button type="submit" onClick={handleFormSubmit}>
                Submit
            </button>
        </form>
    )
} }
