import React, { useEffect } from 'react'
import Hammer from 'hammerjs'

const Tinder = () => {
    useEffect(() => {
        const tinderContainer = document.querySelector('.tinder')
        const allCards = document.querySelectorAll('.tinder--card')
        const nope = document.getElementById('nope')
        const love = document.getElementById('love')

        function initCards() {
            const newCards = document.querySelectorAll(
                '.tinder--card:not(.removed)'
            )

            newCards.forEach((card, index) => {
                card.style.zIndex = allCards.length - index
                card.style.transform = `scale(${
                    (20 - index) / 20
                }) translateY(-${30 * index}px)`
                card.style.opacity = (10 - index) / 10
            })

            tinderContainer.classList.add('loaded')
        }

        initCards()

        allCards.forEach((el) => {
            const hammertime = new Hammer(el)

            hammertime.on('pan', (event) => {
                el.classList.add('moving')
            })

            hammertime.on('pan', (event) => {
                if (event.deltaX === 0) return
                if (event.center.x === 0 && event.center.y === 0) return

                tinderContainer.classList.toggle(
                    'tinder_love',
                    event.deltaX > 0
                )
                tinderContainer.classList.toggle(
                    'tinder_nope',
                    event.deltaX < 0
                )

                const xMulti = event.deltaX * 0.03
                const yMulti = event.deltaY / 80
                const rotate = xMulti * yMulti

                event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`
            })

            hammertime.on('panend', (event) => {
                el.classList.remove('moving')
                tinderContainer.classList.remove('tinder_love')
                tinderContainer.classList.remove('tinder_nope')

                const moveOutWidth = document.body.clientWidth
                const keep =
                    Math.abs(event.deltaX) < 80 ||
                    Math.abs(event.velocityX) < 0.5

                event.target.classList.toggle('removed', !keep)

                if (keep) {
                    event.target.style.transform = ''
                } else {
                    const endX = Math.max(
                        Math.abs(event.velocityX) * moveOutWidth,
                        moveOutWidth
                    )
                    const toX = event.deltaX > 0 ? endX : -endX
                    const endY = Math.abs(event.velocityY) * moveOutWidth
                    const toY = event.deltaY > 0 ? endY : -endY
                    const xMulti = event.deltaX * 0.03
                    const yMulti = event.deltaY / 80
                    const rotate = xMulti * yMulti

                    event.target.style.transform = `translate(${toX}px, ${
                        toY + event.deltaY
                    }px) rotate(${rotate}deg)`
                    initCards()
                }
            })
        })

        const createButtonListener = (love) => (event) => {
            const cards = document.querySelectorAll(
                '.tinder--card:not(.removed)'
            )
            const moveOutWidth = document.body.clientWidth * 1.5

            if (!cards.length) return false

            const card = cards[0]

            card.classList.add('removed')

            if (love) {
                card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(-30deg)`
            } else {
                card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(30deg)`
            }

            initCards()

            event.preventDefault()
        }

        const nopeListener = createButtonListener(false)
        const loveListener = createButtonListener(true)

        nope.addEventListener('click', nopeListener)
        love.addEventListener('click', loveListener)

        return () => {
            nope.removeEventListener('click', nopeListener)
            love.removeEventListener('click', loveListener)
        }
    }, [])

    return <div>{/* Your JSX content here */}</div>
}

export default Tinder
