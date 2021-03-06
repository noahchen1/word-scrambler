import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputBox from './InputBox';

function App() {

  const [firstSentence, setFirstSentence] = useState('')
  const [firstSentenceArr, setFirstSentenceArr] = useState([])
  const [scrambledFirstSentence, setScrambledFirstSentence] = useState('')
  const [scrambledFristSentenceArr, setScrambledFirstSentenceArr] = useState([])
  const [trigger, setTrigger] = useState(false)

  const [isActive, setIsActive] = useState(0)


  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/sentences/1')
      .then(res => {
        setFirstSentence(res.data.data.sentence)
      })
    setTrigger(true)
  }, [])

  useEffect(()=> {
    if (!trigger) return
    let scrambledSentenceArr = []
    const sentenceArr = firstSentence.split(' ')
    for (var i = 0; i < sentenceArr.length; i++) {
      const lettersArr =  sentenceArr[i].split('')
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

    setScrambledFirstSentence(scrambledSentenceArr.join(' '))
    setScrambledFirstSentenceArr(scrambledSentenceArr)

    setFirstSentenceArr(sentenceArr)

  }, [firstSentence])

  console.log(isActive)


  return (
    <div className='scrambled-word' style={{backgroundColor: '#e1e1e1', height: '100vh', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', flexDirection:'column', backgroundColor: 'white', height: '90%', width: '80%', maxWidth: '1000px', minWidth: '390px', borderRadius: '15px'}}>

        <div style={{display:'flex', flexDirection: 'column', justifyContent:'space-around', width: '60%', minWidth: '300px', height: '40%'}}>
          <div style={{color: 'rgb(57, 135, 201)', fontWeight: '800', fontSize: '2.2rem', textAlign: 'center'}}>
            {scrambledFirstSentence}
          </div>
          <div style={{textAlign: 'center', fontWeight: '800', fontSize:'1.2rem', color: 'rgba(0, 0, 0, 0.7)'}}>Guess the sentence! Starting typing</div>
          <div style={{textAlign: 'center', fontWeight: '800', fontSize:'1.2rem', color: 'rgba(0, 0, 0, 0.7)'}}>The yellow blocks are meant for spaces</div>
          <div style={{textAlign: 'center', fontWeight: '600', fontSize: '1.8rem'}}>Score: 0</div>
        </div>


        <div style={{width: '80%', height: '50%'}}>

          {firstSentenceArr.map((word, index) => {
            let lettersArr = []
            let lastWord = []
            let inputWidth = ''
            let lastWordInputWidth = ''

            if(index < firstSentenceArr.length - 1) {
              lettersArr = word.split('')
              lettersArr.push(' ')
              inputWidth = parseInt(1 / lettersArr.length * 100) - 2
            

              return (
                <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                  {lettersArr.map((letter, index) => {
                    let disabled = false
                    index !== isActive ? disabled = true : disabled = false
                    return (
                      index < lettersArr.length - 1 ?
                      <InputBox 
                        letter={letter}
                        inputWidth={inputWidth}
                        backgroundColor='#e1e1e1'
                        inputNumber={index}
                        setIsActive={setIsActive}
                        disabled={disabled}
                      />
                      :
                      <InputBox
                        letter={letter}
                        inputWidth={inputWidth}
                        backgroundColor='#ffb74d'
                        inputNumber={index}
                        setIsActive={setIsActive}
                        disabled={disabled}
                      />
                    )
                  })}
                </div>
              )
            } else {
                lastWord = word.split('')
                lastWordInputWidth = parseInt(1 / lastWord.length * 100) - 2

                return (
                  <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                    {lastWord.map((letter, index) => {
                    let disabled = false
                    index !== isActive ? disabled = true : disabled = false
                      return (
                        index < lettersArr.length - 1 ?
                        <InputBox 
                          letter={letter}
                          inputWidth={inputWidth}
                          backgroundColor='#e1e1e1'
                          inputNumber={index}
                          setIsActive={setIsActive}
                          disabled={disabled}
                          />
                        :
                        <InputBox
                          letter={letter}
                          inputWidth={inputWidth}
                          backgroundColor='#e1e1e1'
                          inputNumber={index}
                          setIsActive={setIsActive}
                          disabled={disabled}
                          />
                      )
                    })}
                  </div>
                )
            }
          })}

        </div>

      </div>
    </div>
  )
}

export default App;
