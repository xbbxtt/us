import { useState, useEffect } from 'react'

export default function Matches() {
    const [likes, setLikes] = useState([])
    const [users, setUsers] = useState([])

    const fetchLikes = async () => {
        const url = 'http://localhost:8000/api/likes'
        const response = await fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            const data = await response.json()
            setLikes(data.likes)
        }
    }

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
        fetchLikes()
        fetchUsers()
    }, [])

    function filterUsers() {
        if (likes.length === 0 || users.length === 0) {
            return []
        }

        const likedUserIds = likes.map((like) => like.liked_by_user)
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
                            <h2>{user.first_name}</h2>
                            <h2>{user.last_name}</h2>
                            <p>{user.picture_url}</p>
                            <p>{user.bio}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
