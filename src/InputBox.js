import React from 'react'
import { useState, useEffect } from 'react'

export default function InputBox({backgroundColor, letter, inputWidth, wordIndex, sentenceArr, index, count, setCount, maxLength, setInputArr, clearInputs, setClearInputs, nextButton}) {

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

        if (e.key === 'Backspace' && count < maxLength) {
            setInputArr(prevState => prevState.slice(0, -2))
            setCount(currentIndex - 1)
            setCurrentInput('')
        }

        if (e.key === 'Backspace' && count === maxLength) {
            setInputArr(prevState => prevState.slice(0, -3))
            setCount(currentIndex - 1)
            setCurrentInput('')
        }

        if (e.key === 'Enter' && nextButton === 'block') {
            const btn = document.getElementById('next-button')
            btn.click()
        }
    }




    useEffect(()=> {
        const nextInput = document.querySelector(`input[name=input-${count}]`)
        if (nextInput !== null) {
            nextInput.focus()
            nextInput.value = ''
        }

    }, [count])

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
                    disabled={currentIndex !== count}
                    name={`input-${currentIndex}`}
            >      
            </input>
        </span>
    )
}
