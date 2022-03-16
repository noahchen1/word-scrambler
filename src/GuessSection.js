import React from 'react'
import InputBox from './InputBox'

export default function GuessSection({lettersArr, inputWidth, backgroundColor, lastWordBG}) {

  
  return (
      <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
          {lettersArr.map((letter, index) => (
            index < lettersArr.length - 1 ?
            <InputBox 
              letter={letter}
              inputWidth={inputWidth}
              backgroundColor={backgroundColor}
            /> 
            : 
            <InputBox
              letter={letter} 
              inputWidth={inputWidth}
              backgroundColor={lastWordBG}
            /> 
          ))}
      </div>
  )
}
