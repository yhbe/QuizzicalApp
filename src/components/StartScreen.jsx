import leftBlob from "../images/leftBlob.png";
import rightBlob from "../images/rightBlob.png";

export default function StartScreen(props) {
  return (
    <div className="start--screen">
      <h1 className="start--text">Quizzical</h1>
      <h3>Test your trivia knowledge</h3>
      <button className="start--button" onClick={props.onClick}>
        Start Quiz
      </button>
      <img className="leftblob" src={leftBlob} alt="left blob" />
      <img className="rightblob" src={rightBlob} alt="right blob" />
    </div>
  );
}
