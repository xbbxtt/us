import { useState, useEffect } from 'react'
import { useGendersQuery, useGetAllPotentialLikesQuery, useCreateLikeMutation } from '../app/apiSlice'

export default function RomanticPreferences() {
    const [potentialLikes, setPotentialLikes] = useState([])
    const [genders, setGenders] = useState([])
    const gendersQuery = useGendersQuery()
    const potentialLikesQuery = useGetAllPotentialLikesQuery()
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {potentialLikes.map((like) => (
                    <div
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                        key={like.id}
                    >
                        <img
                            src={like.picture}
                            alt={like.username}
                            className="rounded-t-lg"
                        />
                        <div className="p-5">
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {like.first_name} - {like.age}
                            </h2>
                            <h3>
                                {genders.map((gender) => {
                                    if (gender.id === like.gender) {
                                        return gender.gender_name
                                    }
                                    return null
                                })}
                            </h3>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {like.description}
                            </p>

                            <button
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
                                onClick={() => handleLike(like.id)}
                            >
                                Like
                            </button>
                            <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none">
                                Dislike
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

