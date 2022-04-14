import React from 'react'
import { useState, useEffect } from 'react'

export default function InputBox({backgroundColor, letter, inputWidth, wordIndex, sentenceArr, index, count, setCount}) {

    const [currentInput, setCurrentInput] = useState('')

    let currentIndex = index
    for (let i=0; i<wordIndex; i++) {
        currentIndex = currentIndex + sentenceArr[i].length + 1
    }

    const onChangeCurrentInput = e => {
        setCurrentInput(e.target.value)
        setCount(currentIndex + 1)
    }

    useEffect(() => {
        const nextInput = document.querySelector(`input[name=input-${count}]`)
        if (nextInput !== null) {
            nextInput.focus()
        }
    }, [count])


    return (
        <span style={{width: `${inputWidth}%`}}>
            <input  style={{width: '100%', backgroundColor: `${letter.toUpperCase() === currentInput.toUpperCase() ? "#4caf50" : backgroundColor }`}} 
                    type='text' 
                    value={currentInput} 
                    onChange={onChangeCurrentInput} 
                    maxLength={1}
                    disabled={currentIndex !== count}
                    name={`input-${currentIndex}`}
                    autoFocus={true}
            >      
            </input>
        </span>
    )
}
