import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";

export default function App() {
  // state to store the last route of the API address, which gets upticked when the next button is clicked.
  const [apiCounter, setAPICounter] = useState(1);

  // state to store the original sentence from the current API call
  const [sentence, setSentence] = useState(" ");

  // state to store the original sentence in an array, separated by each word in the sentence
  // this is here to facilate getting the index of the current input
  const [sentenceArr, setSentenceArr] = useState([]);

  // state to store the scrambled sentence
  const [scrambledSentence, setScrambledSentence] = useState("");

  // trigger to make sure code dependent on the API gets executed only after the get request is completed
  const [trigger, setTrigger] = useState(false);

  // state to store the count number, which is upticked when an input is entered, downticked vice versa.
  // this is here as a referrence to the index of the current input so all inputs are disabled except for the current input.
  const [count, setCount] = useState(0);

  // state to store the inputs. This is here to determine if all inputs entered match with the original sentence
  const [inputArr, setInputArr] = useState([]);

  // state used to clear all inputs when the next button is clicked.
  const [clearInputs, setClearInputs] = useState(false);

  // state to control the visbility of the next button
  const [nextBottom, setNextBottom] = useState("none");

  // state to control the visibility of the UI
  const [mainUi, setMainUi] = useState("flex");

  // state to control the visibility of the "you win" window
  const [youWin, setYouWin] = useState("none");

  // Making a request and store it in 'sentence' state,
  // Setting trigger to true to signify the compeltion of GET request

  useEffect(() => {
    if (apiCounter < 11) {
      axios
        .get(`https://api.hatchways.io/assessment/sentences/${apiCounter}`)
        .then((res) => {
          setSentence(res.data.data.sentence);
        });
      setTrigger(true);
    }

    // condition to check if we have reached the last sentence from the API
    if (apiCounter === 11) {
      setMainUi("none");
      setYouWin("block");
    }
  }, [apiCounter]);

  useEffect(() => {
    // stop if request is not finished
    if (!trigger) return;

    // initializing an empty array to store scrambled sentence
    const scrambledSentece = [];

    sentence.split(" ").forEach((word) => {
      const splitWord = word.split("");
      // no need to scramble words with only two letters or less
      if (splitWord.length <= 2) {
        scrambledSentece.push(splitWord.join(""));
      } else {
        // only scrambling the middle letters of each word minus the beginning and ending letter
        const scrambledMidLetters = splitWord
          .slice(1, -1)
          .sort(() => Math.random() - 0.5);
        scrambledMidLetters.unshift(splitWord[0]);
        scrambledMidLetters.push(splitWord[splitWord.length - 1]);
        scrambledSentece.push(scrambledMidLetters.join(""));
      }
    });

    // store scrambled sentence in 'scrambledSentence' state for east of access
    setScrambledSentence(scrambledSentece.join(" "));

    setSentenceArr(sentence.split(" "));
  }, [sentence]);

  useEffect(() => {
    // join inputs entered to a string and compare it against the orignal sentence.
    // next button is set to visible only when the inputs are idential to the orignal sentence
    const inputSentence = inputArr.join("").toLowerCase();
    if (inputSentence == sentence.toLowerCase()) {
      setNextBottom("block");
    }
  }, [inputArr]);

  // initiating a variable to store the length of the original sentence in letters array.
  // this is used as a constraint for the input component
  let maxLength = sentence.split("").length - 1;

  return (
    <div
      className="scrambled-word"
      style={{
        backgroundColor: "#e1e1e1",
        height: "100vh",
        width: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: `${youWin}`,
          position: "absolute",
          height: "40%",
          width: "40%",
          maxWidth: "1000px",
          minWidth: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "15px",
            height: "50px",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}
        >
          You Win!
        </div>
      </div>

      <div
        style={{
          display: `${mainUi}`,
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
          height: "auto",
          width: "80%",
          maxWidth: "1000px",
          minWidth: "390px",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "60%",
            minWidth: "300px",
            height: "40%",
            margin: "5% 0",
          }}
        >
          <div
            style={{
              color: "rgb(57, 135, 201)",
              fontWeight: "800",
              fontSize: "2.2rem",
              textAlign: "center",
              margin: "3% 0",
            }}
          >
            {scrambledSentence}
          </div>
          <div
            style={{
              textAlign: "center",
              fontWeight: "800",
              fontSize: "1.2rem",
              color: "rgba(0, 0, 0, 0.7)",
              margin: "3% 0",
            }}
          >
            Guess the sentence! Starting typing
          </div>
          <div
            style={{
              textAlign: "center",
              fontWeight: "800",
              fontSize: "1.2rem",
              color: "rgba(0, 0, 0, 0.7)",
              margin: "3% 0",
            }}
          >
            The yellow blocks are meant for spaces
          </div>
          <div
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "1.8rem",
              margin: "3% 0",
            }}
          >{`Score: ${apiCounter - 1}`}</div>
        </div>

        <div style={{ width: "80%", height: "40vh" }}>
          {sentenceArr.map((word, index) => {
            let lettersArr = word.split("");
            let wordIndex = index;

            // adding an extra space to each word except for the last word as required by the instruction
            if (index < sentenceArr.length - 1) {
              lettersArr.push(" ");

              // calculating the length of each input based on the length of each word it is in with the extra space at the end
              var inputWidth = parseInt((1 / lettersArr.length) * 100) - 2;

              return (
                <div
                  key={`${word}`}
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "20%",
                  }}
                >
                  {lettersArr.map((letter, index) => {
                    return (
                      // checking if the input is the extra space at the end, which needs to be set to have a different background color
                      index < lettersArr.length - 1 ? (
                        <InputBox
                          key={`${letter+index}`}
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
                          backgroundColor="#e1e1e1"
                        />
                      ) : (
                        <InputBox
                          key={`${letter+index}`}
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
                          backgroundColor="#ffb74d"
                        />
                      )
                    );
                  })}
                </div>
              );
            } else {
              // calculating the length of each input based on the length of the last word of the sentence
              var inputWidth = parseInt((1 / lettersArr.length) * 100) - 2;
              return (
                <div
                  key={`${word}`}
                  style={{
                    margin: "5px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "20%",
                    textAlign: "center",
                  }}
                >
                  {lettersArr.map((letter, index) => {
                    return (
                      <InputBox
                        key={`${letter+index}`}
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
                        backgroundColor="#e1e1e1"
                      />
                    );
                  })}
                </div>
              );
            }
          })}
        </div>

        {/*next button*/}
        <div style={{ display: `${nextBottom}`, marginBottom: "20px" }}>
          <button
            id="next-button"
            onClick={(e) => {
              // Setting button visibility off after a click event
              setNextBottom("none");
              // Fetching for the next setence
              if (apiCounter <= 10) {
                setAPICounter(apiCounter + 1);
              }
              // clearing all inputs
              setClearInputs(true);
            }}
            style={{
              padding: "10px 25px",
              backgroundColor: "#4caf50",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
