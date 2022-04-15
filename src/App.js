import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputBox from './InputBox';





export default function App() {

  const [apiCounter, setAPICounter] = useState(1)
  const [sentence, setSentence] = useState(' ')
  const [sentenceArr, setSentenceArr] = useState([])
  const [scrambledSentence, setScrambledSentence] = useState('')
  const [trigger, setTrigger] = useState(false)

  const [count, setCount] = useState(0)
  const [inputArr, setInputArr] = useState([])
  const [clearInputs, setClearInputs] = useState(false)

  const [nextBottom, setNextBottom] = useState('none')

  const [mainUi, setMainUi] = useState('flex')
  const [youWin, setYouWin] = useState('none')


  // Making a request and store it in 'sentence' state,
  // Setting trigger to true to signify the compeltion of GET request

  useEffect(() => {
    axios.get(`https://api.hatchways.io/assessment/sentences/${apiCounter}`)
      .then(res => {
        setSentence(res.data.data.sentence)
      })
      setTrigger(true)

      if (apiCounter === 11) {
        setMainUi('none')
        setYouWin('block')
      }

  }, [apiCounter])




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


  useEffect(() => {
    const inputSentence = inputArr.join('').toLowerCase()
    if (inputSentence == sentence.toLowerCase()) {
      setNextBottom('block')
    }

  }, [inputArr])


  let maxLength = sentence.split('').length - 1


  return (
    <div className='scrambled-word' style={{backgroundColor: '#e1e1e1', height: '100vh', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

      <div style={{display: `${youWin}`, position: 'absolute', height: '50%', width: '40%', maxWidth: '1000px', minWidth: '390px'}}>
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: '15px', height: '50px'}}>
          You Win!
        </div>
      </div>


      <div style={{display: `${mainUi}`, alignItems: 'center', flexDirection:'column', backgroundColor: 'white', height: 'auto', width: '80%', maxWidth: '1000px', minWidth: '390px', borderRadius: '15px'}}>

        <div style={{display:'flex', flexDirection: 'column', justifyContent:'space-around', width: '60%', minWidth: '300px', height: '40%', margin: '5% 0'}}>
          <div style={{color: 'rgb(57, 135, 201)', fontWeight: '800', fontSize: '2.2rem', textAlign: 'center', margin: '3% 0'}}>
            {scrambledSentence}
          </div>
          <div style={{textAlign: 'center', fontWeight: '800', fontSize:'1.2rem', color: 'rgba(0, 0, 0, 0.7)', margin: '3% 0'}}>Guess the sentence! Starting typing</div>
          <div style={{textAlign: 'center', fontWeight: '800', fontSize:'1.2rem', color: 'rgba(0, 0, 0, 0.7)', margin: '3% 0'}}>The yellow blocks are meant for spaces</div>
          <div style={{textAlign: 'center', fontWeight: '600', fontSize: '1.8rem', margin: '3% 0'}}>{`Score: ${apiCounter - 1}`}</div>
        </div>

        <div style={{width: '80%', height: '40vh'}}>
          {sentenceArr.map((word, index) => {
            let lettersArr = word.split('') 
            let wordIndex = index
            if (index < sentenceArr.length - 1) {
              lettersArr.push(' ')

              var inputWidth = parseInt(1 / lettersArr.length * 100) - 2

              return(
                <div style={{margin: '10px 0', display: 'flex', justifyContent: 'space-between', height: '20%'}}>
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
                        maxLength={maxLength}
                        inputArr={inputArr}
                        setInputArr={setInputArr}
                        clearInputs={clearInputs}
                        setClearInputs={setClearInputs}
                        nextButton={nextBottom}
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
                        maxLength={maxLength}
                        inputArr={inputArr}
                        setInputArr={setInputArr}
                        clearInputs={clearInputs}
                        setClearInputs={setClearInputs}
                        nextButton={nextBottom}
                        backgroundColor='#ffb74d'
                      />
                    )
                  })}
                </div>
              )
            } else {

              var inputWidth = parseInt(1 / lettersArr.length * 100) - 2
              return (
                <div style={{margin: '5px 0', display: 'flex', justifyContent: 'space-between', height: '20%', textAlign: 'center'}}>
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
                        maxLength={maxLength}
                        inputArr={inputArr}
                        setInputArr={setInputArr}
                        clearInputs={clearInputs}
                        setClearInputs={setClearInputs}
                        nextButton={nextBottom}
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
                        maxLength={maxLength}
                        inputArr={inputArr}
                        setInputArr={setInputArr}
                        clearInputs={clearInputs}
                        setClearInputs={setClearInputs}
                        nextButton={nextBottom}
                        backgroundColor='#e1e1e1'
                      />
                    )
                  })}
              </div>
              )}})}
        </div>

        <div style={{display: `${nextBottom}`, marginBottom: '20px'}}>
          <button
            id='next-button'
            onClick={e =>{
              setNextBottom('none')
              if (apiCounter <= 10) {
                setAPICounter(apiCounter + 1)
              }
              setClearInputs(true)
            }}
            style={{padding: '10px 25px', backgroundColor: '#4caf50', border: 'none', color: 'white', fontSize: '1.5rem'}}
          >
            Next
          </button>
        </div>
  
    </div>
  </div>
  )
}
