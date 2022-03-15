import React from 'react'

export default function GuessSection({lettersArr, inputWidth}) {
  return (
      <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
          {lettersArr.map(letter => (
            <span style={{width: `${inputWidth}%`}}><input style={{width: '100%'}}></input></span>
          ))}
      </div>
  )
}
