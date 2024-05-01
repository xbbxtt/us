import { useState } from 'react'

function Slider() {
    const [values, setValues] = useState([18, 95])

    const handleChange = (event) => {
        const newValues = [...values]

        if (event.target.dataset.id === 'min') {
            newValues[0] = event.target.value
            newValues[1] = Math.max(newValues[0], newValues[1])
        } else if (event.target.dataset.id === 'max') {
            newValues[1] = event.target.value
            newValues[0] = Math.min(newValues[0], newValues[1])
        }

        setValues(newValues)
    }
    console.log(values)

    return (
        <div>
            <div>
                <h1>What's your age preference?</h1>
                <input
                    type="range"
                    data-id="min"
                    value={values[0]}
                    onChange={handleChange}
                    min="18"
                    max="100"
                />
                <span>{values[0]}</span>
            </div>
            <div>
                <input
                    type="range"
                    data-id="max"
                    value={values[1]}
                    onChange={handleChange}
                    min="18"
                    max="100"
                />
                <span>{values[1]}</span>
            </div>
        </div>
    )
}

export default Slider
