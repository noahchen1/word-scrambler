import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputBox from './InputBox';
import GuessSection from './GuessSection';

export default function App() {

  const [originalSentence, setOriginalSentence] = useState('')
  const [originalSentenceArr, setOriginalSentenceArr] = useState([])
  const [originalLettersArr, setOriginalLettersArr] = useState([])
  const [scrambledSentence, setScrambledSentence] = useState('')
  const [scrambledSentenceArr, setScrambledSentenceArr] = useState([])
  const [scrambledLettersArr, setScrambledLettersArr] = useState([])
  const [trigger, setTrigger] = useState(false)


  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/sentences/1')
      .then(res => {
        setOriginalSentence(res.data.data.sentence)
      })
      setTrigger(true)
  }, [])


  useEffect(() => {
    if (!trigger) return
    let scrambledSentenceArr = []
    const originalSentenceArr = originalSentence.split(' ')
    for (var i = 0; i < originalSentenceArr.length; i++) {
      const lettersArr = originalSentenceArr[i].split('')
      if (lettersArr.length <= 2) {
        scrambledSentenceArr.splice(i, 0, lettersArr[i])
      } else if (lettersArr.length > 2) {
        const scrambledMiddleLetters = lettersArr.slice(1, -1).sort(() => Math.random() - 0.5)
        scrambledMiddleLetters.unshift(lettersArr[0])
        scrambledMiddleLetters.push(lettersArr[lettersArr.length - 1])
        const scrambledWord = scrambledMiddleLetters.join('')
        scrambledSentenceArr.splice(i, 0, scrambledWord)
      }
    }

    setOriginalSentenceArr(originalSentenceArr)
    setScrambledSentence(scrambledSentenceArr.join(' '))
    setScrambledSentenceArr(scrambledSentenceArr)
    setScrambledLettersArr(scrambledSentenceArr.join(' ').split(''))

    setOriginalLettersArr(originalSentenceArr.join(' ').split(''))

  }, [originalSentence])



  return (
    <div className='scrambled-word' style={{backgroundColor: '#e1e1e1', height: '100vh', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', flexDirection:'column', backgroundColor: 'white', height: '90%', width: '80%', maxWidth: '1000px', minWidth: '390px', borderRadius: '15px'}}>

        <div style={{display:'flex', flexDirection: 'column', justifyContent:'space-around', width: '60%', minWidth: '300px', height: '40%'}}>
          <div style={{color: 'rgb(57, 135, 201)', fontWeight: '800', fontSize: '2.2rem', textAlign: 'center'}}>
            {scrambledSentence}
          </div>
          <div style={{textAlign: 'center', fontWeight: '800', fontSize:'1.2rem', color: 'rgba(0, 0, 0, 0.7)'}}>Guess the sentence! Starting typing</div>
          <div style={{textAlign: 'center', fontWeight: '800', fontSize:'1.2rem', color: 'rgba(0, 0, 0, 0.7)'}}>The yellow blocks are meant for spaces</div>
          <div style={{textAlign: 'center', fontWeight: '600', fontSize: '1.8rem'}}>Score: 0</div>
        </div>


        <div style={{width: '80%', height: '50%'}}>

          {originalSentenceArr.map((word, index) => {
            var lettersArr = word.split('')
            if (index < originalSentenceArr.length - 1) {
              lettersArr.push(' ')
              var inputWidth = parseInt(1 / lettersArr.length * 100) - 2
              return (
                <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                  {lettersArr.map((letter, index) => {
                    return(
                      index < lettersArr.length - 1 ?
                      <InputBox 
                        letter={letter}
                        inputWidth={inputWidth}
                        backgroundColor='#e1e1e1'
                        setCount={setCount}
                        index={index}
                      />
                      :
                      <InputBox 
                        letter={letter}
                        inputWidth={inputWidth}
                        backgroundColor='#ffb74d'
                        setCount={setCount}
                        index={index}
                      />
                    )
                  })}
                </div>
              )
            } else {
              return (
                <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                  {lettersArr.map((letter, index) => {
                    return (
                      index < lettersArr.length - 1 ?
                      <InputBox 
                        letter={letter}
                        inputWidth={inputWidth}
                        backgroundColor='#e1e1e1'
                        setCount={setCount}
                        index={index}
                      />
                      :
                      <InputBox 
                        letter={letter}
                        inputWidth={inputWidth}
                        backgroundColor='#e1e1e1'
                        setCount={setCount}
                        index={index}
                      />
                    )
                  })}
                </div>
                )}})}
        </div>

      </div>
    </div>
  )
}
