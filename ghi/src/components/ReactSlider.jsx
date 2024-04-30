import React, { useState } from 'react'
// import Slider from 'react-input-slider'

function Slider() {
    const [value, setValue] = useState(50)

    const [values, setValues] = useState(100)

    return (
        <div>
            <div>
                {/* slider min age */}
                <h1>Slider</h1>
                <input
                    type="range"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    min="18"
                    max="100"
                />
                <span>{value}</span>
            </div>
            {/* slider max age */}
            <div>
                <input
                    type="range"
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                    min="18"
                    max="100"
                />
                <span>{values}</span>
            </div>
        </div>
    )
}

export default Slider
