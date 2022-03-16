import React from 'react'
import {useState} from 'react'

export default function GuessSection({lettersArr, inputWidth, backgroundColor, lastWordBG, unscrambledSentenceArr}) {

  const [currentInput, setCurrentInput] = useState('')

  const onChangeInput = e => {
    setCurrentInput(e.target.value)
  }

  unscrambledSentenceArr.map((word, index) => {
    if(index < unscrambledSentenceArr.length - 1) {
      
    }
  })

  return (
      <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
          {lettersArr.map((letter, index) => (
            index < lettersArr.length - 1 ? 
            <span style={{width: `${inputWidth}%`}}><input style={{width: '100%', backgroundColor: `${backgroundColor}`}} type='text' value={currentInput} onChange={onChangeInput}></input></span>
            : 
            <span style={{width: `${inputWidth}%`}}><input style={{width: '100%', backgroundColor: `${lastWordBG}`}}></input></span>
          ))}
      </div>
  )
}
