import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { useEffect } from 'react'
import { useGendersQuery,
    useGetAllPotentialLikesQuery } from '../app/apiSlice'

import styles from '../css/styles.module.css'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
        r / 10
    }deg) rotateZ(${r}deg) scale(${s})`

export default function Deck() {
    const [cards, setCards] = useState([])
    const potentialLikes = useGetAllPotentialLikesQuery({})
    const [genders, setGenders] = useState([])
    const gendersQuery = useGendersQuery({}) // Pass an empty object as the second argument

    console.log(genders)

    useEffect(() => {
        if (gendersQuery.data) {
            setGenders(gendersQuery.data)
        }
    }, [gendersQuery.data])



    useEffect(() => {
        if (potentialLikes.data) {
            setCards(potentialLikes.data)
        }
    }, [potentialLikes.data])

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
            if (!down && trigger) setGone((prev) => new Set(prev.add(index)))
            api.start((i) => {
                if (index !== i) return
                const isGone = gone.has(index)
                const x = isGone
                    ? (200 + window.innerWidth) * dir
                    : down
                    ? mx
                    : 0
                const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
                const scale = down ? 1.1 : 1
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
            if (!down && gone.size === cards.length)
                setTimeout(() => {
                    setGone(new Set())
                    api.start((i) => to(i))
                }, 600)
        }
    )

    const handleLike = (index, liked) => {
        // Handle like/dislike logic here
        console.log(`Card ${index} liked: ${liked}`)
    }

    return (
        <>
            <div className="testing" id="testing">
                {props.map(({ x, y, rot, scale }, i) => (
                    <animated.div
                        className={styles.deck}
                        id={styles.deck}
                        key={i}
                        style={{ x, y }}
                    >
                        <animated.div
                            {...bind(i)}
                            style={{
                                transform: interpolate([rot, scale], trans),
                                backgroundImage: `${cards[i].picture_url}`,
                            }}
                        >
                            <div className={styles.cardContent}>
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
                                <div className={styles.buttons}>
                                    <button onClick={() => handleLike(i, true)}>
                                        Like
                                    </button>
                                    <button
                                        onClick={() => handleLike(i, false)}
                                    >
                                        Dislike
                                    </button>
                                </div>
                            </div>
                        </animated.div>
                    </animated.div>
                ))}
            </div>
        </>
    )
}
