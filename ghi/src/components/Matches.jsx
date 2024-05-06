import { useState, useEffect } from 'react'
import { useGetAllMatchesQuery, useGetAllUsersQuery } from '../app/apiSlice'

export default function Matches() {

    const {
        data: matchData = {},
        isLoading: isLoadingMatches,
        isError: isErrorMatches,
    } = useGetAllMatchesQuery()
    const [matches, setMatches] = useState([])


    const {
        data: userData = [],
        isLoading: isLoadingUsers,
        isError: isErrorUsers,
    } = useGetAllUsersQuery()
    const [users, setUsers] = useState([])


    useEffect(() => {
        if (Array.isArray(matchData.matches)) {
            setMatches(matchData.matches)
        } else {
            setMatches([])
        }
    }, [matchData])


    useEffect(() => {
        if (Array.isArray(userData)) {
            setUsers(userData)
        } else {
            setUsers([])
        }
    }, [userData])


    console.log('users:', users)
    console.log('matches:', matches)


    function getLikedByUsers() {
        if (matches.length === 0 || users.length === 0) {
            return []
        }

        const likedUserIds = matches.map((match) => match.logged_in_user)
        const filteredUsers = users.filter((user) =>
            likedUserIds.includes(user.id)
        )

        return filteredUsers
    }

    const likedByUsers = getLikedByUsers()
    console.log(likedByUsers)



    if (isLoadingMatches || isLoadingUsers) {
        return <p>Loading...</p>
    }

    if (isErrorMatches || isErrorUsers) {
        return <p>Error loading data. Please try again later.</p>
    }

    return (
        <div>
            {matches.length === 0 ? (
                <p>No matches yet, get to swiping!</p>
            ) : (
                <div>
                    {likedByUsers.map((user) => (
                        <div key={user.id}>
                            <h2>{user.username}</h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
