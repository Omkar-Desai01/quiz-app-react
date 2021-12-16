import Header from "./components/Header";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Confety from "./components/Confety";
let clicks = 0;
export default function App() {
  const [question, setQuestion] = useState("QUESTION");
  const [correctAns, setCorrectAns] = useState("");
  const [answers, setAnswers] = useState([]);
  const [win, setWin] = useState("");
  const [winMessage, setWinMessage] = useState("");
  const [randNum, setRandNum] = useState(
    Math.floor(Math.random() * (20 - 1) + 1)
  );

  React.useEffect(() => {
    axios
      .get(
        "https://quizapi.io/api/v1/questions?apiKey=lHABG8E2gpfCaMBIXD33V3Afm0ZcUD6AeB8qwsCu"
      )
      .then((datas) => {
        console.log(datas.data[randNum]);
        setQuestion(datas.data[randNum].question);
        setAnswers([
          datas.data[randNum].answers.answer_a,
          datas.data[randNum].answers.answer_b,
          datas.data[randNum].answers.answer_c,
          datas.data[randNum].answers.answer_d,
        ]);
        setCorrectAns(
          datas.data[randNum].answers[datas.data[randNum].correct_answer]
        );
        console.log(correctAns);
      });
  }, [randNum]);

  const checkAns = (e) => {
    clicks = clicks + 1;
    console.log(clicks);
    if (clicks > 1) {
      setWinMessage("NO YOU ARE DONE");
      setWin("");
    } else {
      if (correctAns === undefined) {
        setWinMessage("There is no answer there😒");
      } else {
        if (e.target.textContent == correctAns) {
          setWin(<Confety />);
          setWinMessage("Correct Answer 🎉🎉");
        } else {
          setWin("");
          setWinMessage("Wrong Answer 👎👎");
        }
      }
    }
  };

  const next = () => {
    clicks = 0;
    setWin("");
    setWinMessage("");
    setRandNum(Math.floor(Math.random() * (20 - 1) + 1));
  };

  return (
    <div>
      {win}
      <Header />
      <div className="mainContainer">
        <h1>{winMessage}</h1>
        <h1 className="question">{question}</h1>
        <div>
          {answers[0] && (
            <div onClick={checkAns} className="ans">
              {answers[0]}
            </div>
          )}
          {answers[1] && (
            <div onClick={checkAns} className="ans">
              {answers[1]}
            </div>
          )}
          {answers[2] && (
            <div onClick={checkAns} className="ans">
              {answers[2]}
            </div>
          )}
          {answers[3] && (
            <div onClick={checkAns} className="ans">
              {answers[3]}
            </div>
          )}
        </div>
        <button onClick={next} className="nextBtn">
          Next Question
        </button>
      </div>
    </div>
  );
}
