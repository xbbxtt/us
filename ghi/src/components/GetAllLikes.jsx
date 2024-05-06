import { useState, useEffect } from 'react'
import { useGetAllLikesQuery, useGetAllUsersQuery, useAcceptLikeMutation } from '../app/apiSlice'

export default function GetAllLikes() {
    const [likes, setLikes] = useState([])
    const [users, setUsers] = useState([])
    const allLikes = useGetAllLikesQuery()
    const allUsers = useGetAllUsersQuery()

    useEffect(() => {
        if (allLikes.data) {
            setLikes(allLikes.data.likes)
        }
    }, [allLikes.data])

    useEffect(() => {
        if (allUsers.data) {
            setUsers(allUsers)
        }
    }, [allUsers.data])

    function filterUsers() {
        if (likes.length === 0 || users.length === 0) {
            return []
        }

        const standingLikes = allLikes.data.likes
        const standingUsers = allUsers.data
        const likedUserIds = standingLikes.map((like) => like.liked_by_user)
        const filteredUsers = standingUsers.filter((user) =>
            likedUserIds.includes(user.id)
        )

        return filteredUsers
    }

    async function acceptLike(likedUserId) {
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

    const filteredUsers = filterUsers()

    return (
        <div>
            {filteredUsers.length === 0 ? (
                <p>No likes yet, get to swiping!</p>
            ) : (
                <div>
                    {filteredUsers.map((user) => (
                        <div key={user.id}>
                            <p>
                                {user.id} - {user.username}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
