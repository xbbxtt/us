import { useState, useEffect } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import {
    useGendersQuery,
    useGetAllPotentialLikesQuery,
    useCreateLikeMutation,
} from '../app/apiSlice'
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

            const trigger = velocity > 0.2
            const dir = xDir < 0 ? -1 : 1

            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
            const scale = down ? 1.1 : 1
            api.start((i) => {
                if (index !== i) return
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

            if (!down && trigger) {
                setGone((prev) => new Set(prev.add(index)))
                if (dir > 0.5) {
                    handleLike(cards[index].id, index)
                }
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

            const response = await createLike(data)

            if ('data' in response && response.data && response.data.id) {
                setCards(cards.filter((_, i) => i !== index))
            }
        } catch (error) {
            console.error('Catch Error:', error)
        }
        setIsLoading(false)
    }

    async function handleDislike(index) {

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
                        display: gone.has(i) ? 'none' : 'block',
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
                            <div className="info--card">
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
                                    <button
                                        className="dislike"
                                        onClick={() => handleDislike(i)}
                                    >
                                        Dislike 💔
                                    </button>
                                    <button
                                        className="like"
                                        onClick={() =>
                                            handleLike(cards[i].id, i)
                                        }
                                    >
                                        Like ❤️
                                    </button>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                </animated.div>
            ))}
        </div>
    )
}
