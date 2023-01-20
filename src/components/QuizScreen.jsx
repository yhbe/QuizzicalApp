import React from "react";
import leftBlob from "../images/leftBlob.png";
import rightBlob from "../images/rightBlob.png";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function QuizScreen() {
  let [questions, setQuestions] = React.useState([]);
  let [checkAnswers, setCheckAnswers] = React.useState(false);
  let [amountCorrect, setAmountCorrect] = React.useState(0);
  let [selectedAnswers, setSelectedAnswers] = React.useState([
    { first: "" },
    { Second: "" },
    { Third: "" },
    { Fourth: "" },
    { Fithth: "" },
  ]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        data.results = data.results.map((item) => {
          return {
            ...item,
            answeredCorrectly: false,
          };
        });
        let results = data.results;
        results.map((q) => {
          let rightAnswer = q.correct_answer;
          let wrongAnswersArr = q.incorrect_answers;
          //Placing the right answer randomly in the
          //wrong answer arr to display on page
          let length = wrongAnswersArr.length + 1;
          let randomIndex = Math.trunc(Math.random() * length);
          wrongAnswersArr.splice(randomIndex, 0, rightAnswer);
        });

        setQuestions(results);
      });
  }, []);

  let fullQuestions = questions.map((q, index) => {
    let wrongAnswersArr = q.incorrect_answers;
    console.log(questions);
    let possibleAns = wrongAnswersArr.map((item) => {
      let newItem = decode(item);
      return (
        <button
          onClick={(event) => onClick(event, item, index)}
          key={nanoid()}
          //If checking answers colors the selected answer Green
          //If selected answer is wrong colors the right answer red.
          className={`questions--answer-button  ${
            checkAnswers && questions[index].correct_answer === item
              ? "actualAnswer"
              : ""
          } ${
            selectedAnswers.find((i) => i === item)
              ? checkAnswers
                ? "rightAnswer"
                : "targeted"
              : ""
          }`}
        >
          {newItem}
        </button>
      );
    });

    let decodedQuestion = decode(q.question);
    return (
      <div id={index} key={nanoid()}>
        <h2 className="question--title">{decodedQuestion}</h2>
        <div>
          <>{possibleAns}</>
        </div>
        <hr style={{ marginTop: "20px" }} />
      </div>
    );
  });

  function onClick(event, item, questionIndex) {
    setSelectedAnswers((prevState) => {
      prevState[questionIndex] = item;
      return prevState;
    });

    let possibleAnswers = event.target.parentElement.children;

    //resetting classes
    for (let answer of possibleAnswers) {
      answer.classList.remove("targeted");
    }
    //styling clicked answer
    let clickedAnswer = event.target;
    clickedAnswer.classList.add("targeted");

    //If correct answer is selected changes
    //state and sets that question to answeredCorrectly
    setQuestions((prevState) => {
      prevState.map((q, index) => {
        if (questionIndex === index) {
          if (q.correct_answer === item) {
            q.answeredCorrectly = true;
          } else q.answeredCorrectly = false;
        }
        return { ...q };
      });
      return prevState;
    });
  }
  console.log("Refreshed");

  function checkAnswersOnClick() {
    console.log("Pressed");
    questions.map((q) => {
      if (q.answeredCorrectly) {
        setAmountCorrect((prevState) => prevState + 1);
      }
    });
    setCheckAnswers(true);
  }

  return (
    <div className="questions--main-container">
      <div className="questions--container">
        {fullQuestions}
        <div className="questions--button-container">
          {checkAnswers && (
            <p className="score">
              You scored {amountCorrect}/5 correct answers
            </p>
          )}
          <button
            onClick={checkAnswersOnClick}
            className="check--answer-button"
          >
            {checkAnswers ? "Play Again" : "Check Answers"}
          </button>
        </div>
      </div>
      <img src={rightBlob} className={"rightStyles"} />
      <img className={"leftStyles"} src={leftBlob} />
    </div>
  );
}
