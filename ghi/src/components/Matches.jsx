import { useState, useEffect } from 'react'
import { useGetAllMatchesQuery, useGetAllUsersQuery } from '../app/apiSlice'
import { useBreakUpMutation } from '../app/apiSlice'

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

    const [breakUp] = useBreakUpMutation()

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

    usseEf

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

    if (isLoadingMatches || isLoadingUsers) {
        return <p>Loading...</p>
    }

    if (isErrorMatches || isErrorUsers) {
        return <p>Error loading data. Please try again later.</p>
    }

    const likedByUsers = getLikedByUsers()

    function handleDislike(matchesId) {
        console.log('Dislike:', matchesId)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.length === 0 ? (
                <p>No matches yet, get to swiping!</p>
            ) : (
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    {likedByUsers.map((user) => (
                        <div key={user.id}>
                            <h2>
                                {user.first_name} - {user.age}
                            </h2>
                            <img
                                src={user.picture_url}
                                alt={user.first_name}
                                className="rounded-t-lg"
                            />
                        </div>
                    ))}
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleDislike(matches.id)}
                            className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                        >
                            Break Up
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
