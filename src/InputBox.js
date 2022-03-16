import React from 'react'
import { useState } from 'react'

export default function InputBox({inputWidth, backgroundColor, letter}) {

    const [currentInput, setCurrentInput] = useState('')
    const onChangeCurrentInput = e => {
        setCurrentInput(e.target.value)
    }



    if (letter == currentInput) {
        console.log('you are correct!')
    }


    return (
        <span style={{width: `${inputWidth}%`}}><input style={{width: '100%', backgroundColor: `${letter.toUpperCase() == currentInput.toUpperCase() ? "#4caf50" : backgroundColor }`}} type='text' value={currentInput} onChange={onChangeCurrentInput}></input></span>
    )
}
