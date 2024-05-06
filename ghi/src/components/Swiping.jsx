import { useState, useEffect } from 'react'
import { useGendersQuery, useGetAllPotentialLikesQuery } from '../app/apiSlice'

export default function RomanticPreferences() {
    const [potentialLikes, setPotentialLikes] = useState([])
    const [genders, setGenders] = useState([])
    const gendersQuery = useGendersQuery()
    const potentialLikesQuery = useGetAllPotentialLikesQuery()
    console.log(potentialLikesQuery.data)

    // fetch users by preferences according to the user that is logged in

    useEffect(() => {
        if (gendersQuery.data) {
            setGenders(gendersQuery.data)
        }
    }, [gendersQuery.data])

    useEffect(() => {
        if (potentialLikesQuery.data) {
            setPotentialLikes(potentialLikesQuery.data)
        }
    }, [potentialLikesQuery.data])

    return (
        <div>
            <h1>Get to swiping!</h1>
            <ul>
                {potentialLikes.map((like) => (
                    <li key={like.id}>
                        <p>{like.username}</p>
                        <p>{like.description}</p>
                        <p>{like.age}</p>
                        <p>
                            {genders.map((gender) => {
                                if (gender.id === like.gender) {
                                    return gender.gender_name
                                }
                                return null
                            })}
                        </p>
                        <p>{like.first_name}</p>
                        <p>{like.last_name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
