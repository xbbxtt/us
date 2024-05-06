import { useState, useEffect } from 'react'
import { useGetAllLikesQuery } from '../app/apiSlice'

export default function GetAllLikes() {
    const [likes, setLikes] = useState([])
    const [users, setUsers] = useState([])




    const fetchUsers = async () => {
        const url = 'http://localhost:8000/api/auth/users'
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            const data = await response.json()
            setUsers(data)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (allLikes.data) {
            setLikes(allLikes.data)
        }
    }, [allLikes.data])



    function filterUsers() {
        if (likes.length === 0 || users.length === 0) {
            return []
        }

        const likedUserIds = allLikes.map((like) => like.liked_by_user)
        const filteredUsers = users.filter((user) =>
            likedUserIds.includes(user.id)
        )

        return filteredUsers
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
