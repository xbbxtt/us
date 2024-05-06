import { useState, useEffect } from 'react'
import { useGendersQuery, useGetAllPotentialLikesQuery, useCreateLikeMutation } from '../app/apiSlice'

export default function RomanticPreferences() {
    const [potentialLikes, setPotentialLikes] = useState([])
    const [genders, setGenders] = useState([])
    const gendersQuery = useGendersQuery()
    const potentialLikesQuery = useGetAllPotentialLikesQuery()
    const [liked, setLiked] = useState('')
    const [createLike] = useCreateLikeMutation()
    const [isLoading, setIsLoading] = useState(false)

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

    async function handleLike(likedUserId) {
        setIsLoading(true)
        try {
            const data = {
                logged_in_user: likedUserId,
                liked_by_user: 1, 
                status: null,
            }
            console.log('Data:', data)
            const response = await createLike(data)
            console.log('Response:', response)
            if (response.data && response.data.id) {
                console.log('Success')
            } else {
                console.log('Error sending like')
            }
        } catch (error) {
            console.error('Catch Error:', error)
        }
        setIsLoading(false)
    }

    return (
        <div>
            <div className="tinder--cards">
                {potentialLikes.map((like) => (
                    <div className="tinder--card" key={like.id}>
                        <img src={like.picture} alt="profile" />
                        <h2>
                            {like.first_name} {like.last_name}
                        </h2>
                        <h3>{like.age}</h3>
                        <h3>
                            {genders.map((gender) => {
                                if (gender.id === like.gender) {
                                    return gender.gender_name
                                }
                                return null
                            })}
                        </h3>
                        <h4>{like.description}</h4>

                        <button onClick={() => handleLike(like.id)}>
                            Like
                        </button>
                        <button>Dislike</button>
                    </div>
                ))}
            </div>
        </div>
    )
}