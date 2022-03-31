import React, { useEffect, useState } from "react";
import { Exams } from "../data/Exams";
function Exam() {
  const data = Exams;
  // console.log(data.find(x => x.answerNo === 1));
  const [pageNo, setpageNo] = useState(1);
  const [questions, setquestions] = useState(data);
  const [checkedQuestion, setcheckedQuestion] = useState(null);
  const [checkedAnswer, setcheckedAnswer] = useState([]);
  const [checkedOption, setcheckedOption] = useState(null);

  useEffect(() => {
      console.log('checkedAnswer',checkedAnswer)
    const checkedQuestion1 = questions.find((x) => x.answerNo === pageNo);
    setcheckedQuestion(checkedQuestion1);
    const checkedOption1 = checkedAnswer.find(
      (answer) => answer.questionId === checkedQuestion1.id
    );
    setcheckedOption(checkedOption1);
  }, [pageNo,checkedAnswer]);

  // api verildiğinde işlenicek fonksiyon
  // const getExam = () => {
  //     setquestions(data);
  //     console('Questions',questions)
  // }
  
  const handlGoNext = (event) => {
    event.preventDefault();

    // console.log(pageNo + 1)
    const question = questions.find((x) => x.answerNo === pageNo + 1);
    // console.log('jdskds',question);
    if (question !== undefined) {
      setpageNo((prev) => prev + 1);
    }
  };

  const handleGoPrev = (event) => {
    event.preventDefault();
    console.log(pageNo + 1);
    const question = questions.find((x) => x.answerNo === pageNo - 1);
    console.log("jdskds", question);

    if (question !== undefined) {
      setpageNo((prev) => prev - 1);
    }
  };
  const handleAnswerChange = (event) => {
    console.log(event.target);
    const id = event.target.id;
    const tempCheckedAnswers = checkedAnswer;
    const isExists = tempCheckedAnswers.find(
      (answer) => answer.questionId === checkedQuestion.id
    );
    if (isExists) {
      console.log(isExists);

      const willSaveAnswers = tempCheckedAnswers.map((answer) => {
        if (answer.questionId === isExists.questionId) {
          answer.answerId = Number(id);
        }
        return answer;
      });
      setcheckedAnswer(willSaveAnswers);
    } else {
      setcheckedAnswer([...checkedAnswer,{
        questionId: checkedQuestion.id,
        answerId: Number(id),
      }] );
    }

    console.log(checkedAnswer);
  };

  return (
    <div className="section">
      <div className="s-container">
        <div className="exam-box">
          <div className="exam-title">
            <span>{checkedQuestion?.answerNo}. Soru</span>
            <p>
              {" "}
              Lütfen sağlıklı bir değerlendirme için bilmediğiniz sorularu boş
              bırakın
            </p>
          </div>
          <div className="test-description">
            <p></p>
            <p>Choose the best answer which completes the sentence.</p>
            <p></p>
            <p></p>
          </div>
          <div className="test-question">{checkedQuestion?.question}</div>

          <div className="test-answers">
            {checkedQuestion &&
              checkedQuestion.answers.map((item, key) => {
                console.log(item,checkedOption)
                return (
                  <div class="test-answer">
                    <input
                    id={item.id}
                      key={key}
                      type="radio"
                      name="checkbox"
                      checked={ item.id === checkedOption?.answerId}
                      onClick={(e) => handleAnswerChange(e)}
                    />
                    <label htmlFor="">{item?.answer}</label>
                  </div>
                );
              })}
          </div>
          <div className="test-buttons">
            <a onClick={(e) => handleGoPrev(e)}>
              <i
                class="bi bi-chevron-double-left"
                style={{ marginRight: "5px" }}
              ></i>
              <span>ÖNCEKİ</span>
            </a>
            <a onClick={(e) => handlGoNext(e)}>
              <span>SONRAKİ</span>
              <i
                class="bi bi-chevron-double-right"
                style={{ marginLeft: "5px" }}
              ></i>
            </a>
          </div>
          <div className="test-progressbar">
            <p>
              İLERLEME ({pageNo}/{questions.length})
            </p>
            <div className="progressbar">
              <div
                style={{ width: `${(pageNo / questions.length) * 100}` + "%" }}
              ></div>
            </div>
          </div>
          <div className="test-note">
            Lütfen sağlıklı bir değerlendirme için bilmediğiniz soruları boş
            bırakınız
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exam;
