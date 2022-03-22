import React, { useEffect } from 'react'
import InputBox from './InputBox'
import {useState} from 'react'

export default function GuessSection({lettersArr, inputWidth, backgroundColor, lastWordBG}) {

  const [count, setCount] = useState(0)

  console.log(count)

  return (
      <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
          {lettersArr.map((letter, index) => {
            return (
            index < lettersArr.length - 1 ?
            <InputBox 
              letter={letter}
              inputWidth={inputWidth}
              backgroundColor={backgroundColor}
              index={index}
              setCount={setCount}
              count={count}
            /> 
            : 
            <InputBox
              letter={letter} 
              inputWidth={inputWidth}
              backgroundColor={lastWordBG}
              index={index}
              setCount={setCount}
              count={count}
            /> 
          )})}

      </div>
  )
}
