import Header from "./components/Header";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

//"https://quizapi.io/api/v1/questions?apiKey=lHABG8E2gpfCaMBIXD33V3Afm0ZcUD6AeB8qwsCu"

export default function App() {
  const [question, setQuestion] = useState("QUESTION");
  const [answers, setAnswers] = useState([]);
  let data;
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
        console.log(answers);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="mainContainer">
        <h1>{question}</h1>
        <div>
          <div>{answers[0]}</div>
          <div>{answers[1]}</div>
          <div>{answers[2]}</div>
          <div>{answers[3]}</div>
        </div>
      </div>
    </div>
  );
}
