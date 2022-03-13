import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const [firstSentence, setFirstSentence] = useState('')
  const [scrambledFirstSentence, setScrambledFirstSentence] = useState('')
  const [trigger, setTrigger] = useState(false)

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

  }, [firstSentence])


  return (
    <div className='scrambled-word'>
      {scrambledFirstSentence}
    </div>
  )
}

export default App;
