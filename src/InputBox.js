import React from 'react'
import { useState } from 'react'

export default function InputBox({backgroundColor, letter, index, inputWidth, setCount, count}) {

    const [currentInput, setCurrentInput] = useState('')

    const onChangeCurrentInput = e => {
        setCurrentInput(e.target.value)
        setCount(index + 1)
    }


    return (
        <span style={{width: `${inputWidth}%`}}>
            <input  style={{width: '100%', backgroundColor: `${letter.toUpperCase() === currentInput.toUpperCase() ? "#4caf50" : backgroundColor }`}} 
                    type='text' 
                    value={currentInput} 
                    onChange={onChangeCurrentInput} 
                    maxLength={1}
                    disabled={index + letter !== count + letter}
            >      
            </input>
        </span>
    )
}
