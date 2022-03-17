import React from 'react'
import { useState, useEffect } from 'react'

export default function InputBox({inputWidth, backgroundColor, letter, fieldNumber}) {

    const [currentInput, setCurrentInput] = useState('')
    const onChangeCurrentInput = e => {
        setCurrentInput(e.target.value)
        console.log(e.target.name)  
    }

    return (
        <span style={{width: `${inputWidth}%`}}><input style={{width: '100%', backgroundColor: `${letter.toUpperCase() === currentInput.toUpperCase() ? "#4caf50" : backgroundColor }`}} type='text' value={currentInput} onChange={onChangeCurrentInput} name={`input-${fieldNumber}`} maxLength={1}></input></span>
    )
}
