import { useState, useEffect } from 'react'
import {
    useGendersQuery,
    useGetAllPotentialLikesQuery,
    useCreateLikeMutation,
} from '../app/apiSlice'
import '../css/cards.css'
// import '../js/swiping.js'

export default function RomanticPreferences() {
    const [potentialLikes, setPotentialLikes] = useState([])
    const [genders, setGenders] = useState([])
    const gendersQuery = useGendersQuery()
    const potentialLikesQuery = useGetAllPotentialLikesQuery()
    const [createLike] = useCreateLikeMutation()
    const [isLoading, setIsLoading] = useState(false)

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
            const response = await createLike(data)
            if (response.data && response.data.id) {
                setPotentialLikes(
                    potentialLikes.filter((like) => like.id !== likedUserId)
                )
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
                        <img
                            src={like.picture_url}
                            alt={like.username}
                            className="rounded-t-lg"
                        />
                        <h3 className="">
                            {like.first_name} - {like.age}
                        </h3>
                        <h4>
                            {genders.map((gender) => {
                                if (gender.id === like.gender) {
                                    return gender.gender_name
                                }
                                return null
                            })}
                        </h4>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {like.description}
                        </p>
                        <div className="tinder--buttons">
                            <button
                                id="love"
                                className="fa fa-heart"
                                onClick={() => handleLike(like.id)}
                            >
                                Like
                            </button>
                            <button id="nope" className="fa fa-remove">
                                Dislike
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
