import { useState } from "react"

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([...Array(6)]) //Each Guess is an array 
    const [history, setHistory] = useState([]) //Each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)

    // User Guesses
    const formatGuess = () => {
        let solutionArray = [...solution]

        /* 
            - Store each letter as an object in an array 
            - FormattedGuess is an user input
        */
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: "grey" }
        })

        // Assign green color 
        formattedGuess.forEach((l, i) => {

            // console.log("SL", solutionArray[i])
            // console.log("GL", formattedGuess[i])
            // console.log("LLLL", l)

            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = "green"
                solutionArray[i] = null
            }
        })

        // Assign yellow color
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== "green") {
                formattedGuess[i].color = "yellow"
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })
        return formattedGuess
    }

    // Adding User Guesses to the history
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuess) => {
            let newGuesses = [...prevGuess]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess("")
    }

    // Keeping the track of every single word
    const handleKeyup = ({ key }) => {

        if (key === "Enter") {
            // only add guess letter if the turn is less than 5
            if (turn > 5) {
                console.log("You have used all your chances")
                return
            }

            // donot allow duplicate words
            if (history.includes(currentGuess)) {
                console.log("you already tried the word")
                return
            }

            // check word is 5 letter long
            if (currentGuess.length !== 5) {
                console.log("Word should be 5 chars long")
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        // Making sure that the key pressed is the letter between a to z.
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyup, turn }

}

export default useWordle