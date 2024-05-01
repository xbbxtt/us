import { useState, useEffect } from 'react'
import { useAuthenticateQuery, useGetAllLikesQuery } from '../app/apiSlice'

export default function GetAllLikes() {
    const { data: user, isLoading } = useAuthenticateQuery()
    const { likesData } = useGetAllLikesQuery()
    console.log(user, isLoading)

    const [likes, setLikes] = useState([])

    const fetchLikes = async () => {
        const url = 'http://localhost:8000/api/likes'
        const response = await fetch(url)

        console.log(response)

        if (response.ok) {
            const data = await response.json()
            console.log(data.likes)
            setLikes(data)
        }
    }

    useEffect(() => {
        fetchLikes()
    }, [])

    // Log the currently signed-in user
    useEffect(() => {
        console.log('Current user:', user)
    }, [user])

    return (
        <div>
            {likes.map((like) => {
                return (
                    <div>
                        <p>{like.id}</p>
                    </div>
                )
            })}
        </div>
    )
}
