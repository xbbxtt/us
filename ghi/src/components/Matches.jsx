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
        }
    }, [matchData.matches])

    useEffect(() => {
        if (Array.isArray(userData)) {
            setUsers(userData)
        }
    }, [userData])

    if (isLoadingMatches || isLoadingUsers) {
        return <p>Loading...</p>
    }

    if (isErrorMatches || isErrorUsers) {
        return <p>Error loading data. Please try again later.</p>
    }

    function handleBreakup(matchId) {
        const confirmation = window.confirm(
            'Danger! Are you sure you want to break up?'
        )
        if (confirmation) {
            breakUp({ id: matchId })
            const updatedMatches = matches.filter(
                (match) => match.id !== matchId
            )
            setMatches(updatedMatches)
            console.log('Dislike:', matchId)
        } else {
            console.log('Breakup Cancelled')
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.length === 0 ? (
                <p>No matches yet, get to swiping!</p>
            ) : (
                matches.map((match) => (
                    <div
                        key={match.id}
                        className="max-w-sm bg-slate-200 border border-gray-200 rounded-lg shadow-md "
                    >
                        {users.map((user) => {
                            if (user.id === match.logged_in_user) {
                                return (
                                    <div key={`${user.id}-${match.id}`}>
                                        <div>
                                            <h1 className="text-black">
                                                {user.first_name} - {user.age}
                                            </h1>
                                        </div>
                                        <img
                                            src={user.picture_url}
                                            alt={user.first_name}
                                            className="rounded-t-lg m-2"
                                        />
                                        <div>
                                            <p className="text-black">
                                                {user.description}
                                            </p>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() =>
                                                    handleBreakup(match.id)
                                                }
                                                className="flex-1 inline-flex justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-600 focus:outline-none"
                                            >
                                                Break Up
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                ))
            )}
        </div>
    )
}
