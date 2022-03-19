import React from 'react'
import { useState } from 'react'

export default function InputBox({inputWidth, backgroundColor, letter, inputNumber, setInputIndex, index}) {

    const [currentInput, setCurrentInput] = useState('')

    const onChangeCurrentInput = e => {
        setCurrentInput(e.target.value)
        setInputIndex(index + 1)
    }


    return (
        <span style={{width: `${inputWidth}%`}}>
            <input  style={{width: '100%', backgroundColor: `${letter.toUpperCase() === currentInput.toUpperCase() ? "#4caf50" : backgroundColor }`}} 
                    type='text' 
                    value={currentInput} 
                    onChange={onChangeCurrentInput} 
                    name={`${inputNumber}`} 
                    maxLength={1}
            >      
            </input>
        </span>
    )
}
