import Header from "./components/Header";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Confety from "./components/Confety";
//"https://quizapi.io/api/v1/questions?apiKey=lHABG8E2gpfCaMBIXD33V3Afm0ZcUD6AeB8qwsCu"

export default function App() {
  const [question, setQuestion] = useState("QUESTION");
  const [correctAns, setCorrectAns] = useState("");
  const [answers, setAnswers] = useState([]);
  const [win, setWin] = useState("");
  const [winMessage, setWinMessage] = useState("");

  React.useEffect(() => {
    axios
      .get(
        "https://quizapi.io/api/v1/questions?apiKey=lHABG8E2gpfCaMBIXD33V3Afm0ZcUD6AeB8qwsCu"
      )
      .then((datas) => {
        console.log(datas.data[1]);
        setQuestion(datas.data[1].question);
        setAnswers([
          datas.data[1].answers.answer_a,
          datas.data[1].answers.answer_b,
          datas.data[1].answers.answer_c,
          datas.data[1].answers.answer_d,
        ]);
        setCorrectAns(datas.data[1].answers[datas.data[1].correct_answer]);
        console.log(correctAns);
      });
  }, []);

  const checkAns = (e) => {
    console.log(e.target.textContent, correctAns);
    if (e.target.textContent == correctAns) {
      setWin(<Confety />);
      setWinMessage("Correct Answer 🎉🎉");
    } else {
      setWin("");
      setWinMessage("Wrong Answer 👎👎");
    }
  };

  const next = () => {
    setWin("");
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
        <button onClick={next}>Next Question</button>
      </div>
    </div>
  );
}
