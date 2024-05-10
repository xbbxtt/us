import { useState, useEffect } from 'react'
import {
    useGetAllLikesQuery,
    useGetAllUsersQuery,
    useUpdateLikeMutation,
} from '../app/apiSlice'

export default function GetAllLikes() {
    const [likes, setLikes] = useState([])
    const [users, setUsers] = useState([])
    const allLikes = useGetAllLikesQuery()
    const allUsers = useGetAllUsersQuery()
    const [updateLike, updateLikeStatus] = useUpdateLikeMutation()

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

    function acceptLike(loggedInUser, likedByUser, likeId) {
            const body = {
                logged_in_user: loggedInUser,
                liked_by_user: likedByUser,
                status: true,
            }
            updateLike({ id: likeId, body })
            const updatedLikes = likes.filter((like) => like.id !== likeId)
            setLikes(updatedLikes)
    }

    function declineLike(loggedInUser, likedByUser, likeId) {
            const body = {
                logged_in_user: loggedInUser,
                liked_by_user: likedByUser,
                status: false,
            }
        updateLike({ id: likeId, body })
        const updatedLikes = likes.filter((like) => like.id !== likeId)
        setLikes(updatedLikes)
    }

    const filteredUsers = filterUsers()

    return (
        <div>
            {filteredUsers.length === 0 ? (
                <p>No likes yet, get to swiping!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {likes.map((like) =>
                        filteredUsers.map((currentUser) => {
                            if (currentUser.id === like.liked_by_user) {
                                return (
                                    <div
                                        key={currentUser.id}
                                        className="max-w-sm bg-slate-200 border border-gray-200 rounded-lg shadow-md m-3 py-3 px-3 flex flex-col justify-between"
                                    >
                                        <div>
                                            <img
                                                className="rounded-t-lg max-w-fit items-center justify-center w-full h-64 object-cover object-center"
                                                src={currentUser.picture_url}
                                                alt={currentUser.username}
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {currentUser.first_name} -{' '}
                                                {currentUser.age}
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                {currentUser.description}
                                            </p>
                                            <div className="flex space-x-4">
                                                <button
                                                    onClick={() =>
                                                        acceptLike(
                                                            like.logged_in_user,
                                                            currentUser.id,
                                                            like.id
                                                        )
                                                    }
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg text-center bg-pink-500 hover:bg-pink-600 text-white focus:outline-none"
                                                >
                                                    Like
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        declineLike(
                                                            like.logged_in_user,
                                                            currentUser.id,
                                                            like.id
                                                        )
                                                    }
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                                                >
                                                    Dislike
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })
                    )}
                </div>
            )}
        </div>
    )
}
