import React from 'react'
import { useState, useEffect } from 'react'

export default function InputBox({backgroundColor, letter, inputWidth, wordIndex, sentenceArr, index, count, setCount, maxLength, inputArr, setInputArr}) {

    const [currentInput, setCurrentInput] = useState('')


    const onChangeCurrentInput = e => {
        setCurrentInput(e.target.value)
    }

    let currentIndex = index
    for (let i=0; i<wordIndex; i++) {
        currentIndex = currentIndex + sentenceArr[i].length + 1
    }


    const handleKeyPress = e => {
        setInputArr(prevState => [...prevState, currentInput])
        if(count < maxLength) {
            setCount(currentIndex + 1)
        }
        if (e.key === 'Backspace') {
            setInputArr(prevState => prevState.slice(0, -2))
            setCount(currentIndex - 1)
            setCurrentInput('')
        }
    }


    const nextInput = document.querySelector(`input[name=input-${count}]`)

    useEffect(()=> {
        if (nextInput !== null) {
            nextInput.focus()
            nextInput.value = ''
        }

        
    }, [count])




    return (
        <span style={{width: `${inputWidth}%`}}>
            <input  style={{width: '100%', backgroundColor: `${letter.toUpperCase() === currentInput.toUpperCase() ? "#4caf50" : backgroundColor }`}} 
                    type='text' 
                    value={currentInput} 
                    onChange={onChangeCurrentInput} 
                    onKeyUpCapture={handleKeyPress}
                    maxLength={1}
                    disabled={currentIndex !== count}
                    name={`input-${currentIndex}`}
                    autoFocus={true}
            >      
            </input>
        </span>
    )
}
