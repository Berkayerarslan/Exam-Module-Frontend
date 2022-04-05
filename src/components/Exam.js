import React, { useEffect, useState } from "react";
import { Exams } from "../data/Exams";
import AnswerTest from "./AnswerTest";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import { useTimer } from "react-timer-hook";
import MultipleAnswer from "./MultipleAnswer";
import { set } from "react-hook-form";

function Exam() {
  const data = Exams;
  // console.log(data.find(x => x.answerNo === 1));
  const [pageNo, setpageNo] = useState(1);
  const [questions, setquestions] = useState(data);
  const [checkedQuestion, setcheckedQuestion] = useState(null);

  const [checkedAnswer, setcheckedAnswer] = useState([]);
  console.log('checkedAnswers',checkedAnswer);
  const [checkedMultiAnswer,setcheckedMultiAnswer] = useState([]);
  console.log('Multi : ',checkedMultiAnswer)
  const [checkedOption, setcheckedOption] = useState(0);
  console.log('Option',checkedOption)
  const [checkedOptions, setcheckedOptions] = useState([]);
  console.log('Options',checkedOptions)
  const [remainingTime, setremainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 6000);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    const checkedQuestion1 = questions.find((x) => x.answerNo === pageNo);
    setcheckedQuestion(checkedQuestion1);
    if (checkedQuestion1.questionType === "Test") {
      const checkedOption1 = checkedAnswer.find(
        (answer) => answer.questionId === checkedQuestion1.id
      );
      console.log(checkedOption1);
      setcheckedOption(checkedOption1);
    }
    else if(checkedQuestion.questionType === 'MultiChoice'){
      console.log('tüm cevaplar',checkedMultiAnswer)
      console.log(checkedQuestion)
      const checkedOptions1 = checkedMultiAnswer.filter((x) => x.questionId === checkedQuestion.id )
      console.log('seçili cevap',checkedOptions1);
      setcheckedOptions(checkedOptions1);
    }

    // console.log(checkedQuestion)
  }, [pageNo, checkedAnswer,checkedMultiAnswer]);

  useEffect(() => {
    setremainingTime({
      hours: hours,
      seconds: seconds,
      minutes: minutes,
    });
  }, [seconds]);

  // useEffect(() => {

  // },[])

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
    // console.log(event.target.id);
    
    const id = event.target.id;

    if (checkedQuestion.questionType === "Test") {
      console.log('Type',checkedQuestion.questionType)
      const tempCheckedAnswers = checkedAnswer;
      const isExists = tempCheckedAnswers.find(
        (answer) => answer.questionId === checkedQuestion.id
      );
      if (isExists) {
        // console.log(isExists);

        const willSaveAnswers = tempCheckedAnswers.map((answer) => {
          if (answer.questionId === isExists.questionId) {
            answer.answerId = Number(id);
          }
          return answer;
        });
        setcheckedAnswer(willSaveAnswers);
      } else {
        setcheckedAnswer([
          ...checkedAnswer,
          {
            questionId: checkedQuestion.id,
            answerId: Number(id),
          },
        ]);
      }
    } else if (checkedQuestion.questionType === "MultiChoice") {
      console.log('type',checkedQuestion.questionType)
      const tempCheckedAnswers = checkedMultiAnswer;
      const isExists = tempCheckedAnswers.filter(
        (answer) => answer.questionId === checkedQuestion.id
      );
      console.log('isexists',isExists)
      if (isExists.length > 0) {
        
        const willSaveAnswers = tempCheckedAnswers.map((answer) => {
          if(answer.answerId === Number(id)){
            answer.answerId = -1
          }
          return answer
        })
        console.log('kaydedilecek sorular',willSaveAnswers)
        const willSaveAnswers2 = willSaveAnswers?.answerId.filter((x) => x.answerId !== -1);
        console.log('kaydedilecek sorular son hali',willSaveAnswers2)
        setcheckedMultiAnswer(willSaveAnswers2)
        // console.log(isExists)
        // const willSaveAnswers = tempCheckedAnswers.map((answer) => {
        //     answer.answerIds.map((itemId) => {
        //       if(itemId === id){
        //         itemId = -1;
        //       }
        //       else {
                
        //       }
        //       return itemId
        //     }) 
        //   return answer
        // })


        // const willSaveAnswers = tempCheckedAnswers.map((answer) => {
        //   if (answer.questionId === isExists.questionId) {
        //     answer.answerId = Number(id);
        //   }
        //   return answer;
        // });
        // setcheckedMultiAnswer(willSaveAnswers);
      }
      else {
        setcheckedMultiAnswer([
          ...checkedMultiAnswer,
          {
            questionId: checkedQuestion.id,
            answerId: Number(id)
          },
        ]);
      }

     
    }

    // console.log(checkedAnswer);
  };

  const handleTime = () => {
    resume();
    setremainingTime({
      hours: hours,
      seconds: seconds,
      minutes: minutes,
    });
  };
  const handleTimeStop = () => {
    pause();
    setremainingTime({
      hours: hours,
      seconds: seconds,
      minutes: minutes,
    });
  };

  return (
    <div className="section">
      <div className="s-container">
        <div className="exam-box">
          <div className="exam-title">
            <span>{checkedQuestion?.answerNo}. Soru</span>

            <p>
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
          {checkedQuestion?.questionType === "Test" ? (
            <AnswerTest
              onClick={handleAnswerChange}
              data={{
                checkedQuestion: checkedQuestion,
                checkedOption: checkedOption,
              }}
              type="radio"
              name="checkbox"
            />
          ) : (
            <MultipleAnswer
              onClick={handleAnswerChange}
              data={{
                checkedQuestion: checkedQuestion,
                checkedOption: checkedOptions,
              }}
              type="checkbox"
            />
          )}

          <div className="test-buttons">
            <Button
              onClick={handleGoPrev}
              class="bi bi-chevron-double-left"
              text="ÖNCEKİ"
            />
            <Button
              onClick={handlGoNext}
              class="bi bi-chevron-double-right"
              text="SONRAKİ"
            />
          </div>
          <ProgressBar
            data={{
              numerator: pageNo,
              denominator: questions.length,
            }}
            text="İLERLEME"
          />
          <div className="test-note">
            Lütfen sağlıklı bir değerlendirme için bilmediğiniz soruları boş
            bırakınız
          </div>
          <button onClick={() => handleTime()}>başla</button>
          <button onClick={() => handleTimeStop()}>dur</button> */}

           <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px" }}>
              <span>{remainingTime.hours}</span>:
              <span>{remainingTime.minutes}</span>:
              <span>{remainingTime.seconds}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exam;
