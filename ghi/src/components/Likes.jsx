import { useState, useEffect } from 'react'

export default function RomanticPreferences() {
  const [potentialLikes, setPotentialLikes] = useState([])


  // fetch users by preferences according to the user that is logged in

  const fetchPotentialLikes = async () => {
    const url = 'http://localhost:8000/api/auth/preferences/'
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    if (response.ok) {
      const data = await response.json()
      setPotentialLikes(data)
      console.log(data)
    }
  }


  useEffect(() => {
    fetchPotentialLikes()
  }
  , [])



    return (
        <div>
            <h1>Get to swiping!</h1>
            <ul>
                {potentialLikes.map((like) => (
                    <li key={like.id}>
                        <p>{like.username}</p>
                        <p>{like.description}</p>
                        <p>{like.age}</p>
                        <p>{like.gender}</p>
                        <p>{like.first_name}</p>
                        <p>{like.last_name}</p>
                    </li>
                ))}
            </ul>
        </div>

  );
}
