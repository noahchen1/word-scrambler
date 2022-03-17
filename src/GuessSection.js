import React, { useEffect } from 'react'
import InputBox from './InputBox'
import {useState} from 'react'

export default function GuessSection({lettersArr, inputWidth, backgroundColor, lastWordBG}) {

  return (
      <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
          {lettersArr.map((letter, index) => {
            return (
            index < lettersArr.length - 1 ?
            <InputBox 
              letter={letter}
              inputWidth={inputWidth}
              backgroundColor={backgroundColor}
              fieldNumber={index}
            /> 
            : 
            <InputBox
              letter={letter} 
              inputWidth={inputWidth}
              backgroundColor={lastWordBG}
              fieldNumber={index}
            /> 
          )})}

      </div>
  )
}
