import React, { useEffect, useState } from 'react'

const Keypad = ({ usedKeys }) => {

    const [letters, setLetters] = useState(null)
    useEffect(() => {
        async function fetchKeys() {
            const url = await fetch("http://localhost:3001/letters")
            const res = await url.json()
            setLetters(res)
        }
        fetchKeys()
    }, [])

    return (
        <div className="keypad">
            {letters && letters.map(l => {

                const color = usedKeys[l.key]
 
                return (
                    <div key={l.key} className={color} >{l.key}</div>
                )
            })}
        </div>
    )
}

export default Keypad