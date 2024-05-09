import React, { useState, useEffect } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { useGendersQuery, useGetAllPotentialLikesQuery, useCreateLikeMutation } from '../app/apiSlice'
import '../css/swiping.css'

const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
})

const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
        r / 10
    }deg) rotateZ(${r}deg) scale(${s})`

export default function Deck() {
    const [cards, setCards] = useState([])
    const [genders, setGenders] = useState([])
    const gendersQuery = useGendersQuery({})
    const potentialLikesQuery = useGetAllPotentialLikesQuery({})
    const [createLike] = useCreateLikeMutation()
    const [isLoading, setIsLoading] = useState(false)




    useEffect(() => {
        if (gendersQuery.data) {
            setGenders(gendersQuery.data)
        }
    }, [gendersQuery.data])

    useEffect(() => {
        if (potentialLikesQuery.data) {
            setCards(potentialLikesQuery.data)
        }
    }, [potentialLikesQuery.data])

    const [gone, setGone] = useState(() => new Set())

    const [props, api] = useSprings(cards.length, (i) => ({
        ...to(i),
        from: from(i),
    }))

    const bind = useDrag(
        ({
            args: [index],
            down,
            movement: [mx],
            direction: [xDir],
            velocity,
        }) => {
            console.log('direction:', xDir)
            
            const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
            const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right

            // Animation logic
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flies out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            api.start((i) => {
                if (index !== i) return // We're only interested in changing spring-data for the current spring
                return {
                    x,
                    rot,
                    scale,
                    delay: undefined,
                    config: {
                        friction: 50,
                        tension: down ? 800 : isGone ? 200 : 500,
                    },
                }
            })

            // Handle like/dislike
            if (!down && trigger) {
                setGone((prev) => new Set(prev.add(index))) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
                if (dir > .5) {
                    // Only trigger like action if swiping right
                    handleLike(cards[index].id, index) // Swipe right
                }
                // Wait for the animation duration before removing the card from the UI
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.filter((_, i) => i !== index)
                    )
                }, 600)
            }
        }
    )






    async function handleLike(likedUserId, index) {
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
            if ('data' in response && response.data && response.data.id) {
                // Remove the liked card from UI by filtering out the card from the state
                setCards(cards.filter((_, i) => i !== index))
                console.log('Success')
            } else {
                console.log('Error sending like')
            }
        } catch (error) {
            console.error('Catch Error:', error)
        }
        setIsLoading(false)
    }

    async function handleDislike(index) {
        // Remove the disliked card from UI by filtering out the card from the state
        setCards(cards.filter((_, i) => i !== index))
    }


    return (
        <div className="testing" id="testing">
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div
                    className="deck"
                    key={i}
                    style={{
                        x,
                        y,
                        display: gone.has(i) ? 'none' : 'block', // Hide the card if its index is in the gone state
                    }}
                >
                    <animated.div
                        {...bind(i)}
                        style={{
                            transform: interpolate([rot, scale], trans),
                            backgroundImage: `${cards[i].picture_url}`,
                        }}
                    >
                        <div className="cardContent">
                            <img
                                src={cards[i].picture_url}
                                alt="profile"
                                className="rounded max-w-fit items-center justify-center w-full h-64 object-cover object-center"
                            />
                            <h2>{cards[i].first_name}</h2>
                            <p>Age: {cards[i].age}</p>
                            <p>
                                Gender:
                                {genders.map((gender) => {
                                    if (gender.id === cards[i].gender) {
                                        return gender.gender_name
                                    }
                                    return null
                                })}
                            </p>
                            <p>Bio: {cards[i].description}</p>
                            <div className="buttons">
                                <button onClick={() => handleDislike(i)}>
                                    Dislike
                                </button>
                                <button
                                    onClick={() => handleLike(cards[i].id, i)}
                                >
                                    Like
                                </button>
                            </div>
                        </div>
                    </animated.div>
                </animated.div>
            ))}
        </div>
    )
}
