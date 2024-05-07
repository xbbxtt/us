import { useState, useEffect } from 'react'
import { useGetAllLikesQuery, useGetAllUsersQuery, useUpdateLikeMutation } from '../app/apiSlice'

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
        console.log(standingUsers)


        const likedUserIds = standingLikes.map((like) => like.liked_by_user)
        const filteredUsers = standingUsers.filter((user) =>
            likedUserIds.includes(user.id)

        )

        return filteredUsers
    }

    async function acceptLike(likeId) {
        try {
            const data = {
                logged_in_user: 5,
                liked_by_user: 6,
                status: true,
            }
            console.log('Data:', data)
            console.log(likeId)
            const response = await updateLike({id: 1, body: data})
            console.log(updateLikeStatus.isSuccess)
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
    console.log(filteredUsers)

    for (let user in filteredUsers) {
        // console.log(user.picture_url)
    }



   return (
  <div>
    {filteredUsers.length === 0 ? (
      <p>No likes yet, get to swiping!</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {likes.map((like) => (
          filteredUsers.map((currentUser) => {
            if (currentUser.id === like.liked_by_user) {
              return (
                <div
                  key={currentUser.id}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg"
                      src={currentUser.picture_url}
                      alt={currentUser.username}
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {currentUser.first_name} - {currentUser.age}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {currentUser.description}
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => acceptLike(like.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
                      >
                        Like
                      </button>
                      <button
                        onClick={() => handleDislike(like.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                      >
                        Dislike
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        ))}
      </div>
    )}
  </div>
);
}
