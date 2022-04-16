import React from 'react'
import { useState, useEffect } from 'react'

export default function InputBox({backgroundColor, letter, inputWidth, wordIndex, sentenceArr, index, count, setCount, maxLength, setInputArr, clearInputs, setClearInputs, nextButton}) {

    // state to store the input value on change
    const [currentInput, setCurrentInput] = useState('')
    const onChangeCurrentInput = e => {
        setCurrentInput(e.target.value)
    }

    // getting the current index of the letter from the first letter of the sentence
    let currentIndex = index
    for (let i=0; i<wordIndex; i++) {
        currentIndex = currentIndex + sentenceArr[i].length + 1
    }

    // onKeyUp Handler
    const handleKeyPress = e => {
        // storing input entered into InputArr global state array
        setInputArr(prevState => [...prevState, currentInput])

        // upticking count global state after input entered
        if(count < maxLength) {
            setCount(currentIndex + 1)
        }

        // removing the last element from the InputArr global state array after removing the current input
        // downticking count global state after input removed 
        // emptying the current input
        if (e.key === 'Backspace' && count < maxLength) {
            setInputArr(prevState => prevState.slice(0, -2))
            setCount(currentIndex - 1)
            setCurrentInput('')
        }

        // condition for the last letter only since there is no next input after it
        if (e.key === 'Backspace' && count === maxLength) {
            setInputArr(prevState => prevState.slice(0, -3))
            setCount(currentIndex - 1)
            setCurrentInput('')
        }

        // hitting enter to trigger the next button
        if (e.key === 'Enter' && nextButton === 'block') {
            const btn = document.getElementById('next-button')
            btn.click()
        }
    }

    // auto focus on the next input based on the global count #
    useEffect(()=> {
        const nextInput = document.querySelector(`input[name=input-${count}]`)
        if (nextInput !== null) {
            nextInput.focus()
            nextInput.value = ''
        }
    }, [count])


    // resetting all the states associated with input component after the next button is clicked
    useEffect(() => {
        setCurrentInput('')
        setClearInputs(false)
        setCount(0)
        setInputArr([])
    }, [clearInputs])


    return (
        <span style={{width: `${inputWidth}%`}}>
            <input  style={{width: '100%', height: '90%', textAlign: 'center', fontSize: '1.8rem', color: 'white', caretColor: 'black', border: 'none', outline: 'none', backgroundColor: `${letter.toUpperCase() === currentInput.toUpperCase() ? "#4caf50" : backgroundColor }`}} 
                    type='text' 
                    value={currentInput} 
                    onChange={onChangeCurrentInput} 
                    onKeyUp={handleKeyPress}
                    maxLength={1}
                    // disabling all inputs except for the current input
                    disabled={currentIndex !== count}
                    name={`input-${currentIndex}`}
            >      
            </input>
        </span>
    )
}
