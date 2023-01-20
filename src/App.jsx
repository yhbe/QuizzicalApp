import React from "react";
import "./App.css";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";

function App() {
  const [newStart, setNewStart] = React.useState(true);

  function setUpQuiz() {
    setNewStart(false);
  }

  return (
    <div className="App">
      {newStart && <StartScreen onClick={setUpQuiz} />}
      {!newStart && <QuizScreen />}
    </div>
  );
}

export default App;
