import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputBox from './InputBox';



export default function App() {

  const [sentence, setSentence] = useState('')
  const [sentenceArr, setSentenceArr] = useState([])
  const [scrambledSentence, setScrambledSentence] = useState('')
  const [trigger, setTrigger] = useState(false)

  const [count, setCount] = useState(0)

  // Making a request and store it in 'sentence' state,
  // Setting trigger to true to signify the compeltion of GET request

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/sentences/1')
      .then(res => {
        setSentence(res.data.data.sentence)
      })
      setTrigger(true)
  }, [])

  useEffect(() => {
    // stop if request is not finished
    if (!trigger) return

    // initializing an empty array to store scrambled sentence
    const scrambledSentece = []

    sentence.split(' ').forEach(word => {
      const splitWord = word.split('')
      // no need to scramble words with only two letters or less 
      if (splitWord.length <=2) {
        scrambledSentece.push(splitWord.join(''))
      } else {
      // only scrambling the middle letters of each word minus the beginning and ending letter
        const scrambledMidLetters = splitWord.slice(1, -1).sort(() => Math.random() - 0.5)
        scrambledMidLetters.unshift(splitWord[0])
        scrambledMidLetters.push(splitWord[splitWord.length - 1])
        scrambledSentece.push(scrambledMidLetters.join(''))
      }
    })
    
    // store scrambled sentence in 'scrambledSentence' state for east of access
    setScrambledSentence(scrambledSentece.join(' '))
    
    //
    setSentenceArr(sentence.split(' '))

  }, [sentence])


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
        {sentenceArr.map((word, index) => {
          let lettersArr = word.split('') 
          let wordIndex = index
          if (index < sentenceArr.length - 1) {
            lettersArr.push(' ')
            var inputWidth = parseInt(1 / lettersArr.length * 100) - 2

            return(
              <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between'}}>
                {lettersArr.map((letter, index) => {
                  return(
                    index < lettersArr.length - 1 ?
                    <InputBox 
                      letter={letter}
                      inputWidth={inputWidth}
                      wordIndex={wordIndex}
                      sentenceArr={sentenceArr}
                      count={count}
                      setCount={setCount}
                      index={index}
                      backgroundColor='#e1e1e1'
                    />
                    :
                    <InputBox 
                      letter={letter}
                      inputWidth={inputWidth}
                      wordIndex={wordIndex}
                      sentenceArr={sentenceArr}
                      count={count}
                      setCount={setCount}
                      index={index}
                      backgroundColor='#ffb74d'
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
                      wordIndex={wordIndex}
                      sentenceArr={sentenceArr}
                      count={count}
                      setCount={setCount}
                      index={index}
                      backgroundColor='#e1e1e1'
                    />
                    :
                    <InputBox 
                      letter={letter}
                      inputWidth={inputWidth}
                      wordIndex={wordIndex}
                      sentenceArr={sentenceArr}
                      count={count}
                      setCount={setCount}
                      index={index}
                      backgroundColor='#e1e1e1'
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
