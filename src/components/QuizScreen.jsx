import React from "react";
import leftBlob from "../images/leftBlob.png";
import rightBlob from "../images/rightBlob.png";

export default function QuizScreen() {
  let [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  let fullQuestions = questions.map((q) => {
    let rightAnswer = q.correct_answer;
    let wrongAnswersArr = q.incorrect_answers;
    //Placing the right answer randomly in the
    //wrong answer arr to display on page
    let length = wrongAnswersArr.length + 1;
    let randomIndex = Math.trunc(Math.random() * length);
    wrongAnswersArr.splice(randomIndex, 0, rightAnswer);

    let possibleAns = wrongAnswersArr.map((item) => {
      return <button className="questions--answer-button">{item}</button>;
    });

    return (
      <div>
        <h2 className="question--title">{q.question}</h2>
        <>{possibleAns}</>
        <hr />
      </div>
    );
  });

  return (
    <div className="questions--main-container">
      <div className="questions--container">
        {fullQuestions}
        <div className="questions--button-container">
          <p>You scored 3/5 cocrrect answers</p>
          <button>Play again</button>
        </div>
      </div>
      <img src={rightBlob} className={"rightStyles"} />
      <img className={"leftStyles"} src={leftBlob} />
    </div>
  );
}
